import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function createAdmin() {
  const email = "admin@runmachinecricket.co.uk";
  const password = "AdminPassword123!"; // They can change this later in console
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Admin account created successfully:", userCredential.user.email);
    console.log("Password:", password);
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
       console.log("Admin account already exists for:", email);
       process.exit(0);
    }
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
}

createAdmin();
