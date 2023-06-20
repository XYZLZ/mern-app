import {api_url, headerToken} from './config'

const logout = async()=> {
    try {
        const req = await fetch(`${api_url}user/logout`, {
            method:'POST',
            headers:{
                'authorization':`Bearer ${headerToken}`,
            }
        });
        // const res = await req.json();

        if (req.status == 200){
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('memberType');
            // window.location.replace('http://localhost:5173');
        }
    } catch (error) {
        console.log(error);
    }
}

export {logout}