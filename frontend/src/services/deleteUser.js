import {api_url, headerToken, logout} from './'

const deleteUser = async() => {
    try {
        const res = await fetch(`${api_url}user/id`, {
            method:'DELETE',
            headers:{
                'authorization':`Bearer ${headerToken}`
            }
        })

        const data = await res.json();

        if (data.success) {
            return true
        }

        return false;
    } catch (error) {
        console.log(error);
    }
}

export {deleteUser}