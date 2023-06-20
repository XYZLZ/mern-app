import React, {useEffect} from 'react'
import {unconfirmed} from '../assets'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {SuccessAlert} from '../utils'

const ConfirmRegister = ({email}) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userEmail = searchParams.get('userEmail');

    useEffect(()=> {
        if (!userEmail || userEmail == null) {
            SuccessAlert('Register Failed', 'Please create your account', 'error', 5000);
            navigate('/register');
        }
    })
  return (
    <>
        <div className='flex justify-center items-center min-h-screen bg-gray-50'>
            <div className='flex flex-col w-[600px] h-[600px] items-center justify-center bg-white rounded-lg shadow-lg flex-wrap gap-7'>
                <img src={unconfirmed} alt="unconfirmed_mail" className='w-[60%]' />
                <h1 className='text-gray-700 font-bold text-3xl'>Thank you for your registration</h1>
                <p className='text-gray-400 px-10 text-justify'>We have send you a confirmation email to <span className='text-gray-700 font-medium'>{userEmail}</span>. Please confirm your email address to active your account.</p>
                <button type='button' className='landing__btn' onClick={()=> {
                    window.location.replace('/login');
                }}>Go to login</button>
            </div>
        </div>
    </>
  )
}

export default ConfirmRegister