import {api_url} from './'

const confirmEmail = async(token) => {
    try {
        const req = await fetch(`${api_url}user/verify/${token}`);
        const res = await req.json();
        if (res.success) {
            return true
        }

        return false
    } catch (error) {
        console.log(error);
    }
}

export {confirmEmail};