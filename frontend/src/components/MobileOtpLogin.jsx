
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
const RESEND_COOLDOWN = 30;

export default function MobileOtpLogin({ onLoginSuccess, onBack }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Resend OTP countdown
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setTimeout(() => {
      setCooldown((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cooldown]);

  const validatePhone = () => {
    const digits = phone.replace(/\D/g, "");

    // Accept a 10-digit Indian number or a 12-digit number starting with 91.
    const isValid =
      /^[6-9]\d{9}$/.test(digits) ||
      /^91[6-9]\d{9}$/.test(digits);

    if (!isValid) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return false;
    }

    return true;
  };

  const requestOtp = async () => {
    setError("");
    setMessage("");

    if (!validatePhone()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/auth/send-mobile-otp`,
        { phone: phone.trim() },
        { withCredentials: true }
      );

      if (!response.data.success) {
        setError(response.data.message || "Unable to generate OTP.");
        return;
      }

      setOtpSent(true);
      setOtp("");
      setCooldown(RESEND_COOLDOWN);
      setMessage("OTP sent successfully. Please check your phone.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    await requestOtp();
  };

  const handleResendOtp = async () => {
    if (cooldown > 0 || loading) return;
    await requestOtp();
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/auth/verify-mobile-otp`,
        {
          phone: phone.trim(),
          otp,
        },
        { withCredentials: true }
      );

      if (!response.data.success) {
        setError(response.data.message || "OTP verification failed.");
        return;
      }

      const { token, user } = response.data;

      if (!token || !user) {
        setError("Invalid server response. Please try again.");
        return;
      }

      // Login.jsx handles token storage and navigation.
      onLoginSuccess?.(user, token);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid or expired OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangePhone = () => {
    setOtp("");
    setOtpSent(false);
    setCooldown(0);
    setMessage("");
    setError("");
  };

  return (
    <div className="mobile-otp-login w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2">
        Login with Mobile OTP
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        Enter your registered mobile number to continue.
      </p>

      {!otpSent ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium mb-2"
            >
              Mobile Number
            </label>

            <input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Enter your mobile number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError("");
              }}
              disabled={loading}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 text-white py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Enter the 6-digit OTP sent to{" "}
              <strong>{phone}</strong>.
            </p>

            <label
              htmlFor="otp"
              className="block text-sm font-medium mb-2"
            >
              One-Time Password
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                setError("");
              }}
              maxLength={6}
              disabled={loading}
              className="w-full rounded-lg border px-4 py-3 text-center tracking-[0.5em] text-xl outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full rounded-lg bg-green-600 text-white py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify & Login"}
          </button>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={handleChangePhone}
              disabled={loading}
              className="text-gray-600 hover:text-green-600 disabled:opacity-50"
            >
              Change number
            </button>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={loading || cooldown > 0}
              className="text-green-600 font-medium disabled:text-gray-400"
            >
              {cooldown > 0
                ? `Resend OTP in ${cooldown}s`
                : "Resend OTP"}
            </button>
          </div>
        </form>
      )}

      {message && (
        <p role="status" className="mt-4 text-sm text-green-600">
          {message}
        </p>
      )}

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="mt-6 text-sm text-gray-600 hover:text-green-600 disabled:opacity-50"
        >
          ← Back to Login
        </button>
      )}
    </div>
  );
}
