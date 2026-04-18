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
      throw new Error(`API error: ${response.statusText}`)
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

export const CHAT_CONFIG = {
  maxMessages: 50, // Keep last 50 messages in history
  maxRetries: 3,
  timeout: 30000, // 30 seconds
}