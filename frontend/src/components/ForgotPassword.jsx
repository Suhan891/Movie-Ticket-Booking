import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast';

const ForgotPassword = () => {

    const token = useParams()
    if(!token){
        toast.error("Token Not Found")
        return;
    }

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
      })
    const [visible,setVisible] = useState({
        pass: false,
        cPass : false
    })

    const [errors, setErrors] = useState()

      const handleChange = (e)=>{
        const {name,value} = e.target

        const updatedForm = {
            ...formData,
            [name]: value
        }
        setFormData(updatedForm)
        
        if(updatedForm.confirmPassword && updatedForm.password !== updatedForm.confirmPassword){
             setErrors((prev) => ({
                ...prev,
                confirmPassword: "Passwords do not match"
                }));
            } else {
                setErrors((prev) => ({
                ...prev,
                confirmPassword: ""
                }));
        }
      }
      

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(formData.password === formData.confirmPassword){
            toast.error("Both must be of same password")
            return
        }
    }

      return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">


      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-700">
          
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            

            {/* Password Field */}
            <div className="mt-1 relative">
              <label htmlFor="Password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                value={formData.password}
                type={toggleVisible?"password":"text"}
                autoComplete="current-password"
                required
                onClick={()=> setToggleVisible(!toggleVisible)} 
                onChange={handleChange}
                className={`block w-full appearance-none rounded-md border bg-gray-700 px-3 py-2 pr-10 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                }`}
              />

              <Eye
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={()=> setToggleVisible(!toggleVisible)}
              />

              <p className="text-red-500 text-xs mt-1 ml-1 h-4">
                {errors.password || ''}
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="mt-1 relative">
              <label htmlFor="Password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                value={formData.confirmPassword}
                type={toggleVisible?"password":"text"}
                autoComplete="current-password"
                required
                onClick={()=> setToggleVisible(!toggleVisible)} 
                onChange={handleChange}
                className={`block w-full appearance-none rounded-md border bg-gray-700 px-3 py-2 pr-10 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                }`}
              />

              <Eye
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={()=> setToggleVisible(!toggleVisible)}
              />

              <p className="text-red-500 text-xs mt-1 ml-1 h-4">
                {errors.password || ''}
              </p>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
              >
                {}
              </button>
            </div>
          </form>




        </div>
      </div>
    </div>
  );
}

export default ForgotPassword
