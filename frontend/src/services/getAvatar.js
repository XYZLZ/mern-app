import {api_url, headerToken} from './config'

const getAvatar = async(setter) => {
        const res = await fetch(`${api_url}user/avatar/id`, {
        headers:{
            'authorization':`Bearer ${headerToken}`,
        }
        })
        const data = await res.json();
        // console.log(data);

        if (data.avatar) {
        setter(data.avatar);
        }
}


export {getAvatar}