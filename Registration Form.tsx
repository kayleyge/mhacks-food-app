"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // Add your registration logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-blue-600">Create Your Account</CardTitle>
          <CardDescription className="text-center text-green-700">
            Sign up to start reducing food waste
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-green-700">First Name</Label>
                <Input id="firstName" name="firstName" required onChange={handleChange} className="border-blue-200 focus:border-blue-400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-green-700">Last Name</Label>
                <Input id="lastName" name="lastName" required onChange={handleChange} className="border-blue-200 focus:border-blue-400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-green-700">Email</Label>
              <Input id="email" name="email" type="email" required onChange={handleChange} className="border-blue-200 focus:border-blue-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-green-700">Username</Label>
              <Input id="username" name="username" required onChange={handleChange} className="border-blue-200 focus:border-blue-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-700">Password</Label>
              <Input id="password" name="password" type="password" required onChange={handleChange} className="border-blue-200 focus:border-blue-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-green-700">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" required onChange={handleChange} className="border-blue-200 focus:border-blue-400" />
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">Sign Up</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-center text-green-700">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}