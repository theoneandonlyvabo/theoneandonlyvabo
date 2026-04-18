'use client'

import { useRef, useEffect, useState } from 'react'
import { sendChatMessage } from '@/lib/gemini'
import type { ChatMessage } from '@/lib/types'

const OPENING_LINES = [
  'you\'ve reached the edge of the interface.',
  'what you\'re accessing now isn\'t a support bot.',
  'this is a fragment of how i think.',
  'ask anything.',
]

const SUGGESTED_PROMPTS = [
  'what drives you to build?',
  'what makes your architecture decisions different?',
  'what\'s EternaFall really about?',
  'where are you going from here?',
]

export default function ChatbotSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [visible, setVisible] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)
  const [accessed, setAccessed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const timer = setInterval(() => {
      setLineIndex((prev) => {
        if (prev >= OPENING_LINES.length - 1) {
          clearInterval(timer)
          setTimeout(() => setAccessed(true), 600)
          return prev
        }
        return prev + 1
      })
    }, 700)
    return () => clearInterval(timer)
  }, [visible])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text?: string) => {
    const content = text ?? input.trim()
    if (!content || loading) return
    setInput('')
    const userMsg: ChatMessage = { role: 'user', content }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)
    try {
      const response = await sendChatMessage([...messages, userMsg])
      setMessages((prev) => [...prev, response])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'connection interrupted. try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center py-32"
      style={{ background: 'var(--deep)' }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--magenta) 1px, transparent 1px), linear-gradient(90deg, var(--magenta) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[400px] opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, var(--magenta) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Context */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--magenta)',
                  letterSpacing: '0.3em',
                }}
              >
                05 / CONTACT
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(40px, 6vw, 72px)',
                  color: 'var(--white)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                ACCESS
                <br />
                <span style={{ color: 'var(--magenta)' }}>GRANTED</span>
              </h2>
            </div>

            {/* Opening lines */}
            <div className="flex flex-col gap-2">
              {OPENING_LINES.slice(0, lineIndex + 1).map((line, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed transition-all duration-500"
                  style={{
                    color: i === lineIndex ? 'var(--white)' : 'var(--gray)',
                    fontFamily: 'var(--font-mono)',
                    opacity: visible ? 1 : 0,
                  }}
                >
                  {i < lineIndex ? '//' : '>'} {line}
                </p>
              ))}
              {accessed && (
                <div
                  className="w-2 h-4 animate-pulse mt-1"
                  style={{ background: 'var(--magenta)' }}
                />
              )}
            </div>

            {/* Contact links */}
            <div
              className="flex flex-col gap-3 pt-6"
              style={{ borderTop: '1px solid var(--gray-dim)' }}
            >
              {[
                { label: 'github', value: 'theoneandonlyvabo', url: 'https://github.com/theoneandonlyvabo' },
                { label: 'linkedin', value: 'aireladrivano', url: 'https://linkedin.com/in/aireladrivano' },
                { label: 'email', value: 'aireladrivano196@gmail.com', url: 'mailto:aireladrivano196@gmail.com' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group"
                >
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ color: 'var(--gray)', fontFamily: 'var(--font-mono)' }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="text-sm transition-colors duration-200 group-hover:text-white"
                    style={{ color: 'var(--gray)', fontFamily: 'var(--font-mono)' }}
                  >
                    {link.value}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Chat */}
          <div
            className="flex flex-col"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--gray-dim)',
              height: '520px',
            }}
          >
            {/* Chat header */}
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ borderBottom: '1px solid var(--gray-dim)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: 'var(--magenta)' }}
                />
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ color: 'var(--gray)', fontFamily: 'var(--font-mono)' }}
                >
                  airel.fragment — online
                </span>
              </div>
              <span
                className="text-xs"
                style={{ color: 'var(--gray-dim)', fontFamily: 'var(--font-mono)' }}
              >
                gemini-powered
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
              {messages.length === 0 && accessed && (
                <div className="flex flex-col gap-3">
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: 'var(--gray)', fontFamily: 'var(--font-mono)' }}
                  >
                    you're in. start anywhere.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSend(prompt)}
                        className="px-3 py-1.5 text-xs text-left transition-all duration-200 hover:border-magenta-400"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--gray)',
                          border: '1px solid var(--gray-dim)',
                          background: 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: msg.role === 'user' ? 'var(--cyan)' : 'var(--magenta)',
                    }}
                  >
                    {msg.role === 'user' ? 'you' : 'airel'}
                  </span>
                  <div
                    className="max-w-[85%] px-4 py-2.5 text-sm leading-relaxed"
                    style={{
                      background: msg.role === 'user' ? 'var(--surface-2)' : 'transparent',
                      border: `1px solid ${msg.role === 'user' ? 'var(--gray-dim)' : 'var(--magenta)22'}`,
                      color: 'var(--white)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2">
                  <span style={{ color: 'var(--magenta)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                    airel
                  </span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full animate-bounce"
                        style={{
                          background: 'var(--magenta)',
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderTop: '1px solid var(--gray-dim)' }}
            >
              <span
                style={{
                  color: 'var(--magenta)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  flexShrink: 0,
                }}
              >
                &gt;
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
                placeholder="type here..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{
                  color: 'var(--white)',
                  fontFamily: 'var(--font-mono)',
                  caretColor: 'var(--magenta)',
                }}
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="text-xs tracking-widest uppercase transition-colors duration-200 disabled:opacity-30"
                style={{
                  color: 'var(--magenta)',
                  fontFamily: 'var(--font-mono)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}