import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import {Header} from '../components';
import {convertBase64, areYouSureAlert, SuccessAlert, inputAlert} from '../utils'
import {api_url, deleteUser, headerToken, userEmail} from '../services'

const Profile = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({user:'', email:'', pass:'', avatar:''});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const getUser = async(e) => {
        try {
            const res = await fetch(`${api_url}user/id`, {
            headers:{
                'authorization':`Bearer ${headerToken}`,
            }
            })
            const data = await res.json();
            const {user, email, pass, avatar} = data.data;
            setData({user, email, pass, avatar});
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if (!headerToken) {
        navigate('/login');
        }

        getUser();

    }, [])

        const handleSubmit = async(e) => {
            e.preventDefault();
            try {
            const url = `${api_url}user/id`
        
            const req = await fetch(url, {
                method:'PUT',
                headers: {
                'Content-Type': 'application/json',
                'authorization':`Bearer ${headerToken}`,
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
        
            if (res.success) {
                setSuccess(res.success);
            }
            
            return res
        
            } catch (error) {
            console.log(error.message); 
            }
        }

        const handleDelete = async(e) => {
            e.preventDefault();
            areYouSureAlert('usuario').then(async(res) => {
                if (res.isConfirmed) {
                    inputAlert('authorization', 'please write your email to delete your account', 'email', 'Delete Account' )
                    .then(async(res) => {
                            if (res.isConfirmed) {
                                const email = res.value || null;
                                if (email != null) {
                                    if (email === userEmail) {
                                        await deleteUser();
                                        sessionStorage.removeItem('token');
                                        sessionStorage.removeItem('userId');
                                        sessionStorage.removeItem('user');
                                        sessionStorage.removeItem('userEmail');
                                        sessionStorage.removeItem('memberType');
                                        // navigate('/');
                                        location.reload();
                                    }else{
                                        SuccessAlert('Delete User', 'unauthorized email', 'warning');
                                    }
                                }else{
                                    SuccessAlert('Delete User', 'unauthorized email', 'warning');
                                }
                            }
                    })
                }
            })
            
        }
        
        const handleChange = ({currentTarget:input}) => {
            setData({...data, [input.name]:input.value})
        }

        const handleConvert = async(e) => {
            const fileTarget = e.target.files[0];
            if (fileTarget.size > 1048576) {
                e.target.value = '';
                SuccessAlert("Wrong size", 'the maximum size is 1MB', 'warning', 5000);
                return false
            }else if(fileTarget.type == 'image/jpeg' || fileTarget.type == 'image/png' || fileTarget.type == 'image/jpeg') {
                const base64 = await convertBase64(e.target.files[0]);
                setData({...data, avatar:base64})
            }else{
                SuccessAlert('Wrong file', 'this type of file is not allowed. Only jpg/jpeg/png files', 'warning', 5000)
                e.target.value = '';
                return false
            }
            // console.log(base64);
        
        }


return (
    <>
    <Header/>
        <div className='mt-0 sm:mx-auto sm:w-full sm:max-w-md'>
        <h1 className='text-center text-black font-bold  text-3xl mb-6'>Profile</h1>
        <div className='bg-white py-8 px-6 shadow rounded-lg sm:px-10 mt-20'>
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
                    <label htmlFor="pass" className='form__label font-medium'>Avatar</label>
                    <div className='mt-1'>
                        <input type="file"  className='form__input' onChange={handleConvert} accept='.jpg, .png, .jpeg'  />
                    </div>
                </div>

                <div>
                    <div className='mt-1'>
                        <button type="submit" className='form__btn'>Update</button>

                    </div>
                    <div className='mt-1'>
                        <button type="button" className='form__btn-danger' onClick={handleDelete}>Delete User</button>
                        {error && (
                            <div className='error_msg font-medium'>{error}
                                {setTimeout(() => {
                                    setError('');
                                }, 4000)}
                            </div>
                        )}

                        {success && (
                            <div className='success_msg font-medium'>{success}
                                {setTimeout(() => {
                                    setSuccess('');
                                }, 4000)}
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Profile