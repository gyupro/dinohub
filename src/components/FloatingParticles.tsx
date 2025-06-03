'use client'

import { useMemo } from 'react'

const FloatingParticles = ({ count = 15 }: { count?: number }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${3 + Math.random() * 3}s`,
    }))
  }, [count])

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-orange-300/30 rounded-full animate-pulse"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration,
          }}
        />
      ))}
    </div>
  )
}

export default FloatingParticles 