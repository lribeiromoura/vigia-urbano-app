import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

const createUserService = async (data: FormDataProps) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const { user } = userCredential;
    if (user) {
      await updateProfile(user, { displayName: data.name });
    }
    return userCredential;
  } catch (err) {
    console.log(err);
  }
};

const logoutUser = async () => {
  try {
    const userLogout = await signOut(auth);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getUserService = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (err) {
    console.log(err);
    return null;
  }
};


export { createUserService, getUserService, logoutUser };
