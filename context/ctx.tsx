"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type TypingContextType = {
  isLoading: boolean;
  isTyping: boolean;
  setIsLoading: (loading: boolean) => void;
  setIsTyping: (typing: boolean) => void;
  setSendSound: (sendSound: boolean) => void;
  sendSound: boolean;
};

const TypingContext = createContext<TypingContextType | undefined>(undefined);

type TypingProviderProps = {
  children: ReactNode;
};

export const TypingProvider: React.FC<TypingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sendSound, setSendSound] = useState(false);

  return (
    <TypingContext.Provider
      value={{
        isLoading,
        isTyping,
        setIsLoading,
        setIsTyping,
        sendSound,
        setSendSound,
      }}
    >
      {children}
    </TypingContext.Provider>
  );
};

export const useTypingContext = (): TypingContextType => {
  const context = useContext(TypingContext);
  if (!context) {
    throw new Error("useTypingContext must be used within a TypingProvider");
  }
  return context;
};
