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

const Booking = () => {
    const [stationList, setStationList] = useState();
    const [trainList, setTrainList] = useState();
    const [coachList, setCoachList] = useState();
    const [seatList, setSeatList] = useState();
    const [train, setTrain] = useState();
    const [coach, setCoach] = useState();
    const [listSelected, setListSelected] = useState([]);
    const choseTrain = async (value) => {
        try {
            const result = await trainService.getAllCoachByTrainId(value.trainId)
            setCoachList(result.data);
            setTrain(value)
        } catch (e) {

        }
    }
    const choseCoach = async (value) => {
        setCoach(value)
        try {
            const result = await trainService.getAllSeatByCoachIdAndTrip(value, train);
            setSeatList(result.data)
        } catch (e) {

        }
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

            }
        }
    }

    const choseSeat = async (value) => {
        addSeatSelectedDetailsToList(value)
    }

    const addSeatSelectedDetailsToList = (value) => {
        const seatSelectedDetail =
        {
            selectedTrain: train,
            selectedCoach: coach,
            selectedSeat: value,
        }

        // const checkInclude = listSelected.some((element) =>
        //     element?.selectedSeat?.seatCode === seatSelectedDetail?.selectedSeat?.seatCode);
        // if (checkInclude) {
        //     setListSelected((prev) => prev.filter((item) =>
        //         item?.selectedSeat?.seatCode !== seatSelectedDetail?.selectedSeat?.seatCode));
        // } else {
            setListSelected((prev) => [...prev, seatSelectedDetail]);
        // }
    }

    useEffect(() => {
        getAllStation()
    }, [])

    if (!stationList) return null;
    console.log(listSelected);
    return (
        <>

            <Header />
            <div className="container-fluid bg-body-tertiary" >

                <div className="row ">


                    <div className="row col-lg-9 col-md-9 col-sm-12 col-xl-9 ">
                        <div>
                            <h1 className="text-center mt-3">Đặt Vé Tàu</h1>
                            {
                                !trainList ?

                                    <h3 className="text-center">Hãy chọn ga xuất phát, ga đích và ngày xuất phát</h3>

                                    :
                                    trainList.length != 0 ?
                                        <div className="d-flex justify-content-center">
                                            {trainList.map((value, index) => {

                                                return <div key={`TR_${index}`} className="col-sm-12 col-md-6 col-lg-3 col-xl-3"
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
                                    <div className="d-flex justify-content-center">
                                        {
                                            coachList && <TrainDetails props={coachList} onOpenCoach={choseCoach} />

                                        }
                                    </div>
                                    <div className="text-center">
                                        {
                                            seatList && <Coach props={seatList}
                                                onChoseSeat={choseSeat}
                                            />
                                        }
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 col-xl-3 position-relative "

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
                                listSelected.length > 0 ?
                                    <>
                                        {
                                            listSelected.map((value, index) => {
                                                return (
                                                    <div key={`SD_${index}`}>
                                                        <div div className="d-flex justify-content-between" >
                                                            <div>
                                                                <div>
                                                                    Tàu: {value.selectedTrain.trainCode}
                                                                </div>
                                                                <div>
                                                                    Toa: {value.selectedCoach.coachCode}
                                                                </div>

                                                                <div>
                                                                    Ghế đã chọn: {value?.selectedSeat?.seatCode}
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>

                                                )
                                            })}
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