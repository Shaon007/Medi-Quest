import { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
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
const githubProvider = new GithubAuthProvider();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signInWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };

  const logOut = async () => {
    return signOut(auth);
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
      if (currentUser) {
        // GitHub may not provide email — fall back to providerData email
        const email =
          currentUser.email ||
          currentUser.providerData?.[0]?.email ||
          null;

        setUser(currentUser);

        if (email) {
          try {
            // Save user in database
            await axios.post(`${import.meta.env.VITE_API_URL}/users/${email}`, {
              name: currentUser?.displayName,
              email,
              image: currentUser?.photoURL,
            });

            // Get JWT token
            const { data } = await axios.post(
              `${import.meta.env.VITE_API_URL}/jwt`,
              { email },
              { withCredentials: true }
            );

            // Store token in localStorage
            if (data?.token) {
              localStorage.setItem('access-token', data.token);
            }
          } catch (error) {
            console.error('Error during auth state change:', error);
          }
        }
      } else {
        setUser(null);
        localStorage.removeItem('access-token');

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
    signInWithGithub,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProviders;
