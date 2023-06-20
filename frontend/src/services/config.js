const api_url = '';
const headerToken = sessionStorage.getItem('token');
const userEmail = sessionStorage.getItem('userEmail');
const memberType = sessionStorage.getItem('memberType'); 
const user = sessionStorage.getItem('user');
const userId = sessionStorage.getItem('userId');

export {api_url, headerToken, userEmail, memberType, user, userId};
