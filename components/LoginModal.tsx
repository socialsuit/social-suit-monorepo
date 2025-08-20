import { useState } from "react";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Sign In</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="space-y-4">
          {/* Wallet Login Button */}
          <button
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
            onClick={() => alert("Wallet login coming soon")}
          >
            Connect Wallet
          </button>

          {/* OR Divider */}
          <div className="text-center text-gray-500">OR</div>

          {/* Email Login */}
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
            onClick={() => alert(`Login with ${email} coming soon`)}
          >
            Login with Email
          </button>
        </div>
      </div>
    </div>
  );
}

