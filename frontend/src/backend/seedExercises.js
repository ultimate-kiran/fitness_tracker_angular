/*const mongoose = require('mongoose');
const Exercise = require('./models/Exercise');

mongoose.connect('mongodb://127.0.0.1:27017/fitnessTracker')
  .then(() => console.log("MongoDB Connected to fitnessTracker"))
  .catch(err => console.error('Mongo Error:', err));

const exercises = [
  {
    name: "Bent Over Row (Barbell)",
    equipment: "Barbell",
    primaryMuscle: "upperBack",
    secondaryMuscle: "biceps,shoulders",
    gif: "/workout1.gif"
  },
  {
    name: "Deadlift (Barbell)",
    equipment: "Barbell",
    primaryMuscle: "hamstrings",
    secondaryMuscle: "lowerBack,glutes",
    gif: "/w2.gif"
  },
  {
    name: "Back Squat (Barbell)",
    equipment: "Barbell",
    primaryMuscle: "quadriceps",
    secondaryMuscle: "glutes,hamstrings",
    gif: "/w3.gif"
  },
  {
    name: "Bench Press (Barbell)",
    equipment: "Barbell",
    primaryMuscle: "chest",
    secondaryMuscle: "triceps,shoulders",
    gif: "/w4.gif"
  },
  {
    name: "Barbell Curl",
    equipment: "Barbell",
    primaryMuscle: "biceps",
    secondaryMuscle: "forearms",
    gif: "https://via.placeholder.com/100x200.gif?text=Barbell+Curl"
  },
  {
    name: "Good Morning (Barbell)",
    equipment: "Barbell",
    primaryMuscle: "lowerBack",
    secondaryMuscle: "hamstrings,glutes",
    gif: "https://via.placeholder.com/100x200.gif?text=Good+Morning"
  },
  {
    name: "Military Press (Barbell)",
    equipment: "Barbell",
    primaryMuscle: "shoulders",
    secondaryMuscle: "triceps",
    gif: "https://via.placeholder.com/100x200.gif?text=Military+Press"
  },
  {
    name: "Barbell Shrug",
    equipment: "Barbell",
    primaryMuscle: "traps",
    secondaryMuscle: "shoulders",
    gif: "https://via.placeholder.com/100x200.gif?text=Barbell+Shrug"
  },
  {
    name: "Bench Press (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "chest",
    secondaryMuscle: "triceps,shoulders",
    gif: "https://via.placeholder.com/100x200.gif?text=Bench+Press"
  },
  {
    name: "Incline Bench Press (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "chest",
    secondaryMuscle: "shoulders,triceps",
    gif: "https://via.placeholder.com/100x200.gif?text=Incline+Bench+Press"
  },
  {
    name: "Bicep Curl (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "biceps",
    secondaryMuscle: "forearms",
    gif: "https://via.placeholder.com/100x200.gif?text=Bicep+Curl"
  },
  {
    name: "Hammer Curl (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "biceps",
    secondaryMuscle: "forearms",
    gif: "https://via.placeholder.com/100x200.gif?text=Hammer+Curl"
  },
  {
    name: "Shoulder Press (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "shoulders",
    secondaryMuscle: "triceps",
    gif: "https://via.placeholder.com/100x200.gif?text=Shoulder+Press"
  },
  {
    name: "Lateral Raise (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "shoulders",
    secondaryMuscle: "traps",
    gif: "https://via.placeholder.com/100x200.gif?text=Lateral+Raise"
  },
  {
    name: "Dumbbell Lunges",
    equipment: "Dumbbell",
    primaryMuscle: "quadriceps",
    secondaryMuscle: "glutes,hamstrings",
    gif: "https://via.placeholder.com/100x200.gif?text=Dumbbell+Lunges"
  },
  {
    name: "Goblet Squat (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "quadriceps",
    secondaryMuscle: "glutes,core",
    gif: "https://via.placeholder.com/100x200.gif?text=Goblet+Squat"
  },
  {
    name: "Dumbbell Deadlift",
    equipment: "Dumbbell",
    primaryMuscle: "hamstrings",
    secondaryMuscle: "lowerBack,glutes",
    gif: "https://via.placeholder.com/100x200.gif?text=Dumbbell+Deadlift"
  },
  {
    name: "Dumbbell Romanian Deadlift",
    equipment: "Dumbbell",
    primaryMuscle: "hamstrings",
    secondaryMuscle: "lowerBack,glutes",
    gif: "https://via.placeholder.com/100x200.gif?text=Dumbbell+Romanian+Deadlift"
  },
  {
    name: "Dumbbell Row",
    equipment: "Dumbbell",
    primaryMuscle: "upperBack",
    secondaryMuscle: "biceps",
    gif: "https://via.placeholder.com/100x200.gif?text=Dumbbell+Row"
  },
  {
    name: "Reverse Fly (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "upperBack",
    secondaryMuscle: "shoulders",
    gif: "https://via.placeholder.com/100x200.gif?text=Reverse+Fly"
  },
  {
    name: "Dumbbell Side Bend",
    equipment: "Dumbbell",
    primaryMuscle: "abdominals",
    secondaryMuscle: "obliques",
    gif: "https://via.placeholder.com/100x200.gif?text=Dumbbell+Side+Bend"
  },
  {
    name: "Russian Twist (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "abdominals",
    secondaryMuscle: "obliques",
    gif: "https://via.placeholder.com/100x200.gif?text=Russian+Twist"
  },
  {
    name: "Calf Raise (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "calves",
    secondaryMuscle: "",
    gif: "https://via.placeholder.com/100x200.gif?text=Calf+Raise"
  },
  {
    name: "Seated Calf Raise (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "calves",
    secondaryMuscle: "",
    gif: "https://via.placeholder.com/100x200.gif?text=Seated+Calf+Raise"
  },
  {
    name: "Forearm Curl (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "forearms",
    secondaryMuscle: "",
    gif: "https://via.placeholder.com/100x200.gif?text=Forearm+Curl"
  },
  {
    name: "Reverse Wrist Curl (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "forearms",
    secondaryMuscle: "",
    gif: "https://via.placeholder.com/100x200.gif?text=Reverse+Wrist+Curl"
  },
  {
    name: "Glute Bridge (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "glutes",
    secondaryMuscle: "hamstrings",
    gif: "https://via.placeholder.com/100x200.gif?text=Glute+Bridge"
  },
  {
    name: "Hip Thrust (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "glutes",
    secondaryMuscle: "hamstrings",
    gif: "https://via.placeholder.com/100x200.gif?text=Hip+Thrust"
  },
  {
    name: "Triceps Kickback (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "triceps",
    secondaryMuscle: "",
    gif: "https://via.placeholder.com/100x200.gif?text=Triceps+Kickback"
  },
  {
    name: "Overhead Triceps Extension (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "triceps",
    secondaryMuscle: "",
    gif: "https://via.placeholder.com/100x200.gif?text=Overhead+Triceps+Extension"
  },
  {
    name: "Trap Raise (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "traps",
    secondaryMuscle: "shoulders",
    gif: "https://via.placeholder.com/100x200.gif?text=Trap+Raise"
  },
  {
    name: "Upright Row (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "traps",
    secondaryMuscle: "shoulders",
    gif: "https://via.placeholder.com/100x200.gif?text=Upright+Row"
  },
  {
    name: "Neck Bridge (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "neck",
    secondaryMuscle: "",
    gif: "https://via.placeholder.com/100x200.gif?text=Neck+Bridge"
  },
  {
    name: "Neck Flexion (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "neck",
    secondaryMuscle: "",
    gif: "https://via.placeholder.com/100x200.gif?text=Neck+Flexion"
  },
  {
    name: "Burpee (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "fullBody",
    secondaryMuscle: "cardio",
    gif: "https://via.placeholder.com/100x200.gif?text=Burpee"
  },
  {
    name: "Mountain Climber (Dumbbell)",
    equipment: "Dumbbell",
    primaryMuscle: "fullBody",
    secondaryMuscle: "cardio",
    gif: "https://via.placeholder.com/100x200.gif?text=Mountain+Climber"
  },
  {
    name: "Kettlebell Swing",
    equipment: "Kettlebell",
    primaryMuscle: "glutes",
    secondaryMuscle: "hamstrings,core",
    gif: "https://via.placeholder.com/100x200.gif?text=Kettlebell+Swing"
  },
  {
    name: "Kettlebell Goblet Squat",
    equipment: "Kettlebell",
    primaryMuscle: "quadriceps",
    secondaryMuscle: "glutes,core",
    gif: "https://via.placeholder.com/100x200.gif?text=Kettlebell+Goblet+Squat"
  },
  {
    name: "Kettlebell Row",
    equipment: "Kettlebell",
    primaryMuscle: "upperBack",
    secondaryMuscle: "biceps",
    gif: "https://via.placeholder.com/100x200.gif?text=Kettlebell+Row"
  },
  {
    name: "Kettlebell Clean",
    equipment: "Kettlebell",
    primaryMuscle: "shoulders",
    secondaryMuscle: "traps",
    gif: "https://via.placeholder.com/100x200.gif?text=Kettlebell+Clean"
  },
  {
    name: "Cable Fly Crossovers",
    equipment: "Machine",
    primaryMuscle: "chest",
    secondaryMuscle: "shoulders",
    gif: "https://via.placeholder.com/100x200.gif?text=Cable+Fly+Crossovers"
  },
  {
    name: "Chest Press (Machine)",
    equipment: "Machine",
    primaryMuscle: "chest",
    secondaryMuscle: "triceps",
    gif: "https://via.placeholder.com/100x200.gif?text=Chest+Press"
  },
  {
    name: "Lat Pulldown (Machine)",
    equipment: "Machine",
    primaryMuscle: "lats",
    secondaryMuscle: "biceps",
    gif: "https://via.placeholder.com/100x200.gif?text=Lat+Pulldown"
  },
  {
    name: "Seated Row (Machine)",
    equipment: "Machine",
    primaryMuscle: "lats",
    secondaryMuscle: "upperBack",
    gif: "https://via.placeholder.com/100x200.gif?text=Seated+Row"
  },
  {
    name: "Leg Press (Machine)",
    equipment: "Machine",
    primaryMuscle: "quadriceps",
    secondaryMuscle: "glutes,hamstrings",
    gif: "https://via.placeholder.com/100x200.gif?text=Leg+Press"
  },
  {
    name: "Leg Extension (Machine)",
    equipment: "Machine",
    primaryMuscle: "quadriceps",
    secondaryMuscle: "",
    gif: "https://via.placeholder.com/100x200.gif?text=Leg+Extension"
  },
  {
    name: "Ab Crunch (Machine)",
    equipment: "Machine",
    primaryMuscle: "abdominals",
    secondaryMuscle: "obliques",
    gif: "https://via.placeholder.com/100x200.gif?text=Ab+Crunch"
  },
  {
    name: "Ab Coaster (Machine)",
    equipment: "Machine",
    primaryMuscle: "abdominals",
    secondaryMuscle: "obliques",
    gif: "https://via.placeholder.com/100x200.gif?text=Ab+Coaster"
  },
  {
    name: "Adductor Machine",
    equipment: "Machine",
    primaryMuscle: "adductors",
    secondaryMuscle: "",
    gif: "https://via.placeholder.com/100x200.gif?text=Adductor+Machine"
  },
  {
    name: "Abductor Machine",
    equipment: "Machine",
    primaryMuscle: "abductors",
    secondaryMuscle: "",
    gif: "https://via.placeholder.com/100x200.gif?text=Abductor+Machine"
  },
  {
    name: "Triceps Pushdown (Machine)",
    equipment: "Machine",
    primaryMuscle: "triceps",
    secondaryMuscle: "",
    gif: "https://via.placeholder.com/100x200.gif?text=Triceps+Pushdown"
  },
  {
    name: "Triceps Dips (Machine)",
    equipment: "Machine",
    primaryMuscle: "triceps",
    secondaryMuscle: "chest",
    gif: "https://via.placeholder.com/100x200.gif?text=Triceps+Dips"
  },
  {
    name: "Shoulder Press (Machine)",
    equipment: "Machine",
    primaryMuscle: "shoulders",
    secondaryMuscle: "triceps",
    gif: "https://via.placeholder.com/100x200.gif?text=Shoulder+Press"
  },
  {
    name: "Rear Delt Fly (Machine)",
    equipment: "Machine",
    primaryMuscle: "shoulders",
    secondaryMuscle: "upperBack",
    gif: "https://via.placeholder.com/100x200.gif?text=Rear+Delt+Fly"
  },
  {
    name: "Calf Raise (Machine)",
    equipment: "Machine",
    primaryMuscle: "calves",
    secondaryMuscle: "",
    gif: "https://via.placeholder.com/100x200.gif?text=Calf+Raise"
  },
  {
    name: "Seated Calf Raise (Machine)",
    equipment: "Machine",
    primaryMuscle: "calves",
    secondaryMuscle: "",
    gif: "https://cursor.sh/?utm_source=app&utm_medium=referral&utm_campaign=app_referral&utm_content=bottom_barhttps://via.placeholder.com/100x200.gif?text=Seated+Calf+Raise"
  },
  {
    name: "Plate Twist",
    equipment: "Plate",
    primaryMuscle: "abdominals",
    secondaryMuscle: "obliques",
    gif: "https://via.placeholder.com/100x200.gif?text=Plate+Twist"
  },
  {
    name: "Plate Raise",
    equipment: "Plate",
    primaryMuscle: "shoulders",
    secondaryMuscle: "traps",
    gif: "https://via.placeholder.com/100x200.gif?text=Plate+Raise"
  },
  {
    name: "Band Pull Apart",
    equipment: "Resistance Band",
    primaryMuscle: "shoulders",
    secondaryMuscle: "upperBack",
    gif: "https://via.placeholder.com/100x200.gif?text=Band+Pull+Apart"
  },
  {
    name: "Band Squat",
    equipment: "Resistance Band",
    primaryMuscle: "quadriceps",
    secondaryMuscle: "glutes",
    gif: "https://via.placeholder.com/100x200.gif?text=Band+Squat"
  },
  {
    name: "Band Curl",
    equipment: "Resistance Band",
    primaryMuscle: "biceps",
    secondaryMuscle: "forearms",
    gif: "https://via.placeholder.com/100x200.gif?text=Band+Curl"
  },
  {
    name: "Band Push Up",
    equipment: "Resistance Band",
    primaryMuscle: "chest",
    secondaryMuscle: "triceps",
    gif: "https://via.placeholder.com/100x200.gif?text=Band+Push+Up"
  },
  {
    name: "Suspension Row",
    equipment: "Suspension",
    primaryMuscle: "upperBack",
    secondaryMuscle: "biceps",
    gif: "https://via.placeholder.com/100x200.gif?text=Suspension+Row"
  },
  {
    name: "Suspension Push Up",
    equipment: "Suspension",
    primaryMuscle: "chest",
    secondaryMuscle: "triceps",
    gif: "https://via.placeholder.com/100x200.gif?text=Suspension+Push+Up"
  },
  {
    name: "Face Pull",
    equipment: "Other",
    primaryMuscle: "shoulders",
    secondaryMuscle: "upperBack",
    gif: "https://via.placeholder.com/100x200.gif?text=Face+Pull"
  },
  {
    name: "Push Up",
    equipment: "None",
    primaryMuscle: "chest",
    secondaryMuscle: "triceps,shoulders",
    gif: "https://via.placeholder.com/100x200.gif?text=Push+Up"
  },
  {
    name: "Plank",
    equipment: "None",
    primaryMuscle: "abdominals",
    secondaryMuscle: "core",
    gif: "https://via.placeholder.com/100x200.gif?text=Plank"
  },
  {
    name: "Side Plank",
    equipment: "None",
    primaryMuscle: "abdominals",
    secondaryMuscle: "obliques",
    gif: "https://via.placeholder.com/100x200.gif?text=Side+Plank"
  },
  {
    name: "Jumping Jack",
    equipment: "None",
    primaryMuscle: "fullBody",
    secondaryMuscle: "cardio",
    gif: "https://via.placeholder.com/100x200.gif?text=Jumping+Jack"
  },
  {
    name: "High Knees",
    equipment: "None",
    primaryMuscle: "fullBody",
    secondaryMuscle: "cardio",
    gif: "https://via.placeholder.com/100x200.gif?text=High+Knees"
  }
];

async function seedExercises() {
  try {
    await Exercise.deleteMany({});
    await Exercise.insertMany(exercises);
    console.log('Exercises seeded successfully');
  } catch (err) {
    console.error('Error seeding exercises:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedExercises();
*/