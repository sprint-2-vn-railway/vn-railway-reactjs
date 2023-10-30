import React, { useEffect, useState } from 'react';
import * as appUserService from '../../services/AppUserService';
import * as paymentService from '../../services/PaymentService';
import Header from '../Header';
import Footer from '../Foorter';
import * as parseDate from '../../services/ParseDate';
import { MoonLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';


const LoadingSpinner = ({ loading }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.7)', /* Màu nền có độ trong suốt */
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '999'
        }}>
             <MoonLoader color={'#FFFFFF'} loading={loading} size={150} />
        </div>
    );
};

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const user = appUserService.infoAppUserByJwtToken()
    const [ticketList, setTicketList] = useState();

    const handleUrl = async () => {
      
        try {
            const currentUrlParam = new URLSearchParams(window.location.search)
            const responseCode = currentUrlParam.get("vnp_ResponseCode")
            const result = await paymentService.handlePaymentSuccess(user.sub, responseCode)
            setTicketList(result.data)
        } catch (e) {
            navigate("/booking");
            console.log(e);
        }
    }

    useEffect(() => {
        handleUrl()
    }, [])

    

    return (
        <>
        <title>Vé của bạn</title>
            <Header />
            <div className='container my-5' >
                <h1 className='text-center '>Vé Bạn Đã Mua</h1>
                <div className='mt-5 mb-5 '>
                    {
                        ticketList ? ticketList.length > 0 ?
                            ticketList.map((value, key) => {
                                return (

                                    <div key={`TK_${key}`} className='my-3'
                                        style={{ display: 'flex', border: '4px solid #8B8B00', borderRadius: '15px', alignItems: 'center', width: '80%', height: '80%', backgroundColor: 'azure' }}>
                                        <div style={{ display: 'flex', borderRight: '2px dashed black', justifyContent: 'center', padding: '1rem' }}>
                                            <img style={{ objectFit: 'cover', height: 150, width: 'auto' }} src={value.base64StringQRCode} />
                                        </div>
                                        <div
                                            style={{ justifyContent: 'center', padding: '1rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <img src="https://vantaiduongsat.net/wp-content/uploads/2021/06/logodsvn.png" style={{ width: '5%', height: '5%', marginRight: 5 }} />
                                                <h2 style={{ textAlign: 'center' }}>
                                                    Công Ty Cổ Phần Đường Sắt Việt Nam VN-Railway
                                                </h2>
                                            </div>
                                            <div style={{ marginTop: '0.7rem', display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    <div><strong>Mã tàu</strong>: {value.TrainCode}</div>
                                                    <div><strong>Tên tàu</strong>: {value.TrainName}</div>
                                                    <div><strong>Mã toa</strong>: {value.CoachCode}</div>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    <div><strong>Mã ghế</strong>: {value.seatCode}1</div>
                                                    <div><strong>Loại ghế</strong>: Ghế mềm điều hoà</div>
                                                    <div><strong>Giá</strong>: {value.price}</div>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    <div><strong>Điểm đi</strong>: {value.fromStation}</div>
                                                    <div><strong>Điểm đến</strong>: {value.toStation}</div>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    <div><strong>Ngày đi</strong>: {parseDate.parseDate(value.startDate)}</div>
                                                    <div><strong>Ngày đến</strong>: {parseDate.parseDate(value.endDate)}</div>
                                                    <div><strong>Tên</strong>: {value.customerName}</div>
                                                </div>
                                            </div>
                                            <div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            "Không có vé"
                            : <LoadingSpinner loading={true} />
                    }
                </div>
            </div>
            <Footer />
            
        </>
    );
};

export default PaymentSuccess;