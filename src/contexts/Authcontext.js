import React, { useState, useEffect } from 'react';
import { auth } from '../service/Myfirebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import Loading from '../components/Loading';

export const Authcontext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // return unsubscribe;
  }, []);

  if (loading) {
    return <Loading />;
  }

  const value = {
    user,
    signup,
    login,
    logout,
  };

  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
}

// export function useAuth() {
//   return useContext(Authcontext);
// }
