import React from "react";

const EmailVerifyPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-11/12 md:w-1/2 lg:w-1/3 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Email Verified Successfully</h1>
        <p className="text-gray-600 text-lg mb-6">
          Thank you! Your email has been verified. You can now log in to your account and start exploring.
        </p>
        <a
          href="https://berichlibrary.coldbydefault.com/pages/login"
          className="bg-blue-500 text-white py-2 px-6 rounded-md text-lg hover:bg-blue-600 transition duration-200"
        >
          Log In
        </a>
      </div>
    </div>
  );
};

export default EmailVerifyPage;
