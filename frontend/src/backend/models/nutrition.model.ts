// nutrition.model.ts

export interface Nutrition {
    _id?: string;          // Optional MongoDB id
    userId: string;        // The logged-in user id (reference to User)
    mealType: string;      // e.g., Breakfast, Lunch
    time: string;          // e.g., 08:30 AM
    foodName: string;      // Food item name
    calories: number;      // Calories for the meal
    carbs: number;         // Carbs in grams
    protein: number;       // Protein in grams
    fat: number; 
    date: string;          // Fat in grams
    createdAt?: string;    // Timestamp when the entry was created (optional for front-end)
    updatedAt?: string;    // Timestamp when the entry was last updated (optional for front-end)
  }
  