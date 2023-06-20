import React, { useEffect, useState } from 'react'
import {Header, Search, Loader, RenderCards, RenderConments, ConmentForm} from '../components/';
import {useParams, useNavigate} from 'react-router-dom'
import {Testimonial, Copy, Done, Heart, HeartColor} from '../images'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { downloadImage } from '../utils';
import { download } from '../assets';
import {getImgPost, getConments,  setLikes, getLikes, headerToken, userId, api_url} from '../services'


const imageInfo = () => {
    const {id} = useParams();
    const [data, setData] = useState({name:'', photo:'', prompt:'', photoName:'', category:'', newDate:()=>{}});
    const [loading, setLoading] = useState(false);
    const [allPost, setAllPost] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [searchTimeOut, setSearchTimeOut] = useState(null);
    const [conments, setConments] = useState(null);
    const [copy, setCopy] = useState(false);
    const [heart, setHeart] = useState({state:false, counter:0});
    const [affectedConment, setAffectedConment] = useState({type:'', _id:''});
    const navigate = useNavigate();

    const handleNewConment = async(e) => {
        e.preventDefault();
        const {text} = e.target
        const sendText = text.value;
        // const newCon = await newConment(sendText, id);


        const res = await fetch(`${api_url}conment`, {
            method:'POST',
            headers:{
                'authorization':`Bearer ${headerToken}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({text:sendText, postId:id})
        })

        const data = await res.json();

        // console.log(data);

        if (data.success) {
            getConments(setConments, id);
            text.value = ''
        }
    }


    const fetchPosts = async()=> {
            setLoading(true);
            const post = await getImgPost(id, setData);
            try {
                const res = await fetch(`${api_url}post/categoryshow/${post.category}`,{
                    method:'GET',
                    headers:{
                        'authorization':`Bearer ${headerToken}`
                    }
                });

                if (res.ok) {
                    const result = await res.json();
                    setAllPost(result.data.reverse());
                    
                }
            } catch (error) {
                
                console.log(error);
            } finally {
                setLoading(false);
            }

        }



    useEffect(()=>{
        (async()=>{
            if (!headerToken) {
                window.location.replace('/login'); 
                
            }
            const {isGlobal, owner} = await getImgPost(id, setData);
    
            if (isGlobal === false && owner._id != userId) {
                navigate('/home');
            }
            await fetchPosts();
            await getConments(setConments, id);
            await getLikes(setHeart, id);
        })();
    }, [id])
    return (
        <>
        
        <Header/>
        <section className='max-w  mx-auto px-4 py-8'>

            <div className=' p-2 mt-16 flex overflow-hidden flex-col lg:flex-row mx-10 md:mx-20 lg:mx-40 rounded-md items-center justify-between bg-white  shadow-lg'>
                <div>
                <img src={data.photo} alt={data.photoName} className=' lg:w-[700px] lg:h-[700px] object-cover max-w-[800px] h-full mb-7 lg:mb-0 rounded-md rounded-r-[0px]'/>
                </div>
                

                <div className=' max-w-[800px] lg:w-[700px] lg:h-[700px]  mx-auto flex flex-col xs:overflow-y-scroll overflow-x-hidden'>

                <div className='top flex flex-row justify-between mx-4 font-semibold p-4'>
                    <div className='text-white text-sm overflow-y-auto rounded-md bg-indigo-500 inline px-4 py-2'>{data.category}</div>
                    <div>{ data.newDate()}</div>
                </div>

                <div className='text-center p-4'>
                <h2 className='text-black text-2xl lg:text-4xl'>Title</h2>
                <p className='text-gray-700 text-xl lg:text-2xl font-semibold'>{data.photoName}</p>
                </div>

                <div className='mt-28 flex flex-col flex-wrap lg:mt-40 p-4'>
                    <h3 className='text-black text-2xl lg:text-4xl text-center'>Description</h3>
                    <p className='text-gray-700 text-xl lg:text-2xl text-center mx-auto'>{data.prompt}</p>
                </div>

                <div>

                </div>

                    {/*  Owner of post */}
                    
                <div className='flex flex-col md:flex-row items-center justify-center md:justify-start gap-10 mt-44 lg:mt-48 ml-3 '>
                    <div id='owner' className='flex gap-4 justify-center items-center'>
                        {data.owner ? (
                        <img src={data.owner?.avatar} alt="woman" className='rounded-full w-20 h-20 '/>
                    ): (
                        <img src={Testimonial} alt="woman" className='rounded-full w-20 h-20 '/>
                    )}
                    <div className='flex flex-col gap-1'>
                    <p className='text-black font-bold'>Creator</p>
                    <span className='font-medium'>{data.name}</span>

                    </div>
                    </div>

            <div className='flex  gap-5 ml-24'>
            <button type="button" onClick={() => downloadImage(data._id, data.photo)} className="outline-none bg-transparent border-none">
            <img src={download} alt="download" className="w-6 h-6 object-contain " />
            </button>
            <CopyToClipboard text={data.photo} >
            <button type="button" onClick={() => {
                setCopy(true);
                setTimeout(()=>{setCopy(false)}, 1000)
            }} className="outline-none bg-transparent border-none">
            {copy ? (
                <img src={Done} alt="copy" className="w-6 h-6 object-contain " />
                
                ): (
                <img src={Copy} alt="copy" className="w-6 h-6 object-contain " />

            )}
            </button>
            </CopyToClipboard>
            <button type="button" onClick={() => {
                setHeart({state:!heart.state, counter: !heart.state ? heart.counter + 1 : heart.counter - 1})
                setLikes(heart.counter, setHeart, id);
            }} className="outline-none bg-transparent border-none">
            {heart.state ? (
                <div className='relative'>
                    <img src={HeartColor} alt="copy" className="w-6 h-6 object-contain relative " />
                    <span className='absolute top-7 left-0 bottom-0 right-0 text-xs '>{heart.counter}</span>
                </div>
                
                ): (
                <div className='relative'>
                    <img src={Heart} alt="copy" className="w-6 h-6 object-contain " />
                    <span className='absolute top-7 left-0 bottom-0 right-0 text-xs'>{heart.counter}</span>
                </div>

            )}
            </button>
        </div>
                </div>
                <hr className='mt-1'/>

                        {/* Conment Section */}
                <div className='mt-10 flex items-center flex-col gap-8 px-8 '>
                    <ConmentForm handleSubmit={handleNewConment} formCancel={{state:false}} placeholder={'Leave your comment here'}/>

                    <p className='text-center text-xl text-gray-700 font-bold'>All conments</p>

                    <RenderConments setConments={setConments} postId={id} data={conments}  title={'Not conments'} setAffectedConment={setAffectedConment} affectedConment={affectedConment} />
                </div>


                </div>


            </div>


            <div className='mt-16'>
                <div>
                <h1 className='font-extrabold text-[#222328] text-[32px] text-center'> You may also like</h1>
                </div>

                <div className="mt-16">
                <Search allPost={allPost} searchText={searchText} setSearchText={setSearchText} searchResults={searchResults} setSearchResults={setSearchResults} searchTimeOut={searchTimeOut} setSearchTimeOut={setSearchTimeOut}/>
            </div>

            <div className='mt-10'>
                {loading ? (
                    <div className='flex justify-center'>
                        <Loader/>
                    </div>
                ): <>
                    {searchText && (
                        <h2 className='font-medium text-[#666e75] text-xl mb-3'>Showing results for <span className='text-[#222328]'>{searchText}</span></h2>
                    )}
                    <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-3'>
                        {searchText ? (
                            <RenderCards data={searchResults} title="No serch Results found"/>
                        ): (
                            <RenderCards data={allPost} title="No post found"/>
                        )}
                    </div>
                </>}
            </div>
            </div>

        </section>

        </>
    )
}

export default imageInfo