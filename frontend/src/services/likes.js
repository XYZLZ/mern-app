import {api_url, headerToken} from './config'

const getLikes = async(setHeart, _id) => {
    try {
        const  res = await fetch(`${api_url}user/likes/${_id}`, {
            headers:{
                'authorization':`Bearer ${headerToken}`,
            },

        });

        const data = await res.json();

        if (data.success) {
            // const likesReduce = data.data.reduce((acc, i) => acc.heart + i.heart);
            let likesAcc = 0;
            data.data.forEach(element => {
                const heart = parseInt(element.heart);
                likesAcc += heart;
            });

            setHeart({counter:likesAcc, state:data.state})
            console.log(data);
            // console.log('reduce', likesReduce);
            return likesAcc;
        }
    } catch (error) {
        console.log(error);
    }
}

const setLikes = async(counter, setHeart, _id) => {
    try {
        const  res = await fetch(`${api_url}user/likes/${_id}`, {
            method:'POST',
            headers:{
                'authorization':`Bearer ${headerToken}`,
                'Content-Type': 'application/json'
            },

            body:JSON.stringify({likes:1})
        })

        const data = await res.json();

        if (data.success) {
            // const likes = data.data.reduce((acc, i) => acc.heart + i.heart);
            // let likesAcc = 0;
            // data.data.forEach(element => {
            //     const heart = parseInt(element.heart);
            //     likesAcc += heart;
            // });

            // console.log(likesAcc);
            const likes = await getLikes(setHeart, _id);

            setHeart({counter:likes, state:data.state});
            console.log(data);
        }
    } catch (error) {
        console.log(error);
    }
}




export {setLikes, getLikes};