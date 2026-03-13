'use client'

import { useState, useEffect, useCallback } from 'react'

const phrases = [
  'What should I do next?',
  'They said "no", what now?',
  "I'm feeling stressed, how do I calm down?",
  'This is my counterproposal, what do you think?',
  'This is their question, what now?',
]

export default function HeroAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  const currentPhrase = phrases[currentIndex]

  const tick = useCallback(() => {
    if (!isDeleting) {
      // Typing forward
      if (displayedText.length < currentPhrase.length) {
        return setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1))
        }, 15 + Math.random() * 20)
      } else {
        // Done typing — pause then delete
        return setTimeout(() => {
          setIsDeleting(true)
        }, 700)
      }
    } else {
      // Deleting
      if (displayedText.length > 0) {
        return setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 10)
      } else {
        // Done deleting — next phrase
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % phrases.length)
        return undefined
      }
    }
  }, [displayedText, currentPhrase, isDeleting])

  useEffect(() => {
    const timeout = tick()
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [tick])

  return (
    <div className="mt-16 h-[32px]">
      <div className="inline-flex items-center justify-center h-full">
        <span className="text-lg md:text-xl text-neutral-400 font-light tracking-tight">
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
