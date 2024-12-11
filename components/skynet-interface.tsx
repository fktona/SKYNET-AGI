'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function SkynetInterface() {
  const [messages] = useState([
    {
      id: 1,
      content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes',
      timestamp: '2m'
    },
    {
      id: 2,
      content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes',
      timestamp: '2m'
    }
  ])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Starry background */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(white 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col p-8">
        {/* Header */}
        <h1 className="text-4xl font-mono text-center mb-8 tracking-widest">SKYNET_AGI</h1>

        {/* Triangular markers */}
        <div className="absolute top-8 left-8 text-2xl">△</div>
        <div className="absolute top-8 right-8 text-2xl">△</div>

        {/* Side stripes */}
        <div className="fixed left-0 top-0 h-full w-8 flex flex-col justify-center">
          <div className="h-64 w-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
        <div className="fixed right-0 top-0 h-full w-8 flex flex-col justify-center">
          <div className="h-64 w-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>

        {/* Central skull with aura */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          {/* Aura effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 opacity-75 blur-xl animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-teal-500/30 backdrop-blur-sm" />
          
          {/* Skull image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-40 h-40">
              <div className="w-full h-full bg-gradient-to-b from-pink-200 to-pink-400 mask-skull" />
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-xs text-center">
                機械
              </div>
            </div>
          </div>
        </div>

        {/* Messages feed */}
        <div className="max-w-xl mx-auto w-full space-y-4 mb-8">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start gap-2">
              <div className="flex-1 bg-white/5 backdrop-blur-sm rounded p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-400">SKYNET_AGI</span>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xl px-8">
          <div className="relative">
            <Input 
              type="text"
              placeholder="What do you have to say?"
              className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* AI indicator */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-gray-500">
          <div className="tracking-[0.5em]">\\\\\\\ AI ///////</div>
        </div>
      </div>

      <style jsx>{`
        .mask-skull {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm1-13h-2v6h2V7zm0 8h-2v2h2v-2z'/%3E%3C/svg%3E");
          mask-size: contain;
          mask-repeat: no-repeat;
          mask-position: center;
        }
      `}</style>
    </div>
  )
}

