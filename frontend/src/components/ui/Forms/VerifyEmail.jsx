import React, { useState } from 'react'

const VerifyEmail = () => {
    const [code, setCode] = useState('')

    const handleChange = (e) => {
        const { value } = e.target;
        setCode(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        // handle verify email logic here
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl px-12 py-10 border border-blue-100 font-[Inter,sans-serif] w-full max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}
        >
            <div className="mb-5 text-center">
                <h3 className="text-xl font-semibold text-blue-900 mb-1 tracking-tight">
                    Verify your email
                </h3>
                <p className="text-xs text-blue-400">
                    Enter the verification code sent to your email
                </p>
            </div>
            <div className="flex justify-center">
                <div className="relative w-32">
                    <input
                        className="peer w-full text-center tracking-widest text-lg px-2 py-2 border border-blue-100 rounded-lg bg-white/80 focus:border-blue-300 focus:ring-2 focus:ring-blue-50 outline-none transition placeholder-transparent text-blue-900 font-semibold shadow-sm"
                        type="text"
                        id="code"
                        name="code"
                        value={code}
                        onChange={handleChange}
                        required
                        autoComplete="one-time-code"
                        placeholder=" "
                        maxLength={6}
                        style={{ fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif", letterSpacing: "0.2em" }}
                    />
                    <label
                        htmlFor="code"
                        className="absolute left-1/2 -translate-x-1/2 top-2 text-blue-300 text-sm transition-all
                            peer-placeholder-shown:top-2
                            peer-placeholder-shown:text-sm
                            peer-placeholder-shown:text-blue-300
                            peer-focus:-top-4
                            peer-focus:text-xs
                            peer-focus:text-blue-500
                            peer-focus:bg-white/80
                            px-1 pointer-events-none font-medium
                            peer-not-placeholder-shown:-top-4
                            peer-not-placeholder-shown:text-xs
                            peer-not-placeholder-shown:text-blue-500
                            bg-white/80"
                        style={{ fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}
                    >
                        Code
                    </label>
                </div>
            </div>
            <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-blue-400 to-indigo-400 text-white font-semibold rounded-lg shadow hover:from-blue-500 hover:to-indigo-500 transition text-base tracking-wide"
                style={{ fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}
            >
                Verify Email
            </button>
        </form>
    )
}

export default VerifyEmail
