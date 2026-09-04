"use client";
import { Mail } from "lucide-react";
import { useRef, useState } from "react";
import { Check, Leaf, MailCheck } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const OTP_LENGTH = 6;
import axios from "axios";
export default function Page() {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const inputRefs = useRef([]);
  const navigate= useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  console.log("Email: ", email);
  const updateDigit = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((digit, index) => {
      next[index] = digit;
    });
    setOtp(next);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus();
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (event.key === "ArrowLeft" && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1)
      inputRefs.current[index + 1]?.focus();
  };

  const submitOTP = async (e) => {
    e.preventDefault();

    try {
      console.log("nikku");
      // console.log(email);
      // setSubmitted = true;
      const Value = otp.join("");
      console.log("otp", Value);
      const response = await axios.post("http://localhost:3000/verify-email", {
        email: email,
        otp: Value,
      });

      console.log(response.data);
      navigate("/login", {
        state: {
          email: email,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8fbf8] px-4 py-10 text-[#163b2a]">
      <section
        className="w-full max-w-md rounded-[2rem] border border-[#e0ebe3] bg-white px-6 py-9 shadow-[0_24px_70px_rgba(38,89,58,0.12)] sm:px-10 sm:py-11"
        aria-labelledby="page-title"
      >
        <div className="mb-8 flex items-center justify-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dff3e5] text-[#21834a]">
            <Leaf size={19} strokeWidth={2.4} />
          </div>
          <span className="text-lg font-semibold tracking-[-0.03em]">
            GreenVision <span className="text-[#21834a]">AI</span>
          </span>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#dff3e5] text-[#21834a]">
              <Check size={28} />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              OTP submitted
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#6d8275]">
              Your verification code is ready to be checked.
            </p>
          </div>
        ) : (
          <form onSubmit={submitOTP}>
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf7ed] text-[#21834a]">
                <MailCheck size={25} strokeWidth={1.8} />
              </div>
              <h1
                id="page-title"
                className="text-[1.8rem] font-semibold tracking-[-0.04em] sm:text-[2rem]"
              >
                Enter your OTP
              </h1>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#6d8275]">
                Enter the 6-digit verification code sent to your email address.
              </p>
            </div>

            <div className="mt-9" onPaste={handlePaste}>
              <label
                className="mb-3 block text-sm font-semibold"
                htmlFor="otp-0"
              >
                Verification code
              </label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    ref={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    value={digit}
                    onChange={(event) => updateDigit(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    inputMode="numeric"
                    maxLength={1}
                    autoFocus={index === 0}
                    aria-label={`OTP digit ${index + 1} of ${OTP_LENGTH}`}
                    className="h-14 min-w-0 flex-1 rounded-xl border border-[#d8e6dc] bg-white text-center text-xl font-semibold outline-none transition focus:border-[#21834a] focus:ring-4 focus:ring-[#d8f1df]"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!otp.every(Boolean)}
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#21834a] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#176d3b] focus:outline-none focus:ring-4 focus:ring-[#b9e6c7] disabled:cursor-not-allowed disabled:bg-[#b7cdbd]"
            >
              Submit OTP
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
