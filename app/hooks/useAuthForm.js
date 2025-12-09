import { useState } from "react";

/**
 * Custom hook for authentication forms (Login/Signup)
 * Manages common form states: email, password, loading, errorMsg
 */
export function useAuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Reset all form fields
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrorMsg("");
  };

  return {
    // States
    email,
    password,
    loading,
    errorMsg,

    // Setters
    setEmail,
    setPassword,
    setLoading,
    setErrorMsg,

    // Utility
    resetForm,
  };
}
