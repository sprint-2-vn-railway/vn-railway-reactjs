import React, { useEffect } from 'react';
import * as appUserService from '../../services/AppUserService';
import * as paymentService from '../../services/PaymentService';
import Header from '../Header';
import Footer from '../Foorter';

const PaymentSuccess = () => {
    const user = appUserService.infoAppUserByJwtToken()

    const handleUrl = async () => {
        try {
            const currentUrlParam = new URLSearchParams(window.location.search)
            const responseCode = currentUrlParam.get("vnp_ResponseCode")
            const result = await paymentService.handlePaymentSuccess(user.sub, responseCode)
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        handleUrl()
    }, [])
    return (
        <>
            <Header />
            <div className='container'>
                <h1 className='text-center'>Vé Bạn Đã Mua</h1>
                <div>
                    
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PaymentSuccess;