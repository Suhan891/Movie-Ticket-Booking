import React from "react";

const VerifyPending = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-3">
          Verify your email 📩
        </h1>

        <p className="text-gray-300 mb-4">
          We just sent a verification link to your email.
          Click the link in the email to activate your account.
        </p>

        <p className="text-gray-400 text-sm">
          Didn’t receive the email? Check your spam folder — or wait
          1–2 minutes.
        </p>
      </div>
    </div>
  );
};

export default VerifyPending;
