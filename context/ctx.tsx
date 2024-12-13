"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type TypingContextType = {
  isSpeaking: boolean;
  isTyping: boolean;
  setIsSpeaking: (Speaking: boolean) => void;
  setIsTyping: (typing: boolean) => void;
  setSendSound: (sendSound: boolean) => void;
  sendSound: boolean;
  isSoundAllowed: boolean;
  setIsSoundAllowed: (soundAllowed: boolean) => void;
};

const TypingContext = createContext<TypingContextType | undefined>(undefined);

type TypingProviderProps = {
  children: ReactNode;
};

export const TypingProvider: React.FC<TypingProviderProps> = ({ children }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sendSound, setSendSound] = useState(false);
  const [isSoundAllowed, setIsSoundAllowed] = useState(false);

  return (
    <TypingContext.Provider
      value={{
        isSpeaking,
        isTyping,
        setIsSpeaking,
        setIsTyping,
        sendSound,
        setSendSound,
        isSoundAllowed,
        setIsSoundAllowed,
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
