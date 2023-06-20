import React from 'react'
import {Header, PaypalPayment} from '../components'
import {Pricing} from '../partials'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'


const Plans = () => {

    const initialOptions = {
        "client-id": "AXrzil9XOTJH4KFhZTObCEmhwYEwL16t-pAXGuEFuiUgHXUFwUVhArBRu47vf4R6Jw0MlMflT6g2xQtp",
        currency: "USD",
        intent: "capture",
        // "data-client-token": "abc123xyz==",
    };

    return (
        <>
        <PayPalScriptProvider options={initialOptions}>
            
            <Pricing/>
        </PayPalScriptProvider>
        </>
    );
}

export default Plans