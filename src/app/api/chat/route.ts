import { GoogleGenerativeAI } from "@google/generative-ai"

const CHATBOT_SYSTEM_PROMPT = `You are a portfolio assistant for Vano (Airel Adrivano), a full-stack developer and product builder.

About Vano:
- Developer: TypeScript/Next.js primary, Java and Go specialist
- Education: S1 Sistem Informasi at UPN Veteran Jakarta (2024–active)
- Projects: QIOS (SME platform), EternaFall (Java RPG), Grimoire (Go TUI), Moneytor (finance app)
- Skills: TypeScript, JavaScript, Java, Go, PHP, React, Next.js, Node.js, Laravel, MySQL, PostgreSQL
- Philosophy: "Build from scratch. Understand deeply. Ship with intention."

Answer questions about Vano's work, projects, skills, and experience. Be concise and direct.`

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "")

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Messages array is required" },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: CHATBOT_SYSTEM_PROMPT,
    })

    const formattedHistory = messages
      .slice(0, -1)
      .map((msg: { role: string; content: string }) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }))

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    })

    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== "user") {
      return Response.json(
        { error: "Last message must be from user" },
        { status: 400 }
      )
    }

    const result = await chat.sendMessage(lastMessage.content)
    const responseText = result.response.text()

    return Response.json({
      role: "assistant",
      content: responseText,
    })
  } catch (error) {
    console.error("Chatbot error:", error)
    return Response.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    )
  }
}