"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase"; // Tipurile pentru starea și acțiunile de autentificare

// Tipurile pentru starea și acțiunile de autentificare
export type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

// Stare inițială implicită
const defaultAuthState: AuthContextType = {
  user: null,
  isAdmin: false,
  login: async () => {},
  logout: async () => {},
};

// Creează Contextul
const AuthContext = createContext<AuthContextType>(defaultAuthState);

// Provider pentru Context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Funcție de autentificare
  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;

      setUser(loggedInUser);
      setIsAdmin(loggedInUser.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL); // Verifică dacă este admin
    } catch (error) {
      console.warn("Autentificarea a fost anulată de utilizator.", error);
    }
  };

  // Funcție de deconectare
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Ascultă schimbările stării utilizatorului Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL)
        setIsAdmin(true);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Valoarea furnizată în context
  const value: AuthContextType = { user, isAdmin, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom Hook pentru a accesa contextul
export const useAuth = () => useContext(AuthContext);
