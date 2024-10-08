'use client'

import { useState } from 'react'
import { Plus, Minus, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function AvailableIngredients() {
  const [ingredients, setIngredients] = useState([
    { id: 1, name: 'Flour', quantity: 2 },
    { id: 2, name: 'Sugar', quantity: 1 },
    { id: 3, name: 'Eggs', quantity: 3 },
  ])
  const [newIngredient, setNewIngredient] = useState('')
  const [errorMessage, setErrorMessage] = useState('');

  const addIngredient = () => {
    if (newIngredient.trim()) {
      if (ingredients.some(ing => ing.name.trim().toLowerCase() === newIngredient.trim().toLowerCase())) {
        setErrorMessage('This ingredient already exists in the list.');
      } else {
        setIngredients([...ingredients, { id: Date.now(), name: newIngredient, quantity: 1 }]);
        setNewIngredient('');
        setErrorMessage('');
      }
    }
  };

  const updateQuantity = (id, change) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, quantity: Math.max(0, ing.quantity + change) } : ing
    ))
  }

  const editIngredient = (id) => {
    // Placeholder for edit functionality
    console.log('Edit ingredient', id)
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ingredient List</h1>
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex gap-2">
          <Input
            type="text"
            value={newIngredient}
            onChange={(e) => {
              setNewIngredient(e.target.value);
              setErrorMessage('');
            }}
            placeholder="Enter new ingredient"
            className={`flex-grow ${errorMessage ? 'border-red-500' : ''}`}
          />
          <Button onClick={addIngredient}>
            <Plus className="w-4 h-4 mr-2" />
            Add Ingredient
          </Button>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
      </div>
      {ingredients.map((ingredient) => (
        <Card key={ingredient.id} className="mb-2">
          <CardContent className="flex items-center justify-between p-4">
            <span className="font-medium">{ingredient.name}</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(ingredient.id, -1)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center">{ingredient.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(ingredient.id, 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => editIngredient(ingredient.id)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}