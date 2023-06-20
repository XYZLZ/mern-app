import {config} from 'dotenv'
import axios from 'axios'
config();

// async function handleResponse(response) {
//     if (response.status === 200 || response.status === 201) {
//       return response.json();
//     }
  
//     const errorMessage = await response.text();
//     throw new Error(errorMessage);
// }

const generateAccessToken = async() => {
    const {PAYPAL_API_CLIENT, PAYPAL_API_SECRET, PAYPAL_API} = process.env;
    const auth = Buffer.from(`${PAYPAL_API_CLIENT}:${PAYPAL_API_SECRET}`).toString('base64');
    const body = "grant_type=client_credentials";

    const {data} = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, body, {
        headers:{
            'Authorization':`Basic ${auth}`
        }
    }) ;

    if(data) {
        return data.access_token;
    }

    throw new Error('No token');
}

const createOrder = async (data) => {
    const accessToken = await generateAccessToken();
    const order = {
        intent:'CAPTURE',
        purchase_units:[
            {
                amount:{
                    currency_code:'USD',
                    value:data.service.price
                },

                description:`${data.service.type} Service of Neutral Art`
            }
        ],

        application_context:{
            landign_page:'NO_PREFERENCE',
            brand_name:'Neutralart.com',
            user_action:'PAY_NOW',
        }
    }

    try {    
        const {data} = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders`, order,  {
            headers:{
                'Authorization': `Bearer ${accessToken}` 
            },
            
        })
    
    
        // console.log(data);

        return data;

        // res.redirect('created?');
    } catch (error) {
        console.log(error);
        // res.status(500).json({message:'Sonthing goes wrong on the server'});
    }

}


const captureOrder = async (orderId) => {
    const accessToken = await generateAccessToken();
    const url = `${process.env.PAYPAL_API}/v2/checkout/orders/${orderId}/capture`;
    try {
        const {data} = await axios.post(url,  {}, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${accessToken}`
            }
        });
    
        return data;
    } catch (error) {
        console.log(error);
    }
}


const cancelOrder = async (req, res) => {}



export {cancelOrder, captureOrder, createOrder}