export interface Workout {
  _id?: string;            // MongoDB _id is optional
  userId: string;          // Required: identifies the user
  type: string; 
  sets: number;
  reps: number;
  intensity: string;
  timePerRep: number;
  restTime: number;                    // Type of workout, e.g., "Cardio"        // Duration in minutes
  date: string;            // Always stored/used as ISO string
  calories: number;        // Calories burned
}
