import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';


const AuthForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: ""
  })
  
  const [errors, setErrors] = useState({})

  const {registerAuth, loginAuth} = useAuth()

  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      password: "",
      email: ""
    })
  };

  const validateForm = ()=>{
        const newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(isLogin) {
            if(!formData.email) newErrors.email = "Email is required";
              else if(!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
            if(!formData.password) newErrors.password = "Password is required";
        } else {
            if(!formData.name) newErrors.name = "Username is required";
            if(!formData.email) newErrors.email = "Email is required";
              else if(!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
            if(!formData.password) newErrors.password = "Password is required";
              else if(formData.password.length < 6) newErrors.password = "Password must be of 6 characters";
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }


  const handleChange = (e)=>{
    setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
    setErrors({...errors, [e.target.name]:""})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!validateForm()) return 

    if(isLogin){
      await loginAuth({
        email: formData.email,
        password: formData.password
      })
    } else {
      await registerAuth({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
    }

    setFormData({
      name: "",
      password: "",
      email: ""
    })

    if(!isLogin)
    navigate("/verify-pending")
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-700">
          
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            
            {/* Name Field - Only visible during Sign Up */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    type="text"
                    required
                    onChange={handleChange}
                    className={`block w-full appearance-none rounded-md border bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${errors.name? "border-red-500" : "border-gray-600"}`}
                  />
                  <p className="text-red-500 text-xs mt-1 ml-1 h-4">{errors.name || ''}</p>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  autoComplete="email"
                  required
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${errors.email? "border-red-500" : "border-gray-600"}`}
                />
                <p className="text-red-500 text-xs mt-1 ml-1 h-4">{errors.email || ''}</p>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  value={formData.password}
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-md border bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${errors.password? "border-red-500" : "border-gray-600"}`}
                />
                <p className="text-red-500 text-xs mt-1 ml-1 h-4">{errors.password || ''}</p>
              </div>
            </div>

            {/* Remember Me & Forgot Password - Only visible during Sign In */}
            {isLogin && (
              <div className="flex flex-row-reverse items-center justify-between pr-3">

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
              >
                {isLogin ? 'Login' : 'Register'}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="inline-flex w-full justify-center rounded-md border border-gray-600 bg-gray-700 py-2 px-4 text-sm font-medium text-gray-200 shadow-sm hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                    <path
                      d="M12.0003 20.45c4.6667 0 7.9167-3.2333 7.9167-8.0333 0-.6667-.0667-1.3-.1834-1.9H12.0003v3.6h4.5334c-.2 1.0667-.8 1.9667-1.7 2.5667l2.75 2.1333c1.6-1.4833 2.5333-3.6667 2.5333-6.1833 0-4.8167-3.9-8.7167-8.7167-8.7167-2.65 0-4.9666 1.1834-6.5333 3.0667L7.467 9.45c1.1-1.95 3.2-3.2667 5.5333-3.2667z"
                      fill="#4285F4"
                    />
                    <path
                      d="M2.517 9.45L4.8336 6.9833C3.267 4.5333 5.4836 2.1167 7.467 3.8L4.8336 6.9833z"
                      fill="#EA4335"
                    />
                    <path
                      d="M12.0003 24c-3.25 0-6.1833-1.2833-8.2833-3.3667l2.75-2.1333c1.0833 1.25 2.9167 2 4.5333 2 4.8167 0 8.7167-3.9 8.7167-8.7167H12.0003v3.6h5.3667c-1.1667 3.3-4.2834 5.6167-7.9667 5.6167z"
                      fill="#34A853"
                    />
                    <path
                      d="M3.7167 14.6833c-.3167-.9333-.5-1.9333-.5-2.9666 0-1.0334.1833-2.0334.5-2.9667L.9667 6.6167C.35 8.2333 0 10.0667 0 12c0 1.9333.35 3.7667.9667 5.3833l2.75-2.7z"
                      fill="#FBBC05"
                    />
                  </svg>
                  <span className="ml-2">Google</span>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="inline-flex w-full justify-center rounded-md border border-gray-600 bg-gray-700 py-2 px-4 text-sm font-medium text-gray-200 shadow-sm hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Instagram</span>
                  <svg xmlns="www.w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="ml-2 hover:text-black-700">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Toggle Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={toggleMode}
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150 cursor-pointer"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthForm;