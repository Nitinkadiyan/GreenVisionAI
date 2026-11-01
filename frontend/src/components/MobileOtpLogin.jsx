
import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001";

export default function MobileOtpLogin({ onLoginSuccess, onBack }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/auth/send-mobile-otp`,
        { phone: phone.trim() }
      );

      if (response.data.success) {
        setOtpSent(true);
        setMessage("OTP generated. Check your backend terminal during local development.");
      } else {
        setError(response.data.message || "Unable to generate OTP.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/auth/verify-mobile-otp`,
        {
          phone: phone.trim(),
          otp: otp.trim(),
        }
      );

      if (response.data.success) {
        const { token, user } = response.data;

        // Store the token using the same approach as your existing login.
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setMessage("Login successful!");

        if (onLoginSuccess) {
          onLoginSuccess(user, token);
        }
      } else {
        setError(response.data.message || "OTP verification failed.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mobile-otp-login">
      <h2>Login with Mobile OTP</h2>
      <p>Enter your registered and verified phone number to continue.</p>

      {!otpSent ? (
        <form onSubmit={handleSendOtp}>
          <label htmlFor="phone">Phone Number</label>

          <input
            id="phone"
            type="tel"
            placeholder="Enter your registered phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Generating OTP..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <p>
            Enter the OTP generated for your registered phone number.
          </p>

          <label htmlFor="otp">One-Time Password</label>

          <input
            id="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            maxLength={6}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify & Login"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setOtp("");
              setOtpSent(false);
              setMessage("");
              setError("");
            }}
          >
            Change Phone Number
          </button>
        </form>
      )}

      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}

      {onBack && (
        <button type="button" onClick={onBack} disabled={loading}>
          Back to Login
        </button>
      )}
    </div>
  );
}

