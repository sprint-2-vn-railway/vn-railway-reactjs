import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Foorter";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import Train from "./Trains/Train";
import TrainDetails from "./Trains/TrainDetails";
import Coach from "./Trains/Coach";
import * as trainService from '../services/TrainServices';
import Swal from "sweetalert2";
import { parseDate } from "../services/ParseDate";
import * as bookingService from "../services/BookingService";
import * as appUserService from "../services/AppUserService";
import logo_vn_pay from '../img/logo_vn_pay.webp';

const Booking = () => {
    const [stationList, setStationList] = useState();
    const [trainList, setTrainList] = useState();
    const [train, setTrain] = useState();
    const [coach, setCoach] = useState();
    const [coachList, setCoachList] = useState();
    const [seatList, setSeatList] = useState();
    const [listSelected, setListSelected] = useState();
    const user = appUserService.infoAppUserByJwtToken();

    const getAllSeat = async () => {
        try {
            const result = await trainService.getAllSeatByCoachIdAndTrip(coach, train);
            setSeatList(result.data)
        } catch (e) {
            console.log("This err >>> " + e);
        }
    }


    const choseTrain = async (value) => {
        try {
            const result = await trainService.getAllCoachByTrainId(value.trainId)
            setCoachList(result.data);
            setTrain(value)
            setSeatList(undefined)
        } catch (e) {
            console.log(e);
        }
    }

    const choseCoach = (value) => {
        setCoach(value)
    }

    const getAllStation = async () => {
        try {
            const result = await trainService.getAllStation();
            setStationList(result.data);
        } catch (e) {

        }
    }

    const getAllTrainInDate = async (value) => {
        if (value.fromStation == value.toStation) {
            Swal.fire({
                icon: 'error',
                text: 'Không thể chọn trùng ga, hãy chọn lại',
            })
        } else {

            try {
                const result = await trainService.getAllTrain(value)
                if (result.status == 204) {
                    setTrainList([])
                } else {
                    setTrainList(result.data)
                }
                setCoachList(undefined)
                setSeatList(undefined)
            } catch (e) {
                console.log(e);
            }
        }
    }

    const handleSelected = async (userName) => {
        try {
            const result = await trainService.getAllTemporarySeatByUserName(userName)
            setListSelected(result.data)
        } catch (e) {
            console.log(e);
        }
    }

    const handleSeatLimit = () => {
        console.log("handle");
        Swal.fire({
            icon: 'error',
            text: "Bạn chỉ được giữ tối đa 5 ghế!"

        })
    }



    const handlePayment = async () => {

        try {
            const result = await bookingService.redirectToVNPay(user.sub);
            if (result?.data?.url) {
                window.location.href = result.data.url;
            }


        } catch (e) {
            console.log(e);
        }


    }

    useEffect(() => {
        if (coach && train) {
            getAllSeat()
        }

    }, [coach])

    useEffect(() => {
        getAllStation()
    }, [])

    if (!stationList) return null;

    return (
        <>

            <Header />
            <div className="container-fluid bg-body-tertiary" >

                <div className="row ">

                    <div className="row col-lg-9 col-md-9 col-sm-12 col-xl-9  ">
                        <div className=" position-relative">
                            <div className="position-sticky top-0">
                                <h1 className="text-center mt-3 ">Đặt Vé Tàu</h1>
                                {
                                    !trainList ?

                                        <h3 className="text-center">Hãy chọn ga xuất phát, ga đích và ngày xuất phát</h3>

                                        :
                                        trainList.length != 0 ?
                                            <div className="d-flex justify-content-center">
                                                {trainList.map((value, index) => {

                                                    return <div
                                                        key={`TR_${index}`}
                                                        className="col-sm-12 col-md-6 col-lg-3 col-xl-3"
                                                        onClick={() => choseTrain(value)}
                                                    >
                                                        <Train props={value} />
                                                    </div>
                                                })}
                                            </div>
                                            :
                                            <div className="d-flex align-items-center justify-content-center">
                                                <h3>Xin lỗi, không có tàu nào hoạt động trong ngày này, vui lòng chọn ngày khác</h3>
                                            </div>

                                }

                                {
                                    trainList &&
                                    <>
                                        <div className="d-flex justify-content-center mb-5">
                                            {
                                                coachList && <TrainDetails props={coachList} onOpenCoach={choseCoach} />

                                            }
                                        </div>

                                        {
                                            coach &&
                                            <div className="">

                                                {
                                                    seatList &&
                                                    <Coach
                                                        onSelected={handleSelected}
                                                        coach={coach}
                                                        train={train}
                                                        handleSeatLimitFive={handleSeatLimit}
                                                    />
                                                }
                                            </div>
                                        }

                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3  col-md-3 col-sm-12 col-xl-3 position-relative "

                    >
                        <div className="shadow-lg p-3 
                     bg-body-tertiary rounded position-sticky"
                            style={{ top: '2rem' }}>
                            <Formik

                                initialValues={{
                                    fromStation: "",
                                    toStation: "",
                                    startDate: ""
                                }}
                                validationSchema={Yup.object({
                                    fromStation: Yup.string()
                                        .required("Không để trống ga đi"),
                                    toStation: Yup.string()
                                        .required("Không để trống ga đến"),
                                    startDate: Yup.date()
                                        .required("Không để trống ngày đi")
                                })}
                                onSubmit={(value, { setSubmitting }) => {
                                    setSubmitting(false);
                                    getAllTrainInDate(value);
                                }}
                            >
                                <Form >
                                    <h3 className="text-center">Chọn Chuyến Đi</h3>
                                    <label htmlFor="fromStation">Ga xuất phát</label><br />
                                    <Field type="text" list="stationList" className="form-control" name="fromStation" id="fromStation" />
                                    <datalist id="stationList">
                                        {
                                            stationList.map((value, index) => (
                                                <option key={`S_${index}`} value={value} />
                                            ))
                                        }
                                    </datalist>
                                    <div style={{ height: '20px' }}>
                                        <ErrorMessage component='small' className="text-danger" name='fromStation' />
                                    </div>
                                    <label htmlFor="toStation">Ga đích</label><br />
                                    <Field type="text" list="stationList" className="form-control" name="toStation" id="toStation" />
                                    <datalist id="stationList">
                                        {
                                            stationList.map((value, index) => (
                                                <option key={`S_${index}`} value={value} />
                                            ))
                                        }
                                    </datalist>
                                    <div style={{ height: '20px' }}>
                                        <ErrorMessage component='small' className="text-danger" name='toStation' />
                                    </div>
                                    <label htmlFor="startDate">Ngày đi</label><br />
                                    <Field type="date" className="form-control" name="startDate" id="startDate" />
                                    <div style={{ height: '20px' }}>
                                        <ErrorMessage component='small' className="text-danger" name='startDate' />
                                    </div>
                                    <button className="btn btn-dark w-100 mt-2" type="submit">Tìm kiếm</button>
                                </Form>
                            </Formik>
                            <hr />

                            {
                                (listSelected && listSelected.length > 0) ?
                                    <>
                                        <div className="fs-3 text-center ">Các ghế đã chọn</div>
                                        {
                                            listSelected.map((value, index) => {
                                                return (
                                                    <div key={`SD_${index}`} className="text-sm mt-1">
                                                        <div className="d-flex justify-content-between " >
                                                            <div>
                                                                Tàu: {value?.trainCode}
                                                            </div>
                                                            <div>
                                                                Toa: {value?.coachCode}
                                                            </div>
                                                            <div>
                                                                Ghế: {value?.seatCode}
                                                            </div>
                                                        </div >
                                                        <div className="d-flex justify-content-between mt-1 ">
                                                            <div> Ngày Đi: </div>
                                                            <div>{parseDate(value?.startDate)}</div>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                )
                                            })}
                                        <div className="btn btn-warning w-100 mt-1 fw-bolder "
                                            onClick={() => handlePayment()}
                                        >
                                            <img src={logo_vn_pay} 
                                            style={{
                                                width: '15%',
                                                height: '15%'
                                            }}/>
                                            &nbsp;
                                             Thanh toán VN-PAY
                                        </div>
                                    </> : ""
                            }

                        </div>

                    </div>
                </div >
            </div >
            <Footer />
        </>
    );
}

export default Booking;