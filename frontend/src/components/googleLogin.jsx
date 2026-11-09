
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001";

const GOOGLE_SCRIPT_URL =
  "https://accounts.google.com/gsi/client";

export default function GoogleLogin({
  onSuccess,
  onError,
  role = "citizen",
  accessCode = "",
}) {
  const googleButtonRef = useRef(null);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  const [scriptReady, setScriptReady] = useState(
    Boolean(window.google?.accounts?.id)
  );

  const [buttonWidth, setButtonWidth] = useState(320);

  // Keep the latest callbacks without repeatedly initializing Google.
  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  }, [onSuccess, onError]);

  // Load Google Identity Services.
  useEffect(() => {
    if (window.google?.accounts?.id) {
      setScriptReady(true);
      return;
    }

    let script = document.querySelector(
      `script[src="${GOOGLE_SCRIPT_URL}"]`
    );

    const handleLoad = () => setScriptReady(true);

    const handleError = () => {
      onErrorRef.current?.(
        "Unable to load Google authentication. Please try again."
      );
    };

    if (!script) {
      script = document.createElement("script");
      script.src = GOOGLE_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    return () => {
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);
    };
  }, []);

  // Measure the available width for Google's real button.
  useEffect(() => {
    const container = googleButtonRef.current;

    if (!container) return;

    const updateWidth = () => {
      const availableWidth = container.clientWidth;

      if (availableWidth > 0) {
        setButtonWidth(Math.min(availableWidth, 400));
      }
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // Initialize and render the Google button.
  useEffect(() => {
    if (!scriptReady || !window.google?.accounts?.id) return;

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!clientId) {
      onErrorRef.current?.(
        "Google Client ID is missing. Check your frontend environment variables."
      );
      return;
    }

    const container = googleButtonRef.current;

    if (!container) return;

    container.innerHTML = "";

    window.google.accounts.id.initialize({
      client_id: clientId,

      callback: async (response) => {
        try {
          if (!response?.credential) {
            throw new Error("Google credential was not received.");
          }

          const result = await axios.post(
            `${API_URL}/google`,
            {
              credential: response.credential,
              role,
              accessCode:
                role === "government" ? accessCode.trim() : "",
            },
            {
              withCredentials: true,
            }
          );

          onSuccessRef.current?.(result.data);
        } catch (error) {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Google authentication failed.";

          onErrorRef.current?.(message);
        }
      },
    });

    window.google.accounts.id.renderButton(container, {
      theme: "outline",
      size: "large",
      text: "continue_with",
      shape: "rectangular",
      width: buttonWidth,
    });

    return () => {
      container.innerHTML = "";
    };
  }, [scriptReady, buttonWidth, role, accessCode]);

  return (
    <div className="w-full">
      <div
        ref={googleButtonRef}
        className="flex min-h-10 w-full justify-center overflow-hidden"
      />

      {!scriptReady && (
        <p className="mt-2 text-center text-xs text-slate-500">
          Loading Google sign-in...
        </p>
      )}
    </div>
  );
}
