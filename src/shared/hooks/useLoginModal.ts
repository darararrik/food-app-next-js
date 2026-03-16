import { useState } from "react";
import { useRootStore } from "@/store/RootStoreProvider";

export const useLoginModal = (onClose: () => void) => {
  const { userStore: userStore } = useRootStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [localError, setLocalError] = useState("");

  const validate = () => {
    if (username.length < 3) {
      setLocalError("Username must be at least 3 characters");
      return false;
    }
    if (!isLogin && !email.includes("@")) {
      setLocalError("Please enter a valid email");
      return false;
    }
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!validate()) return;

    let success;
    if (isLogin) {
      success = await userStore.login(username, password);
    } else {
      success = await userStore.register(username, email, password);
    }

    if (success) {
      onClose();
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setLocalError("");
    setEmail("");
    setPassword("");
    setUsername("");
  };

  return {
    isLogin,
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    error: localError || userStore.error,
    loading: userStore.isLoading,
    handleSubmit,
    toggleMode,
  };
};
