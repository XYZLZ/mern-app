import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {api_url, headerToken} from '../services'

const Register = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({user:'', email:'', pass:''});
    const [error, setError] = useState('');

    useEffect(()=>{
        if (headerToken) {
        navigate('/home');
        }
    },[])

        const handleSubmit = async(e) => {
            e.preventDefault();
            try {
            const url = `${api_url}user`
        
            const req = await fetch(url, {
                method:'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body:JSON.stringify(data)
            })
        
            const res = await req.json();
            
            if (res.error) {
                console.log(res.error.message);
                setError(res.error.message);
            }else if(res.message){
                setError(res.message)
            }else{
                console.log(res);
            }
        
            if (res.newUser) {
                navigate(`/confirmR?userEmail=${res.newUser.email}`);
            }
            
            return res
        
            } catch (error) {
            console.log(error.message); 
            }
        }
        
        const handleChange = ({currentTarget:input}) => {
            setData({...data, [input.name]:input.value})
        }


return (
    <div className='w-full h-screen overflow-hidden dark:bg-gray-800'>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <h1 className='text-center text-black font-bold  text-3xl mb-6 dark:text-white'>Register</h1>
        <div className='bg-white py-8 px-6 shadow rounded-lg sm:px-10 dark:bg-gray-700'>
            <form  method="post" className='mb-0 space-y-6' onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="user" className='form__label font-medium'>Username</label>
                    <div className='mt-1'>
                        <input type="text" name='user' value={data.user} className='form__input' onChange={handleChange} required />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className='form__label font-medium'>Email Address</label>
                    <div className='mt-1'>
                        <input type="email" name='email' value={data.email} className='form__input' onChange={handleChange} required />
                    </div>
                </div>

                <div>
                    <label htmlFor="pass" className='form__label font-medium'>Password</label>
                    <div className='mt-1'>
                        <input type="password" value={data.pass} name='pass' className='form__input' onChange={handleChange} required />
                    </div>
                </div>

                <div>
                    <div className='mt-1'>
                        <button type="submit" className='form__btn'>Sign Up</button>
                        {error && (
                            <div className='error_msg font-medium'>{error}</div>
                        )}
                    </div>
                </div>
            </form>
            <p className='text-center mt-6 text-gray-800 dark:text-white'>Already Registered? <Link to={'/login'} className='text-[var(--primary)] hover:opacity-80'>Login</Link></p>
        </div>
    </div>
    </div>
  )
}

export default Register