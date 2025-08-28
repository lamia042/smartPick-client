import { useEffect, useState, createContext } from "react";
import { auth } from "../firebase/firebase.init";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // Email/Password login
  const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // Email/Password register
  const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  // Google login
  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  // Update profile for Email/Password user
  const updateUserProfile = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, { displayName, photoURL })
      .then(() => setUser({ ...auth.currentUser }))
      .catch(err => console.log(err));
  };

  // Logout
  const logOut = () => {
    setIsLoading(true);
    return signOut(auth);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    signIn,
    createUser,
    signInWithGoogle,
    updateUserProfile,
    logOut,
    user,
    isLoading
  };

  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
