import { Schema, model, Document } from 'mongoose';

export interface IExercise extends Document {
  name: string;
  equipment: string;
  primaryMuscle: string;
  secondaryMuscle: string;
  gif: string;
  met: number;
}

const exerciseSchema = new Schema<IExercise>({
  name: { type: String, required: true },
  equipment: { type: String, required: true },
  primaryMuscle: { type: String, required: true },
  secondaryMuscle: { type: String, required: true },
  gif: { type: String, required: false },
  met: { type: Number, required: false }
});

export default model<IExercise>('Exercise', exerciseSchema, 'exercise');