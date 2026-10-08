import { Check, X } from "lucide-react";
import { useEffect } from "react";

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return undefined;

    const timeout = window.setTimeout(onClose, 2600);
    return () => window.clearTimeout(timeout);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`site-toast site-toast-${message.type || "success"}`} role="status">
      <span className="site-toast-icon"><Check size={17} /></span>
      <span>{message.text}</span>
      <button type="button" onClick={onClose} aria-label="Dismiss notification">
        <X size={16} />
      </button>
    </div>
  );
}

export default Toast;
