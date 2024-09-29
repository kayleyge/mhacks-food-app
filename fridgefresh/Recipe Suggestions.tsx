"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHatIcon, BookOpenIcon } from "lucide-react"


interface Recipe {
  name: string
  ingredients: string[]
  instructions: string[]
}


export default function RecipeSuggestions() {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const generateRecipes = async () => {
    // This is a placeholder for the OpenAI API call
    // In a real application, you would send the food items to your backend,
    // which would then use OpenAI's API to generate recipe suggestions
    const mockRecipes: Recipe[] = [
      {
        name: "Apple Cinnamon Oatmeal",
        ingredients: ["Apples", "Oats", "Cinnamon", "Milk", "Honey"],
        instructions: [
          "Dice the apples",
          "Cook oats with milk",
          "Add diced apples and cinnamon",
          "Sweeten with honey to taste"
        ]
      },
      {
        name: "Green Salad with Apple",
        ingredients: ["Mixed Greens", "Apple", "Walnuts", "Feta Cheese", "Balsamic Vinaigrette"],
        instructions: [
          "Wash and dry mixed greens",
          "Slice the apple thinly",
          "Toss greens, apple slices, and walnuts",
          "Sprinkle with feta cheese",
          "Drizzle with balsamic vinaigrette"
        ]
      }
    ]
    setRecipes(mockRecipes)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-4">
      <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-600">Recipe Suggestions</CardTitle>
          <CardDescription className="text-center text-green-700">Get recipes based on your available food items</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={generateRecipes} className="w-full bg-green-500 hover:bg-green-600 text-white">
            <ChefHatIcon className="mr-2 h-4 w-4" />
            Generate Recipes
          </Button>
          {recipes.length > 0 && (
            <div className="space-y-4">
              {recipes.map((recipe, index) => (
                <Card key={index} className="bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-blue-600">{recipe.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <h4 className="font-medium text-green-700">Ingredients:</h4>
                      <ul className="list-disc list-inside">
                        {recipe.ingredients.map((ingredient, i) => (
                          <li key={i} className="text-blue-600">{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-700">Instructions:</h4>
                      <ol className="list-decimal list-inside">
                        {recipe.instructions.map((instruction, i) => (
                          <li key={i} className="text-blue-600">{instruction}</li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-100">
            <BookOpenIcon className="mr-2 h-4 w-4" />
            View All Recipes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}