import { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import axios from 'axios';
import { app } from '../Firebase/Firebase.config';
import LoadingSpinner from '../Component/Shared/LoadinSpinner';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() => {
      setLoading(false);
    });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() => {
      setLoading(false);
    });
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() => {
      setLoading(false);
    });
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth).finally(() => {
      setLoading(false);
    });
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);

        try {
          // Save user in database
          await axios.post(`${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`, {
            name: currentUser?.displayName,
            email: currentUser?.email,
            image: currentUser?.photoURL,
          });

          // Get JWT token
          await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email: currentUser?.email },
            { withCredentials: true }
          );
        } catch (error) {
          console.error('Error during auth state change:', error);
        }
      } else {
        setUser(null);

        try {
          // Handle logout cleanup
          await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
            withCredentials: true,
          });
        } catch (error) {
          console.error('Error during logout:', error);
        }
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <LoadingSpinner/> : children} 
    </AuthContext.Provider>
  );
};

export default AuthProviders;
