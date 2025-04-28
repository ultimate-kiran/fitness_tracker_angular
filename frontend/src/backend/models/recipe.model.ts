export interface Recipe {
    _id?: string;
  ' mealtype'?: string; // Added with space to match MongoDB data
  Title: string;
  Ingredients?: string;
  Instructions?: string;
  Image_Name?: string;
  Cleaned_Ingredients?: string;
  calories?: number;
  }