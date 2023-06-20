import {api_url, headerToken} from '../services/config'

const fetchPosts = async(setLoading, setAllPost)=> {
    setLoading(true);

    try {
        const res = await fetch(`${api_url}post`,{
            method:'GET',
            headers:{
                'authorization':`Bearer ${headerToken}`
            }
        });

        if (res.ok) {
            const result = await res.json();
            console.log(result);
            setAllPost(result.data.reverse());
        }
    } catch (error) {
        
        console.log(error);
    } finally {
        setLoading(false);
    }

}

const fetchPostsPrivate = async(setLoading, setAllPost)=> {
    setLoading(true);

    try {
        const res = await fetch(`${api_url}post/mypost`,{
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

export {fetchPosts, fetchPostsPrivate}