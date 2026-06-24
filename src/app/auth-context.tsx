"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type AuthMode = "login" | "signup" | "forgot";

type User = {
  name?: string;
  email: string;
  token?: string;
};

type AuthResult = {
  success: boolean;
  message: string;
  user?: User | null;
  verificationId?: string;
  resetToken?: string;
};

type AuthContextType = {
  user: User | null;
  authModalOpen: boolean;
  authMode: AuthMode;
  openAuthModal: (mode?: AuthMode) => void;
  closeAuthModal: () => void;
  setAuthMode: (mode: AuthMode) => void;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (name: string, email: string, password: string) => Promise<AuthResult>;
  forgotPassword: (email: string) => Promise<AuthResult>;
  verifyOtp: (verificationId: string, otp: string) => Promise<AuthResult>;
  resetPassword: (resetToken: string, newPassword: string) => Promise<AuthResult>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = "https://dinesh-sagel-backend.onrender.com";
const CURRENT_USER_KEY = "fitness-current-user";
export const PASSWORD_RULE_MESSAGE = "Password first letter capital ho, aur _ @ number include hona chahiye.";

function isValidPassword(password: string) {
  return /^[A-Z](?=.*_)(?=.*@)(?=.*\d).{5,}$/.test(password);
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Deep search for a string value among given keys
function findString(value: unknown, keys: string[]): string | undefined {
  if (!isRecord(value) && !Array.isArray(value)) return undefined;

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findString(item, keys);
      if (found) return found;
    }
    return undefined;
  }

  for (const key of keys) {
    const direct = value[key];
    if (typeof direct === "string" && direct.trim()) return direct;
  }

  for (const item of Object.values(value)) {
    const found = findString(item, keys);
    if (found) return found;
  }

  return undefined;
}

// Find user payload (object containing email)
function findUserPayload(value: unknown): Record<string, unknown> | undefined {
  if (!isRecord(value) && !Array.isArray(value)) return undefined;

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findUserPayload(item);
      if (found) return found;
    }
    return undefined;
  }

  if (isRecord(value.user)) return value.user;
  if (typeof value.email === "string") return value;

  for (const item of Object.values(value)) {
    const found = findUserPayload(item);
    if (found) return found;
  }

  return undefined;
}

function getResponseMessage(data: unknown, fallback: string) {
  return findString(data, ["message", "msg", "error"]) ?? fallback;
}

function parseStoredUser(value: string | null): User | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    if (!isRecord(parsed) || typeof parsed.email !== "string") return null;
    return {
      name: typeof parsed.name === "string" ? parsed.name : undefined,
      email: parsed.email,
      token: typeof parsed.token === "string" ? parsed.token : undefined,
    };
  } catch {
    return null;
  }
}

// Enhanced buildUser with token extraction and logging
function buildUser(data: unknown, fallbackEmail: string, fallbackName?: string): User {
  console.log("🔍 Auth response data:", JSON.stringify(data, null, 2));

  const userPayload = findUserPayload(data);
  const token = findString(data, [
    "token",
    "accessToken",
    "authToken",
    "jwt",
    "access_token",
    "authorization",
  ]);

  if (!token) {
    console.warn("⚠️ No token found in response. Available keys:", Object.keys(isRecord(data) ? data : {}));
    // Optionally throw an error if token is mandatory
    // throw new Error("Token missing in response. Authentication failed.");
  }

  const email =
    userPayload && typeof userPayload.email === "string"
      ? userPayload.email
      : normalizeEmail(fallbackEmail);

  const name =
    userPayload && typeof userPayload.name === "string"
      ? userPayload.name
      : userPayload && typeof userPayload.username === "string"
        ? userPayload.username
        : userPayload && typeof userPayload.fullName === "string"
          ? userPayload.fullName
          : fallbackName?.trim() || undefined;

  const user = { name, email, token };
  console.log("✅ Built user:", user);
  return user;
}

