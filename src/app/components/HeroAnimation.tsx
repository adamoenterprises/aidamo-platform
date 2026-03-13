'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

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
    { text: 'this is their question, what now?', color: 'user' },
    { text: "say 'no'", color: 'red' },
    { text: 'and then?', color: 'user' },
    { text: "wait four days, if they don't give in, make a concession", color: 'red' },
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

export default function HeroAnimation() {
  const [convoIndex, setConvoIndex] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [completedLines, setCompletedLines] = useState<Line[]>([])
  const [isDeleting, setIsDeleting] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isPausing, setIsPausing] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const currentConvo = conversations[convoIndex]
  const currentLine = currentConvo[lineIndex]

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  const tick = useCallback(() => {
    if (isPausing) return

    if (isDeleting) {
      // Clear all lines at once after conversation ends
      if (completedLines.length > 0 || displayedText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setCompletedLines([])
          setDisplayedText('')
          setIsDeleting(false)
          setLineIndex(0)
          setConvoIndex((prev) => (prev + 1) % conversations.length)
        }, 10)
      }
      return
    }

    if (!currentLine) return

    const isSlow = currentLine.slow
    const typeSpeed = isSlow ? 80 + Math.random() * 40 : 15 + Math.random() * 20

    if (displayedText.length < currentLine.text.length) {
      // Still typing current line
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(currentLine.text.slice(0, displayedText.length + 1))
      }, typeSpeed)
    } else {
      // Finished typing this line
      const pauseAfter = isSlow ? 1200 : 500

      if (lineIndex < currentConvo.length - 1) {
        // More lines in this conversation
        setIsPausing(true)
        timeoutRef.current = setTimeout(() => {
          setCompletedLines((prev) => [...prev, currentLine])
          setDisplayedText('')
          setLineIndex((prev) => prev + 1)
          setIsPausing(false)
        }, pauseAfter)
      } else {
        // Last line — pause then clear everything
        setIsPausing(true)
        timeoutRef.current = setTimeout(() => {
          setIsPausing(false)
          setIsDeleting(true)
        }, 2000)
      }
    }
  }, [displayedText, currentLine, currentConvo, lineIndex, isDeleting, isPausing, completedLines])

  useEffect(() => {
    tick()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [tick])

  return (
    <div className="mt-16 min-h-[120px] flex flex-col items-center">
      {/* Completed lines */}
      {completedLines.map((line, i) => (
        <div key={`${convoIndex}-${i}`} className="mb-1">
          <span
            className={`text-lg md:text-xl font-light tracking-tight ${
              colorClasses[line.color || 'user']
            }`}
          >
            {line.text}
          </span>
        </div>
      ))}

      {/* Currently typing line */}
      <div className="inline-flex items-center justify-center">
        <span
          className={`text-lg md:text-xl font-light tracking-tight ${
            colorClasses[currentLine?.color || 'user']
          }`}
        >
          {displayedText}
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
