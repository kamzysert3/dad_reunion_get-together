import React from "react";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  submitting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, title, message, submitting, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={onConfirm}
          >
            {submitting ? (
                <svg
                  className="animate-spin h-6 w-6 text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.93A8.003 8.003 0 0112 20v4c-6.627 0-12-5.373-12-12h4a8.003 8.003 0 002.93 6.93z"
                  ></path>
                </svg>
            ) : (
                <span className="inline-block">Confirm</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