async function postAuth(path: string, body: Record<string, string>) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  let data: unknown = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    throw new Error(getResponseMessage(data, "Something went wrong. Please try again."));
  }

  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    return parseStoredUser(window.localStorage.getItem(CURRENT_USER_KEY));
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user) {
      window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      console.log("💾 User saved to localStorage:", user);
    } else {
      window.localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    if (!email.trim() || !password.trim()) {
      return { success: false, message: "Please enter email and password." };
    }

    try {
      const data = await postAuth("/api/user/auth/login", { email: normalizeEmail(email), password });
      const activeUser = buildUser(data, email);
      setUser(activeUser);
      setAuthModalOpen(false);
      return {
        success: true,
        message: getResponseMessage(data, "Login successful."),
        user: activeUser,
      };
    } catch (error) {
      return { success: false, message: error instanceof Error ? error.message : "Login failed. Please try again." };
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string): Promise<AuthResult> => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return { success: false, message: "Please fill all fields to create an account." };
    }
    if (password.length < 6) {
      return { success: false, message: "Password should be at least 6 characters." };
    }
    if (!isValidPassword(password)) {
      return { success: false, message: PASSWORD_RULE_MESSAGE };
    }

    try {
      const data = await postAuth("/api/user/auth/signUp", {
        username: name.trim(),
        email: normalizeEmail(email),
        password,
      });
      const activeUser = buildUser(data, email, name);
      setUser(activeUser);
      setAuthModalOpen(false);
      return {
        success: true,
        message: getResponseMessage(data, "Account created successfully."),
        user: activeUser,
      };
    } catch (error) {
      return { success: false, message: error instanceof Error ? error.message : "Sign up failed. Please try again." };
    }
  }, []);

  const forgotPassword = useCallback(async (email: string): Promise<AuthResult> => {
    if (!email.trim()) {
      return { success: false, message: "Please enter your registered email first." };
    }

    try {
      const data = await postAuth("/api/user/auth/forgot-password", { email: normalizeEmail(email) });
      const verificationId = findString(data, ["verificationId", "verification_id", "id"]);
      if (!verificationId) {
        return { success: false, message: "OTP sent, but verification id was not returned by the server." };
      }
      return {
        success: true,
        message: getResponseMessage(data, `OTP sent to ${email}.`),
        verificationId,
      };
    } catch (error) {
      return { success: false, message: error instanceof Error ? error.message : "Could not send OTP. Please try again." };
    }
  }, []);

  const verifyOtp = useCallback(async (verificationId: string, otp: string): Promise<AuthResult> => {
    if (!verificationId.trim()) {
      return { success: false, message: "Verification id is missing. Please request OTP again." };
    }
    if (!otp.trim()) {
      return { success: false, message: "Please enter the OTP." };
    }

    try {
      const data = await postAuth("/api/user/auth/verify-otp", { verificationId, otp: otp.trim() });
      const resetToken = findString(data, ["resetToken", "reset_token", "token"]);
      if (!resetToken) {
        return { success: false, message: "OTP verified, but reset token was not returned by the server." };
      }
      return {
        success: true,
        message: getResponseMessage(data, "OTP verified. Now create your new password."),
        resetToken,
      };
    } catch (error) {
      return { success: false, message: error instanceof Error ? error.message : "OTP verification failed. Please try again." };
    }
  }, []);

  const resetPassword = useCallback(async (resetToken: string, newPassword: string): Promise<AuthResult> => {
    if (!resetToken.trim()) {
      return { success: false, message: "Reset token is missing. Please verify OTP again." };
    }
    if (!newPassword.trim()) {
      return { success: false, message: "Please enter a new password." };
    }
    if (newPassword.length < 6) {
      return { success: false, message: "Password should be at least 6 characters." };
    }
    if (!isValidPassword(newPassword)) {
      return { success: false, message: PASSWORD_RULE_MESSAGE };
    }

    try {
      const data = await postAuth("/api/user/auth/reset-password", { resetToken, newPassword });
      return {
        success: true,
        message: getResponseMessage(data, "Password updated successfully. Please login with your new password."),
      };
    } catch (error) {
      return { success: false, message: error instanceof Error ? error.message : "Password reset failed. Please try again." };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setAuthModalOpen(false);
  }, []);

  const openAuthModal = useCallback((mode: AuthMode = "login") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      authModalOpen,
      authMode,
      openAuthModal,
      closeAuthModal,
      setAuthMode,
      login,
      signup,
      forgotPassword,
      verifyOtp,
      resetPassword,
      logout,
    }),
    [user, authModalOpen, authMode, openAuthModal, closeAuthModal, login, signup, forgotPassword, verifyOtp, resetPassword, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}