"use client"

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, CameraIcon, PencilIcon, TrashIcon } from "lucide-react"

interface FoodItem {
  id: string
  name: string
  manufacturingDate: string
  expiryDate: string
}

export default function FoodInventory() {
  const [image, setImage] = useState<string | null>(null)
  const [recognizedFood, setRecognizedFood] = useState<string | null>(null)
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [manualInput, setManualInput] = useState<Omit<FoodItem, 'id'>>({
    name: '',
    manufacturingDate: '',
    expiryDate: ''
  })

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing the camera", err)
    }
  }

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0)
      const imageDataUrl = canvas.toDataURL('image/jpeg')
      setImage(imageDataUrl)
      recognizeFood(imageDataUrl)
    }
  }

  const recognizeFood = async (imageData: string) => {
    // Placeholder for OpenAI API call
    setRecognizedFood("Apple")
    // In a real application, you would get the manufacturing and expiry dates from a database or API
    const today = new Date()
    const manufacturingDate = new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0]
    const expiryDate = new Date(today.setDate(today.getDate() + 14)).toISOString().split('T')[0]
    addFoodItem({
      name: "Apple",
      manufacturingDate,
      expiryDate
    })
  }
  // Got this from asking GPT how to connect front to backend
  const fetchFoodItems = async () => {
    try {
      const response = await fetch(`/api/v1/food/${username}/`)
      const data = await response.json()
      setFoodItems(data)
    } catch (error) {
      console.error("Error fetching food items:", error)
    }
  }
  const addFoodItemToBackend = async (item: Omit<FoodItem, 'id'>) => {
    try {
      const response = await fetch(`/api/v1/food/${username}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
      const newItem = await response.json()
      setFoodItems([...foodItems, newItem])
    } catch (error) {
      console.error("Error adding food item:", error)
    }
  }

  const updateFoodItemInBackend = async (item: FoodItem) => {
    try {
      const response = await fetch(`/api/v1/food/${username}/${item.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
      const updatedItem = await response.json()
      setFoodItems(foodItems.map(food => food.id === updatedItem.id ? updatedItem : food))
    } catch (error) {
      console.error("Error updating food item:", error)
    }
  }

  const deleteFoodItemFromBackend = async (id: string) => {
    try {
      await fetch(`/api/v1/food/${username}/${id}/`, {
        method: 'DELETE'
      })
      setFoodItems(foodItems.filter(item => item.id !== id))
    } catch (error) {
      console.error("Error deleting food item:", error)
    }
  }

  //END OF CODE BLOCKS THAT CONNECT TO BACK END

  
  const addFoodItem = (item: Omit<FoodItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() }
    setFoodItems([...foodItems, newItem])
  }

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualInput({ ...manualInput, [e.target.name]: e.target.value })
  }

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addFoodItem(manualInput)
    setManualInput({ name: '', manufacturingDate: '', expiryDate: '' })
  }

  const handleEditItem = (item: FoodItem) => {
    setEditingItem(item)
  }

  const handleUpdateItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingItem) {
      setFoodItems(foodItems.map(item => item.id === editingItem.id ? editingItem : item))
      setEditingItem(null)
    }
  }

  const handleDeleteItem = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-4">
      <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-600">Food Inventory</CardTitle>
          <CardDescription className="text-center text-green-700">Add food items to your inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="camera" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="camera" className="text-blue-600">Camera Recognition</TabsTrigger>
              <TabsTrigger value="manual" className="text-green-700">Manual Input</TabsTrigger>
            </TabsList>
            <TabsContent value="camera" className="space-y-4">
              <div className="aspect-video bg-blue-50 rounded-lg overflow-hidden">
                <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
              </div>
              {image && (
                <div className="aspect-video bg-blue-50 rounded-lg overflow-hidden">
                  <img src={image} alt="Captured food" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex justify-between">
                <Button onClick={startCamera} className="bg-blue-500 hover:bg-blue-600 text-white">
                  <CameraIcon className="mr-2 h-4 w-4" />
                  Start Camera
                </Button>
                <Button onClick={captureImage} className="bg-green-500 hover:bg-green-600 text-white">
                  Capture Image
                </Button>
              </div>
              {recognizedFood && (
                <p className="text-center text-blue-600">Recognized Food: {recognizedFood}</p>
              )}
            </TabsContent>
            <TabsContent value="manual">
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-green-700">Food Item Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={manualInput.name}
                    onChange={handleManualInputChange}
                    required
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manufacturingDate" className="text-green-700">Manufacturing Date</Label>
                  <div className="relative">
                    <Input
                      id="manufacturingDate"
                      name="manufacturingDate"
                      type="date"
                      value={manualInput.manufacturingDate}
                      onChange={handleManualInputChange}
                      required
                      className="border-blue-200 focus:border-blue-400"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate" className="text-green-700">Expiry Date</Label>
                  <div className="relative">
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="date"
                      value={manualInput.expiryDate}
                      onChange={handleManualInputChange}
                      required
                      className="border-blue-200 focus:border-blue-400"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">Add Food Item</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <h3 className="font-semibold mb-2 text-blue-600">Your Food Inventory:</h3>
            {foodItems.length > 0 ? (
              <ul className="space-y-2">
                {foodItems.map((item) => (
                  <li key={item.id} className="bg-green-50 p-2 rounded-md flex justify-between items-center">
                    <div>
                      <span className="font-medium text-blue-600">{item.name}</span>
                      <br />
                      <span className="text-sm text-green-700">
                        Manufactured: {item.manufacturingDate} | Expires: {item.expiryDate}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => handleEditItem(item)}>
                            <PencilIcon className="h-4 w-4 text-blue-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Food Item</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleUpdateItem} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-name" className="text-green-700">Food Item Name</Label>
                              <Input
                                id="edit-name"
                                name="name"
                                value={editingItem?.name || ''}
                                onChange={(e) => setEditingItem(prev => prev ? {...prev, name: e.target.value} : null)}
                                required
                                className="border-blue-200 focus:border-blue-400"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-manufacturingDate" className="text-green-700">Manufacturing Date</Label>
                              <Input
                                id="edit-manufacturingDate"
                                name="manufacturingDate"
                                type="date"
                                value={editingItem?.manufacturingDate || ''}
                                onChange={(e) => setEditingItem(prev => prev ? {...prev, manufacturingDate: e.target.value} : null)}
                                required
                                className="border-blue-200 focus:border-blue-400"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-expiryDate" className="text-green-700">Expiry Date</Label>
                              <Input
                                id="edit-expiryDate"
                                name="expiryDate"
                                type="date"
                                value={editingItem?.expiryDate || ''}
                                onChange={(e) => setEditingItem(prev => prev ? {...prev, expiryDate: e.target.value} : null)}
                                required
                                className="border-blue-200 focus:border-blue-400"
                              />
                            </div>
                            <DialogFooter>
                              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Update Item</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteItem(item.id)}>
                        <TrashIcon className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-green-700">No items in your inventory yet.</p>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}