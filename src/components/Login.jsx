import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserPlus,
} from "lucide-react";

function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const [loggedIn, setLoggedIn] =
    useState(false);

  const [registeredUser, setRegisteredUser] =
    useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const cleanEmail =
      email.trim().toLowerCase();

    /*
     * Basic validation
     */
    if (!cleanEmail || !password) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    if (!cleanEmail.includes("@")) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    /*
     * If an account has already been
     * registered in this demo session,
     * check the credentials.
     */
    if (registeredUser) {
      if (
        cleanEmail !==
        registeredUser.email
      ) {
        setError(
          "Account not found. Please check your email."
        );
        return;
      }

      if (
        password !==
        registeredUser.password
      ) {
        setError(
          "Incorrect password. Please try again."
        );
        return;
      }

      setLoggedIn(true);
      return;
    }

    /*
     * First login:
     * Save credentials for this demo session.
     */
    setRegisteredUser({
      email: cleanEmail,
      password,
    });

    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  /*
   * Successful login screen
   */
  if (loggedIn) {
    return (
      <div className="login-page">
        <button
          type="button"
          className="login-back-button"
          onClick={onClose}
        >
          <ArrowLeft size={18} />
          Back to SharePal
        </button>

        <div className="login-success-card">
          <div className="login-success-icon">
            ✓
          </div>

          <h1>
            Welcome to SharePal!
          </h1>

          <p>
            You are successfully logged in
            as <strong>{email}</strong>.
          </p>

          <button
            type="button"
            className="login-submit-button"
            onClick={onClose}
          >
            Continue Shopping
          </button>

          <button
            type="button"
            className="signup-button"
            style={{
              marginTop: "10px",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <button
        type="button"
        className="login-back-button"
        onClick={onClose}
      >
        <ArrowLeft size={18} />
        Back to SharePal
      </button>

      <div className="login-page-container">
        {/* Left Side */}
        <div className="login-page-brand">
          <div className="login-brand-logo">
            SharePal
          </div>

          <h2>
            Gaming without
            <br />
            the commitment.
          </h2>

          <p>
            Rent gaming gadgets and
            entertainment devices whenever
            you need them.
          </p>

          <div className="login-benefits">
            <div>
              <span>✓</span>
              Easy doorstep delivery
            </div>

            <div>
              <span>✓</span>
              Quality checked products
            </div>

            <div>
              <span>✓</span>
              Flexible rental periods
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="login-form-card">
          <div className="login-form-header">
            <div className="login-form-icon">
              <LockKeyhole size={22} />
            </div>

            <h1>
              Welcome back
            </h1>

            <p>
              Login to continue to SharePal
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="login-field">
              <label htmlFor="login-email">
                Email address
              </label>

              <div className="login-input-wrapper">
                <Mail size={18} />

                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(
                      e.target.value
                    );
                    setError("");
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-field">
              <div className="login-password-label">
                <label htmlFor="login-password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    setError(
                      "Password reset is not connected yet."
                    )
                  }
                >
                  Forgot password?
                </button>
              </div>

              <div className="login-input-wrapper">
                <LockKeyhole size={18} />

                <input
                  id="login-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(
                      e.target.value
                    );
                    setError("");
                  }}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (current) =>
                        !current
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="login-form-error">
                {error}
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              className="login-submit-button"
            >
              Login
            </button>
          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="signup-button"
            onClick={() =>
              setError(
                "Sign up functionality can be connected to your authentication system."
              )
            }
          >
            <UserPlus size={18} />
            Create a new account
          </button>

          <p className="login-footer-text">
            By continuing, you agree to
            SharePal's Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;