import React from "react";

const AuthLayout = ({ title = "Welcome", children }) => {
  return (
    <div
      className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-transparent"
      style={{ fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}
    >
      <div className="w-full max-w-md">
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
