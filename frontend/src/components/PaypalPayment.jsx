import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {api_url, headerToken, logout} from '../services'
import {useNavigate} from 'react-router-dom'
import {purchaseAlert} from "../utils";

const PaypalPayment = ({typePlan, price}) => {
  const navigate = useNavigate();

  const createOrder = async (data) => {
    // Order is created on the server and the order id is returned
    const response = await fetch(`${api_url}payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'authorization':`Bearer ${headerToken}`
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        service:{
            type:typePlan,
            price:price
        }
      }),
    });
    const order = await response.json();
    console.log('create-order', order);
    return order.id;
  };

  const onApprove = async (data) => {
    // Order is captured on the server and the response is returned to the browser
    const response = await fetch(`${api_url}payment/capture-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'authorization':`Bearer ${headerToken}`
      },
      body: JSON.stringify({
        orderID: data.orderID
      }),
    });

    const payment = await response.json();
    const plan = payment.purchase_units[0].payments.captures[0].amount.value;
    console.log('onApprove', payment);
    console.log('planValue', plan);

    if (parseInt(plan) >= 24 && parseInt(plan) < 35 ) {
      const updateUserPlan = await fetch(`${api_url}user/id`, {
        method:'PUT',
        headers:{
          'Content-Type': 'application/json',
          'authorization':`Bearer ${headerToken}`,
      },
      body:JSON.stringify({
        memberType:'CREATOR'
      })

      })

      const userPlan = await updateUserPlan.json();

      if (userPlan) {
        purchaseAlert('Creator plan').then(async(res)=>{
          if (res.isConfirmed) {
            await logout();
            navigate('/login');
          }
        })
      }
    }

    if (parseInt(plan) >= 35) {
      const updateUserPlan = await fetch(`${api_url}user/id`, {
        method:'PUT',
        headers:{
          'Content-Type': 'application/json',
          'authorization':`Bearer ${headerToken}`,
      },
      body:JSON.stringify({
        memberType:'ENTERPRISE'
      })

      })

      const userPlan = await updateUserPlan.json();

      if (userPlan) {
        purchaseAlert('Enterprice plan').then(async(res)=>{
          if (res.isConfirmed) {
            await logout();
            navigate('/login');
          }
        })
      }
    }
    
    return payment;
  };

  const cancelOrder = async (data) => {
    // console.log(data);
    // navigate('/plans/id');

    const res = await fetch(`${api_url}payment/cancel-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const redirect = await res.json();
    console.log(redirect);

    if (redirect.success) {
      navigate('/home');
    }
  }
  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      onCancel={(data, actions) => cancelOrder(data, actions)}
      style={{color:'blue', shape:'pill'}}
    />
  );
};

export default PaypalPayment;
