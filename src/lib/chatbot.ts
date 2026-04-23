import type { ChatMessage } from "./types"

export async function sendChatMessage(
  messages: ChatMessage[]
): Promise<ChatMessage> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error ?? response.statusText)
    }

    const data = await response.json()
    return {
      role: "assistant",
      content: data.content,
    }
  } catch (error) {
    console.error("Chat error:", error)
    throw error
  }
}