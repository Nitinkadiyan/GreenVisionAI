import { useEffect, useRef, useCallback } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001";

export default function GoogleLogin({ onSuccess, onError }) {
  const googleButtonRef = useRef(null);

  const handleGoogleResponse = useCallback(
    async (response) => {
      try {
        const result = await axios.post(
          `${API_URL}/auth/google`,
          {
            credential: response.credential,
          },
          {
            withCredentials: true,
          }
        );

        if (result.data.success) {
          onSuccess?.(result.data);
        }
      } catch (error) {
        const message =
          error.response?.data?.message ||
          "Google login failed. Please try again.";

        console.error("Google login failed:", message);
        onError?.(message);
      }
    },
    [onSuccess, onError]
  );

  useEffect(() => {
    let cancelled = false;

    const initializeGoogle = () => {
      if (
        cancelled ||
        !window.google ||
        !googleButtonRef.current ||
        !import.meta.env.VITE_GOOGLE_CLIENT_ID
      ) {
        return;
      }

      googleButtonRef.current.innerHTML = "";

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width: 280,
        }
      );
    };

    const scriptUrl =
      "https://accounts.google.com/gsi/client";

    let script = document.querySelector(
      `script[src="${scriptUrl}"]`
    );

    if (window.google) {
      initializeGoogle();
    } else if (script) {
      script.addEventListener("load", initializeGoogle, {
        once: true,
      });
    } else {
      script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;

      script.onerror = () => {
        onError?.("Unable to load Google sign-in.");
      };

      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
    };
  }, [handleGoogleResponse, onError]);

  return (
    <div className="relative w-full">
      {/* Your custom button */}
      <button
        type="button"
        onClick={() => {
          const googleButton =
            googleButtonRef.current?.querySelector(
              'div[role="button"]'
            );

          if (googleButton) {
            googleButton.click();
          } else {
            onError?.(
              "Google sign-in is still loading. Please try again."
            );
          }
        }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/30"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M23.5 12.27c0-.86-.08-1.7-.22-2.5H12v4.73h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.86c2.26-2.08 3.58-5.15 3.58-8.85Z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.96-1.08 7.95-2.9l-3.87-3a7.2 7.2 0 0 1-10.72-3.77H1.36v3.09A12 12 0 0 0 12 24Z"
          />
          <path
            fill="#FBBC05"
            d="M5.36 14.33a7.2 7.2 0 0 1 0-4.6V6.64H1.36a12 12 0 0 0 0 10.78l4-3.09Z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.42C17.95 1.2 15.24 0 12 0A12 12 0 0 0 1.36 6.64l4 3.09A7.2 7.2 0 0 1 12 4.75Z"
          />
        </svg>

        Continue with Google
      </button>

      {/* Google's actual button, positioned over the custom button */}
      <div
        ref={googleButtonRef}
        className="absolute inset-0 z-10 opacity-0"
        aria-hidden="true"
      />
    </div>
  );
}