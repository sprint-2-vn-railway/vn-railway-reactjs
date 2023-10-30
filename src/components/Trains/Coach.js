import React, { useState, useEffect } from 'react';
import '../../css/seat.css';
import * as stompjs from 'stompjs';
import SockJS from 'sockjs-client';
import * as appUserService from '../../services/AppUserService';
import * as trainService from '../../services/TrainServices'
import { useNavigate } from 'react-router-dom';


var stompClient = null;
let sock = null;
let tempCoach = null;
let tempTrain = null;

const Coach = ({ onSelected, coach, train, handleSeatLimitFive }) => {
    const navigate = useNavigate();
    const user = appUserService.infoAppUserByJwtToken();
    const [seatList, setSeatList] = useState();
    let typeName;
    switch (coach.typeOfCoachName) {
        case "BED": typeName = "Giường nằm"
            break;
        case "AIR_CHAIR": typeName = "Ghế mềm điều hoà"
            break;
        case "WOODEN_CHAIR": typeName = "Ghế cứng điều hoà"
            break;
    }


    const closeConnect = () => {
        stompClient.disconnect()
    }

    const getAllSeat = async (value) => {

        try {
            const result = await trainService.getAllSeatByCoachIdAndTrip(tempCoach, tempTrain);
            setSeatList(result.data)
            onSelected(user.sub)
        } catch (e) {
            console.log("This err >>> " + e);
        }
    }

    const onChoseSeat = async (value) => {

        if (stompClient && user) {
            let seatPayload = {
                trainId: tempTrain.trainId,
                coachId: tempCoach.coachId,
                firstTripId: tempTrain.firstTripId,
                lastTripId: tempTrain.lastTripId,
                userName: user.sub,
                seatCode: value.seatCode
            };
            stompClient.send("/app/seat", {}, JSON.stringify(seatPayload));

        }
    }

    const handleReceived = (payload) => {
        console.log(payload.body);
        if (payload.body === "limited"+user.sub) {
            handleSeatLimitFive()
        }
        getAllSeat()
    }

    useEffect(() => {
        if(stompClient){
            closeConnect()
        }
        sock = new SockJS('http://localhost:8080/ws');
        stompClient = stompjs.over(sock);

        // tạo kết nối đến máy chủ ws
        stompClient.connect({}, (e) => {
            stompClient.subscribe('/topic/seat', (payload) => handleReceived(payload));
        }, (e) => console.log(e));

        // handle reload page
        // window.addEventListener('beforeunload', async (event) => {
        //     try {
        //         if (event.defaultPrevented) {
        //            await trainService.clearAllTemporary(user.sub);
        //         }
        //         event.preventDefault();
        //         event.returnValue = "";
        //     } catch (e) {
        //         console.log(e);
        //     }
        // });


        return () => stompClient.connect()

    }, [])

    useEffect(() => {
        tempCoach = coach;
        tempTrain = train;

        getAllSeat()
    }, [coach.coachId])

    if (!seatList) return null

    return (
        <div className='container'>
            {/* <h1>{coach.coachId}</h1> */}
            <div className='fw-semibold mx-3 d-flex justify-content-between'>
                <div>Bạn đang chọn toa: {coach.coachCode}</div>
                <div>Loại ghế: {typeName}</div>
                <div>Số tiền  mỗi chỗ:&nbsp;
                    {
                        new Intl.NumberFormat("vi-VN").format(
                            Math.ceil(coach.typeOfCoachPrice *
                                train.totalDistanceLength)
                        )
                    } VNĐ
                </div>
            </div>

            <div className='text-center'>

                <div className='m-3 d-flex justify-content-between '>
                    <div className=' '>
                        <span className='rounded border border-2
                            shadow-lg bg-body-tertiary'>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        &nbsp; Ghế chưa được chọn
                    </div>
                    <div className=' '>
                        <span className='rounded border border-2
                            shadow-lg bg-warning bg-opacity-50'>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        &nbsp; Ghế đã được chọn
                    </div>
                    <div className=' '>
                        <span className='rounded border border-2
                            shadow-lg bg-danger bg-opacity-50'>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        &nbsp; Ghế đã được đặt
                    </div>
                    <div className=' '>
                        <span className='rounded border border-2
                            shadow-lg bg-primary bg-opacity-50'>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        &nbsp; Ghế bạn đã đặt
                    </div>
                </div>
                <div className='row border border-4 border-secondary rounded rounded-5
                            flex-column flex-wrap align-items-start 
                            d-flex justify-content-center align-items-center
            ' style={{ height: '160px' }}>
                    {
                        seatList.map((value, index) => {

                            return <div key={`S_${index}`}
                                id='seat'
                                className={` rounded d-inline col-2 m-1 seat
                            shadow border border-1
                                    ${value.available ? "bg-danger bg-opacity-50" :
                                        !value.userName ? "bg-body-tertiary" :
                                            value.userName === user?.sub ? "bg-primary bg-opacity-25" :
                                                "bg-warning bg-opacity-50"}  `}
                                onClick={() => onChoseSeat(value)}
                                style={{ width: '80px' }}
                            >
                                {value.seatCode}
                            </div>
                        })
                    }

                </div>

            </div>
        </div>
    );
};

export default Coach;