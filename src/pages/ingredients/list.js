import { useState } from 'react'
import { Plus, Minus, Edit, Trash2 } from 'lucide-react'
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
    const [formattedIngredients, setFormattedIngredients] = useState('')

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
        setIngredients(ingredients.map(ing => {
            if (ing.id === id) {
                const newQuantity = ing.quantity + change;
                if (newQuantity < 1) {
                    return null; // This will be filtered out
                }
                return { ...ing, quantity: newQuantity };
            }
            return ing;
        }).filter(Boolean)); // Remove null entries
    }

    const editIngredient = (id) => {
        // Placeholder for edit functionality
        console.log('Edit ingredient', id)
    }

    const removeIngredient = (id) => {
        setIngredients(ingredients.filter(ing => ing.id !== id));
    }

    const sendIngredientsToBackend = async () => {
        try {
            console.log("in the function to send Ingredients to backend")
            const response = await fetch('/api/formatIngredients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingredients: ingredients.map(ing => ing.name) }),
            })
            console.log(response)
            if (!response.ok) {
                throw new Error('Failed to format ingredients');
                console.log("in the error message")
            }

            const data = await response.json()
            console.log("data:",data)
            setFormattedIngredients(data.formattedString)
        } catch (error) {
            console.error('Error formatting ingredients:', error)
            setErrorMessage('Failed to format ingredients. Please try again.')
        }
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
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => removeIngredient(ingredient.id)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
            <Button
                onClick={sendIngredientsToBackend}
                className="mt-4 w-full text-white"
            >  Send to AI</Button>
            {formattedIngredients && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md text-black">
                    <h2 className="text-lg font-semibold mb-2">Formatted Ingredients:</h2>
                    <p>{formattedIngredients}</p>
                </div>
            )}
        </div>
    )
}
