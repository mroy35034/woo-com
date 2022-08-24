import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthUser } from '../../App';
import { useMessage } from '../../Hooks/useMessage';
import { cartCalculate } from '../../Shared/common';
import CartAddress from '../../Shared/CartComponents/CartAddress';
import CartCalculation from '../../Shared/CartComponents/CartCalculation';
import CartHeader from '../../Shared/CartComponents/CartHeader';
import CartItem from '../../Shared/CartComponents/CartItem';
import { useAuthContext } from '../../lib/AuthProvider';


const Purchase = () => {
   const { productId } = useParams();
   const user = useAuthUser();
   const { authRefetch, authLoading, userInfo } = useAuthContext();
   const { msg, setMessage } = useMessage("");
   const navigate = useNavigate();
   const [step, setStep] = useState(false);

   // useEffect(() => {
   //    if (msg !== '') return navigate('/');
   // }, [msg, navigate]);

   const goCheckoutPage = () => {
      if (step) {
         navigate(`/my-cart/checkout-single/${productId}`);
      }
   }

   return (
      <div className='section_default'>
         <div className="container">
            <p><strong className='text-danger'>{msg}</strong></p>
            <div className="row">
               <div className="col-lg-8 mb-3">
                  <CartAddress navigate={navigate} authRefetch={authRefetch} user={user} addr={userInfo && userInfo?.address ? userInfo?.address : []} step={step} setStep={setStep}></CartAddress>
                  <br />
                  <CartItem navigate={navigate} product={userInfo && userInfo?.buy_product} cartTypes={"buy"} authRefetch={authRefetch} authLoading={authLoading} setMessage={setMessage}></CartItem>
               </div>
               <div className="col-lg-4 mb-3">
                  <CartHeader user={user}></CartHeader>
                  <br />
                  <CartCalculation product={cartCalculate([userInfo && userInfo?.buy_product])} />
                  <br />
                  <div className="text-center">
                     {(userInfo?.address && userInfo?.address.length === 0) && <small className="my-2 p-1">Please Insert Your Address</small>}
                     {(userInfo?.address && (userInfo?.address.length > 0) && (step === false)) && <small className="my-2 p-1">Select Your Address</small>}
                     <button className='bt9_checkout' onClick={goCheckoutPage}
                        disabled={step === true ? false : true}>
                        Checkout
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );

};

export default Purchase;