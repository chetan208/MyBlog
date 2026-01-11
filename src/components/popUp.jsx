import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Popup({
  open,
  onClose,
  title,
  children,
  width = "400px",
}) {
  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 dark:bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        style={{ width }}
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900 p-6 z-10 animate-scaleIn"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="text-gray-800 dark:text-gray-200">{children}</div>
      </div>
    </div>,
    document.body
  );
}
