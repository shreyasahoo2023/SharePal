import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserPlus,
  UserRound,
} from "lucide-react";

const ACCOUNTS_KEY = "sharepal-demo-accounts";

function loadAccounts() {
  try {
    const value = localStorage.getItem(ACCOUNTS_KEY);
    const accounts = value ? JSON.parse(value) : [];
    return Array.isArray(accounts) ? accounts : [];
  } catch (error) {
    console.error("Unable to read demo accounts from local storage.", error);
    return [];
  }
}

function Login({ onClose }) {
  const [mode, setMode] = useState("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const normalizedEmail = email.trim().toLowerCase();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!normalizedEmail || !password || (mode === "signup" && !fullName.trim())) {
      setError("Please complete all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    const accounts = loadAccounts();
    if (mode === "signup") {
      if (password !== confirmPassword) {
        setError("Your passwords do not match.");
        return;
      }
      if (accounts.some((account) => account.email === normalizedEmail)) {
        setError("An account with this email already exists. Please log in.");
        return;
      }

      const newAccount = {
        name: fullName.trim(),
        email: normalizedEmail,
        password,
      };
      try {
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, newAccount]));
      } catch (storageError) {
        console.error("Unable to save the demo account.", storageError);
        setError("We couldn't save your demo account in this browser.");
        return;
      }
      setUser(newAccount);
      return;
    }

    const account = accounts.find((item) => item.email === normalizedEmail);
    if (!account || account.password !== password) {
      setError("Email or password is incorrect. Create a demo account if you are new.");
      return;
    }
    setUser(account);
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  if (user) {
    return (
      <div className="login-page">
        <button type="button" className="login-back-button" onClick={onClose}>
          <ArrowLeft size={18} />
          Back to SharePal
        </button>
        <div className="login-success-card">
          <div className="login-success-icon">✓</div>
          <h1>Welcome to SharePal, {user.name}!</h1>
          <p>
            You are signed in to this frontend demo as{" "}
            <strong>{user.email}</strong>.
          </p>
          <p className="login-demo-notice">
            This is a local demo only, not real authentication.
          </p>
          <button type="button" className="login-submit-button" onClick={onClose}>
            Continue Shopping
          </button>
          <button
            type="button"
            className="signup-button"
            style={{ marginTop: "10px" }}
            onClick={() => {
              setUser(null);
              setEmail("");
              setPassword("");
              setMode("login");
            }}
          >
            Log out
          </button>
        </div>
      </div>
    );
  }

  const isSignup = mode === "signup";

  return (
    <div className="login-page">
      <button type="button" className="login-back-button" onClick={onClose}>
        <ArrowLeft size={18} />
        Back to SharePal
      </button>
      <div className="login-page-container">
        <div className="login-page-brand">
          <div className="login-brand-logo">SharePal</div>
          <h2>
            Gaming without
            <br />
            the commitment.
          </h2>
          <p>
            Rent gaming gadgets and entertainment devices whenever you need them.
          </p>
          <div className="login-benefits">
            <div><span>✓</span>Easy doorstep delivery</div>
            <div><span>✓</span>Quality checked products</div>
            <div><span>✓</span>Flexible rental periods</div>
          </div>
        </div>

        <div className="login-form-card">
          <div className="login-form-header">
            <div className="login-form-icon">
              {isSignup ? <UserPlus size={22} /> : <LockKeyhole size={22} />}
            </div>
            <h1>{isSignup ? "Create your account" : "Welcome back"}</h1>
            <p>{isSignup ? "Join SharePal with a demo account" : "Login to continue to SharePal"}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="login-field">
                <label htmlFor="signup-name">Full name</label>
                <div className="login-input-wrapper">
                  <UserRound size={18} />
                  <input
                    id="signup-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            <div className="login-field">
              <label htmlFor="login-email">Email address</label>
              <div className="login-input-wrapper">
                <Mail size={18} />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="login-field">
              <label htmlFor="login-password">Password</label>
              <div className="login-input-wrapper">
                <LockKeyhole size={18} />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  placeholder={isSignup ? "At least 6 characters" : "Enter your password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((shown) => !shown)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {isSignup && (
              <div className="login-field">
                <label htmlFor="confirm-password">Confirm password</label>
                <div className="login-input-wrapper">
                  <LockKeyhole size={18} />
                  <input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Enter your password again"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {error && <div className="login-form-error" role="alert">{error}</div>}
            <button type="submit" className="login-submit-button">
              {isSignup ? "Create account" : "Login"}
            </button>
          </form>

          <p className="login-demo-notice">
            Frontend demo only. Account data is stored in this browser and is not secure authentication.
          </p>
          <div className="login-divider"><span>OR</span></div>
          <button
            type="button"
            className="signup-button"
            onClick={() => switchMode(isSignup ? "login" : "signup")}
          >
            <UserPlus size={18} />
            {isSignup ? "Back to Login" : "Create a new account"}
          </button>
          <p className="login-footer-text">
            By continuing, you agree to SharePal&apos;s Terms &amp; Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
