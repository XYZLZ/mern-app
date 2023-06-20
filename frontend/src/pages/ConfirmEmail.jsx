import React, {useEffect} from 'react'
import {confirmed} from '../assets'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {confirmEmail} from '../services'
import {SuccessAlert} from '../utils'

const ConfirmEmail = ({email}) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userToken = searchParams.get('emailToken');
    

    useEffect(()=> {
      if (!userToken || userToken == null) {
        navigate('/register');
      }
        (async()=> {
          const isConfirmed = await confirmEmail(userToken);

        if (!isConfirmed) {
          SuccessAlert('not Authorized', 'not authorized, please try again', 'error');
          setTimeout(()=>{
            navigate('/register');
          }, 3000)
        }
        
        })();
    }, []);

  return (
    <>
        <div className='flex justify-center items-center min-h-screen bg-gray-50'>
            <div className='flex flex-col w-[600px] h-[600px] items-center justify-center bg-white rounded-lg shadow-lg flex-wrap gap-7'>
                <img src={confirmed} alt="unconfirmed_mail" className='w-[60%]' />
                <h1 className='text-gray-700 font-bold text-2xl'>You have confirm your email successfuly</h1>
                <p className='text-gray-400 px-10 text-justify'>Click the botton below to login to your account.</p>
                <button type='button' className='landing__btn' onClick={()=> navigate('/login')}>Continue</button>
            </div>
        </div>
    </>
  )
}

export default ConfirmEmail