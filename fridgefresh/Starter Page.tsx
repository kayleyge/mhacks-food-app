import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function StarterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl md:text-8xl font-bold text-blue-600 mb-8" style={{ fontFamily: 'Brush Script MT, cursive' }}>
        FridgeFresh
      </h1>
      <div className="w-64 h-64 md:w-80 md:h-80 relative mb-8">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#4299E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 9H21" stroke="#4299E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 21V9" stroke="#4299E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 6V3" stroke="#4299E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 6V9" stroke="#4299E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 14V17" stroke="#4299E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-full bg-blue-200 opacity-20 rounded-r-full"></div>
      </div>
      <p className="text-lg md:text-xl text-green-700 mb-8 text-center max-w-md">
        Reduce food waste, save money, and cook delicious meals with what you have!
      </p>
      <div className="space-x-4">
        <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white">
          <Link href="/register">Get Started</Link>
        </Button>
        <Button asChild variant="outline" className="border-green-500 text-green-700 hover:bg-green-100">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  )
}