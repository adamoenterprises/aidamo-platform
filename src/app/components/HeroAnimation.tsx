'use client'

import { useState, useEffect, useRef } from 'react'

type Line = {
  text: string
  color?: 'red' | 'green' | 'blue' | 'purple' | 'user'
  slow?: boolean
}

const conversations: Line[][] = [
  [
    { text: 'what should I do next?', color: 'user' },
    { text: 'push back', color: 'red' },
  ],
  [
    { text: "they said 'no', what now?", color: 'user' },
    { text: "why did they say 'no'?", color: 'green' },
    { text: "I don't know", color: 'user' },
    { text: 'ask them', color: 'green' },
    { text: "I can't", color: 'user' },
    { text: 'escalate', color: 'red' },
  ],
  [
    { text: "I'm feeling stressed, how do I calm down?", color: 'user' },
    { text: 'why are you feeling stressed?', color: 'green' },
    { text: 'not sure', color: 'user' },
    { text: "let's breathe together, follow my pace", color: 'green' },
    { text: 'three', color: 'blue', slow: true },
    { text: 'two', color: 'purple', slow: true },
    { text: 'one', color: 'green', slow: true },
  ],
  [
    { text: 'this is my counterproposal, what do you think?', color: 'user' },
    { text: "it's weak", color: 'red' },
    { text: 'why?', color: 'user' },
    { text: 'leaving too much on the table, you must push harder', color: 'red' },
  ],
  [
    { text: "they said 'no' to my proposal, what now?", color: 'user' },
    { text: 'try and understand their reasoning', color: 'red' },
    { text: 'and then?', color: 'user' },
    { text: "what's important to them and low cost to you?", color: 'green' },
    { text: "don't know", color: 'user' },
    { text: "let's review your variables and decide a counterproposal", color: 'green' },
  ],
  [
    { text: "I can't", color: 'user' },
    { text: 'why not?', color: 'green' },
    { text: 'the counterparty has all the power', color: 'user' },
    { text: 'are you sure?', color: 'blue' },
    { text: 'yes', color: 'user' },
    { text: 'then this is not a negotiation matter', color: 'blue' },
    { text: 'are you a negotiator or customer service representative?', color: 'red' },
    { text: "let's review your power balance before giving up", color: 'green' },
  ],
]

const colorClasses: Record<string, string> = {
  user: 'text-neutral-400',
  red: 'text-red-500',
  green: 'text-emerald-500',
  blue: 'text-blue-500',
  purple: 'text-purple-500',
}

// Flatten all conversations into a single sequence of lines
const allLines: Line[] = conversations.flat()

export default function HeroAnimation() {
  const [currentText, setCurrentText] = useState('')
  const [currentColor, setCurrentColor] = useState<string>('user')
  const [cursorVisible, setCursorVisible] = useState(true)

  const lineRef = useRef(0)
  const charRef = useRef(0)
  const phaseRef = useRef<'typing' | 'pause' | 'deleting'>('typing')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    function step() {
      const line = allLines[lineRef.current]
      const phase = phaseRef.current

      if (phase === 'typing') {
        if (charRef.current === 0) {
          setCurrentColor(line.color || 'user')
        }
        if (charRef.current < line.text.length) {
          charRef.current++
          setCurrentText(line.text.slice(0, charRef.current))
          const speed = line.slow ? 80 + Math.random() * 40 : 15 + Math.random() * 20
          timerRef.current = setTimeout(step, speed)
        } else {
          // Done typing — pause then delete
          phaseRef.current = 'pause'
          const pause = line.slow ? 1200 : 700
          timerRef.current = setTimeout(step, pause)
        }
      } else if (phase === 'pause') {
        phaseRef.current = 'deleting'
        timerRef.current = setTimeout(step, 10)
      } else if (phase === 'deleting') {
        if (charRef.current > 0) {
          charRef.current--
          setCurrentText(line.text.slice(0, charRef.current))
          timerRef.current = setTimeout(step, 3)
        } else {
          // Done deleting — next line
          lineRef.current = (lineRef.current + 1) % allLines.length
          phaseRef.current = 'typing'
          timerRef.current = setTimeout(step, 200)
        }
      }
    }

    timerRef.current = setTimeout(step, 300)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div className="mt-16 h-[32px]">
      <div className="inline-flex items-center justify-center h-full">
        <span
          className={`text-lg md:text-xl font-light tracking-tight ${
            colorClasses[currentColor]
          }`}
        >
          {currentText}
        </span>
        <span
          className={`inline-block w-[2px] h-6 bg-neutral-400 ml-[1px] transition-opacity duration-100 ${
            cursorVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  )
}
