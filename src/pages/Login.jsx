import React from 'react'
import { useState } from 'react'
import '../index.css'
import '../app.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [form, setform] = useState({email:"",password:""});
    const [errorMessage, setErrorMessage] = useState('false');
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setform({...form, [e.target.name] : e.target.value})// 

    }
    
    const loginSubmit= async(e)=>{
        e.preventDefault();
        if (form.email.length<3 || form.password.length<5) {
            console.log('lenth must 3');
        }else{
            console.log(form);

            try {
              // Make an axios POST request to the login route
              const response = await axios.post('http://localhost:5000/users/login', {
                email: form.email,
                password:form.password
              });
               console.log(response);
               
              // Assuming your backend returns a JWT token, store it in localStorage
              const token = response.data.accessToken;
              if (token) {
                
                  localStorage.setItem('accessToken', token);
                  // Redirect to the dashboard or any other route after successful login
                  console.log('Login successful!', token);
                  navigate('/'); // Change to the route you want after login

              }
        
              // You can redirect the user to a different page or perform other actions
            } catch (error) {
              // Handle errors like wrong credentials
              console.error('Error logging in', error);
              setErrorMessage('Invalid credentials, please try again');
              console.log(errorMessage);
              
            }
        
        
        }
        
    }
  return (
    <div className='flex justify-center my-[20%] items-center'>
        <div className=' justify-center w-min items-center p-8 flex flex-col border border-1 border-red-100 gap-3 text-xl'>
            login
            <div className='flex  flex-col gap-2'>

            
            <div className='border' >
            <label htmlFor="email"></label>
             <input value={form.email} name='email' onChange={handleChange} placeholder='email' type="text" />
            </div>
            <div className='border'>
            <label htmlFor="password"></label>
             <input onChange={handleChange} name='password' value={form.password} placeholder='password' type="password" />
            </div>
            </div>
        <button className='bg-green-600 border border-1 p-1 px-3 rounded-full' onClick={loginSubmit}>login</button>
        </div>


    </div>
  )
}

export default Login


