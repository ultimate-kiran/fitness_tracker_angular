export interface Workout {
  _id?: string;        // optional MongoDB id
  userId: string;      // the logged-in user id
  type: string;        // workout type (e.g. Cardio)
  duration: number;    // duration in minutes
  date: string | Date; // can be string (input) or Date (from backend)
  calories: number;    // calories burned
}