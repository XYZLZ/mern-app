import {api_url, headerToken} from './config'

const getCategories = async (set) => {
    try {
        const res = await fetch(`${api_url}category`, {
            headers:{
                'authorization':`Bearer ${headerToken}`
            }
        })

        const data = await res.json();

        if (data.success) {
            set(data.data);
        }
    } catch (error) {
        console.log(error);
    }
}

export {getCategories};