import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import FloatingBubles from './components/ui/FloatingBubles.jsx'
import AuthLayout from './components/layouts/AuthLayout.jsx'
import Signupform from './components/ui/Forms/Signupform.jsx'
import SigninForm from './components/ui/Forms/SigninForm.jsx'
import RestForm from './components/ui/Forms/RestForm.jsx'

function App() {
  // Debug: Check if component renders
  console.log('App rendered');

  return (
    <>
      {/* FloatingBubles as background */}
      <FloatingBubles />
      <div className="relative z-10">
        <Routes>
          <Route
            path="/signup"
            element={
              <AuthLayout title="Sign Up">
                <Signupform />
              </AuthLayout>
            }
          />
          <Route
            path="/login"
            element={
              <AuthLayout title="Sign In">
                <SigninForm />
              </AuthLayout>
            }
          />
          <Route
            path="/"
            element={
              <AuthLayout title="Sign Up">
                <Signupform />
              </AuthLayout>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <AuthLayout title="Forgot Password">
                <RestForm />
              </AuthLayout>
            }
          />
        </Routes>
      </div>
    </>
  )
}

export default App
