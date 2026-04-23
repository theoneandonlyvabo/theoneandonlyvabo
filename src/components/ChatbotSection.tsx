'use client'

import { useRef, useEffect, useState } from 'react'
import { sendChatMessage } from '@/lib/chatbot'
import type { ChatMessage } from '@/lib/types'

const PROMPTS = [
  'What drives you to build?',
  'Tell me about ETERNAFALL.',
  'How do you approach architecture?',
  'Where are you headed?',
]

export default function ChatbotSection() {
  const ref = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text?: string) => {
    const content = text ?? input.trim()
    if (!content || loading) return
    setInput('')
    const userMsg: ChatMessage = { role: 'user', content }
    setMessages((p) => [...p, userMsg])
    setLoading(true)
    try {
      const res = await sendChatMessage([...messages, userMsg])
      setMessages((p) => [...p, res])
    } catch {
      setMessages((p) => [...p, { role: 'assistant', content: 'Connection lost. Try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: '#06060a',
        padding: '120px 56px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient — violet hint for this section */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: '600px', height: '500px',
        background: 'radial-gradient(ellipse at bottom right, rgba(100,70,200,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: '30%',
        width: '500px', height: '300px',
        background: 'radial-gradient(ellipse at top, rgba(64,96,208,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1140px', margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '72px',
          alignItems: 'start',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s, transform 0.8s',
        }}>

          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                letterSpacing: '0.25em', color: '#888888', marginBottom: '16px',
              }}>
                05 / CONTACT
              </div>
              <h2 style={{
                fontFamily: 'var(--font-sans)', fontWeight: 600,
                fontSize: 'clamp(36px, 5vw, 60px)',
                lineHeight: 1.0, color: '#FFFFFF',
                letterSpacing: '-0.03em', marginBottom: '20px',
              }}>
                Let's talk
              </h2>
              <p style={{
                fontFamily: 'var(--font-sans)', fontWeight: 300,
                fontSize: '15px', color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.85, maxWidth: '340px',
              }}>
                You're not talking to a support bot.
                This is a fragment of how I think.
                Ask anything.
              </p>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { label: 'GitHub', value: 'theoneandonlyvabo', url: 'https://github.com/theoneandonlyvabo', icon: '/icons/github.png' },
                { label: 'LinkedIn', value: 'Airel Adrivano', url: 'https://linkedin.com/in/aireladrivano', icon: '/icons/linkedin.png' },
                { label: 'Instagram', value: 'aireladrivano', url: 'https://instagram.com/aireladrivano', icon: '/icons/instagram.png' },
                { label: 'Email', value: 'aireladrivano196@gmail.com', url: 'mailto:aireladrivano196@gmail.com', icon: '/icons/gmail.png' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    textDecoration: 'none',
                    transition: 'padding-left 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.paddingLeft = '6px'}
                  onMouseLeave={e => e.currentTarget.style.paddingLeft = '0px'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {link.icon && (
                      <img
                        src={link.icon}
                        alt={link.label}
                        style={{
                          width: '14px',
                          height: '14px',
                          objectFit: 'contain',
                          filter: ['LinkedIn', 'Instagram', 'Email'].includes(link.label) ? 'none' : 'invert(1) brightness(1.5)',
                          opacity: 0.5,
                        }}
                      />
                    )}
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '10px',
                      letterSpacing: '0.12em', color: '#888888',
                      textTransform: 'uppercase',
                    }}>
                      {link.label}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 300,
                    fontSize: '12px', color: 'rgba(255,255,255,0.75)',
                  }}>
                    {link.value}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Chat */}
          <div style={{
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            height: '500px',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: '#4060d0',
                  animation: 'pulse 2.5s ease-in-out infinite',
                }} />
                <span style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 400,
                  fontSize: '12px', color: 'rgba(255,255,255,0.6)',
                }}>
                  vano, but dumber
                </span>
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '9px',
                letterSpacing: '0.1em', color: '#888888',
              }}>
                llama 3.1
              </span>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: 'auto',
              padding: '20px',
              display: 'flex', flexDirection: 'column', gap: '14px',
            }}>
              {messages.length === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 300,
                    fontSize: '12px', color: '#888888', lineHeight: 1.6,
                  }}>
                    You're in. Ask anything.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '4px' }}>
                    {PROMPTS.map((p) => (
                      <button
                        key={p}
                        onClick={() => send(p)}
                        style={{
                          textAlign: 'left',
                          fontFamily: 'var(--font-sans)', fontWeight: 300,
                          fontSize: '12px', color: '#888888',
                          padding: '8px 12px',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '8px',
                          background: 'transparent',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = 'rgba(64,96,208,0.3)'
                          e.currentTarget.style.color = '#FFFFFF'
                          e.currentTarget.style.background = 'rgba(64,96,208,0.04)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                          e.currentTarget.style.color = '#888888'
                          e.currentTarget.style.background = 'transparent'
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: '4px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '9px',
                    letterSpacing: '0.12em',
                    color: msg.role === 'user' ? '#4060d0' : '#888888',
                    textTransform: 'uppercase',
                  }}>
                    {msg.role === 'user' ? 'You' : 'Airel'}
                  </span>
                  <div style={{
                    maxWidth: '85%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: msg.role === 'user'
                      ? 'rgba(64,96,208,0.08)'
                      : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${msg.role === 'user'
                      ? 'rgba(64,96,208,0.15)'
                      : 'rgba(255,255,255,0.06)'}`,
                    fontFamily: 'var(--font-sans)', fontWeight: 300,
                    fontSize: '12px', color: '#efefef',
                    lineHeight: 1.7,
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', paddingLeft: '2px' }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{
                      width: '4px', height: '4px', borderRadius: '50%',
                      background: '#4060d0',
                      animation: `pulse 1.2s ${i * 0.2}s ease-in-out infinite`,
                    }} />
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 16px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                color: '#4060d0', flexShrink: 0,
              }}>
                &gt;
              </span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') send() }}
                placeholder="type here..."
                style={{
                  flex: 1,
                  background: 'transparent', border: 'none', outline: 'none',
                  fontFamily: 'var(--font-sans)', fontWeight: 300,
                  fontSize: '13px', color: '#efefef',
                  caretColor: '#4060d0',
                }}
              />
              <button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  letterSpacing: '0.1em', color: '#4060d0',
                  background: 'none', border: 'none', cursor: 'pointer',
                  opacity: loading || !input.trim() ? 0.3 : 1,
                  transition: 'opacity 0.2s', flexShrink: 0,
                  padding: '0',
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}