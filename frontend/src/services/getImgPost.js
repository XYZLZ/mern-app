import {headerToken, api_url} from './config'


const getImgPost = async(id, setter) => {
    if (!id || id == '') {
        window.location.replace('/home');
    }

    try {
        const res = await fetch(`${api_url}post/this/${id}`, {
            headers:{
                'authorization':`Bearer ${headerToken}`
            }
        });

        const data = await res.json();

        // setter(data.data);
        setter({...data.data,  newDate:()=>{
            const currentDate = new Date(data.data.createdAt);
            const newDate = currentDate.toLocaleDateString('es-MX', {
                year:'numeric',
                month:'long',
                day:'numeric'
            });

            return newDate
        }})
        // console.log(data);
        return data.data
    } catch (error) {
        console.log(error);
    }
}


export {getImgPost}