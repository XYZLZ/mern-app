import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {preview} from '../assets';
import {SuccessAlert, getRandomPrompt} from '../utils';
import {FormField, Loader} from '../components';
import {api_url, headerToken, memberType} from '../services'

const CreatePost = () => {

  const navigate = useNavigate();

  const getUser = async(e) => {
    try {
        const res = await fetch(`${api_url}user/id`, {
        headers:{
            'authorization':`Bearer ${headerToken}`,
        }
        })
        const data = await res.json();
        const {user} = data.data;
        setForm({name:user});
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
  
  useEffect(()=>{
    if(!headerToken){
      navigate('/login');
    }

    if (memberType == "BASIC" || memberType == null) {
      navigate('/home');
    }

    getUser();
  }, [])
  const [form, setForm] = useState({name:'',photo:'',prompt:'', photoName:'', category:''})
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false)
  const [loadingPrivate, setLoadingPrivate] = useState(false)

  const generateImgge = async() => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const res = await fetch(`${api_url}dalle`, {
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
            'authorization':`Bearer ${headerToken}`
          },
          body:JSON.stringify({prompt:form.prompt})
        })

        const data = await res.json();
        console.log(data);

        setForm({...form, photo:`data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        console.log(error)
        
      } finally {
        setGeneratingImg(false);
      }
    } else {
      SuccessAlert('Warning', 'please enter a prompt', 'warning', 7000)
    }
  }


  const handleSubmit = async(e) => {
      e.preventDefault();
      if (form.prompt && form.photo && form.photoName && (form.category != 'none' || form.category != undefined)) {
        setLoading(true);

        try {
          const res = await fetch(`${api_url}post`, {
            method:'POST',
            headers:{
              'Content-Type': 'application/json',
              'authorization':`Bearer ${headerToken}`
            },
            body:JSON.stringify({...form, isGlobal:true, isWithAI:true})
          })

          await res.json();
          navigate('/home')
        } catch (error) {
          console.log(error);
        } finally{
          setLoading(false);
        }
      } else{
        SuccessAlert('Warning', 'please enter a prompt and upload an image', 'warning', 7000)
      }
  }

  const handlePrivate = async(e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoadingPrivate(true);

      try {
        const res = await fetch(`${api_url}post`, {
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
            'authorization':`Bearer ${headerToken}`
          },
          body:JSON.stringify({...form, isGlobal:false})
        })

        await res.json();
        SuccessAlert('success', 'Post Created', 'success', 3000)
        setTimeout(()=>{
          navigate('/my-post');
        }, 4000)

      } catch (error) {
        console.log(error);
      } finally{
        setLoadingPrivate(false);
      }
    } else{
      SuccessAlert('Warning', 'please enter a prompt and upload an image', 'warning', 7000)
    }
  }


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt:randomPrompt});
  }


  return (
    <>
      {/* <Header/> */}
      <section className='max-w-7xl mx-auto'>
        <div>
        <h1 className='font-extrabold text-[#222328] text-[32px] text-center mt-5'> Create</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w[500px] text-center '>Generate an imaginative image through DALL-E AI and share it with the community</p>
        </div>
        <form method='post' className='mt-16 max-w text-3xl' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <FormField isDisabled LabelName='User Name' type='text' name='name' placeholder='Write your name' value={form.name} handleChange={handleChange}/>
            <FormField  LabelName='Photo Name' type='text' name='photoName' placeholder='Write the name for your image' value={form.photoName} handleChange={handleChange}/>
            <FormField  isMultiple LabelName='Category'  name='category'  value={form.category} handleChange={handleChange}/>
            <FormField LabelName='prompt' type='text' name='prompt' placeholder='Write your prompt' value={form.prompt} handleChange={handleChange} isSurpriseMe handleSurpriseMe={handleSurpriseMe}/>
            <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64  flex items-center justify-center'>
              {form.photo? (
                <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />
              ): (
                <img src={preview} alt="preview" className='w-9/12 object-contain opacity-40' />
              )}

              {generatingImg && (
                <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,.5)] rounded-lg'>
                  <Loader/>
                </div>
              )}
            </div>
          </div>
          <div className='mt-5 flex gap-5'>
            <button className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center' type='button' onClick={generateImgge}>
              {generatingImg ? 'Generating..' : 'Generate'}
            </button>
          </div>

          <div className='mt-10'>
          <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>  
          <button
            type="submit" id='share'
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
          <button
            type="submit" id='privatePost' onClick={handlePrivate}
            className="mt-3 ml-5 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loadingPrivate ? 'Saving...' : 'Save'}
          </button>
          </div>
        </form>
    </section>
    </>
  )
}

export default CreatePost