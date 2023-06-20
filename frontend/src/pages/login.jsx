import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import {api_url} from '../services'

const login = () => {
    const [data, setData] = useState({email:'', pass:''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        if (sessionStorage.getItem('token')) {
        navigate('/home');
        }
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
        const url = `${api_url}user/login`

        const req = await fetch(url, {
            method:'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })

        const res = await req.json();

        if (res.status == 500) {
            setError('Incorrect Email or password');
        }
        if (res.error) {
            // console.log(res.error.message);
            setError(res.error.message);
            return false;
        }else if(res.message){
            console.log(res);
            setError(res.message)
            return false;
        }else{
            console.log(res);
        }
        // console.log(res);
        
        if (res.token) {
            sessionStorage.setItem('token', res.token);
            sessionStorage.setItem('userId', res.user._id);
            sessionStorage.setItem('user', res.user.user);
            sessionStorage.setItem('userEmail', res.user.email);
            sessionStorage.setItem('memberType', res.user.memberType);
            // navigate('/home');
            window.location.replace('/home');
        }

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
        <h1 className='text-center text-black font-bold  text-3xl mb-6 dark:text-white'>Login</h1>
        <div className='bg-white py-8 px-6 shadow rounded-lg sm:px-10 dark:bg-gray-700'>
            <form  method="post" className='mb-0 space-y-6' onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="email" className='form__label font-medium'>Email Address</label>
                    <div className='mt-1'>
                        <input type="email" value={data.email} name='email' className='form__input' onChange={handleChange} required />
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
                        <button type="submit" className='form__btn'>Sign In</button>
                        {error && (
                            <div className='error_msg font-medium'>{error}</div>
                        )}
                    </div>
                    <p className='text-center text-gray-800 mt-6 dark:text-white'>You don't have account? <Link to={'/register'} className='text-[var(--primary)] hover:opacity-80'>Register</Link></p>
                </div>
            </form>
        </div>
    </div>
        </div>
    )
}

export default login