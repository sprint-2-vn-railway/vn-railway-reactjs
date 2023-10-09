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

    const [seatList, setSeatList] = useState()

    const choseTrain = async (value) => {
        try{
            const result = await trainService.getAllCoachByTrainId(value.trainId)
            setCoachList(result.data);
        }catch(e){

        }
    }

    const getCoach = (value) => {
        console.log(value);
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
                setTrainList(result.data)
                setCoachList(undefined)
                setSeatList(undefined)
            } catch (e) {

            }
        }
    }
    
    useEffect(() => {
        getAllStation()
    }, [])

    if (!stationList) return null;

    return (
        <>
            <Header />
            <div className="container-fluid ">
                <div className="text-center mt-3">
                    <h1>Đặt Vé Tàu</h1>
                </div>
                <div className="row mb-5">
                    <div className="col-lg-3 col-md-3 col-sm-12 col-xl-3 shadow-lg p-3 mt-5 bg-body-tertiary rounded my-5">
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
                            <Form>
                                <label htmlFor="fromStation">Ga xuất phát</label><br />
                                <Field as='select' className="form-control" name="fromStation" id="fromStation" >
                                    <option>--Chọn Ga Đi--</option>
                                    {
                                        stationList.map((value, index) => {
                                            return <option key={`S_${index}`} value={`${value}`} >{value}</option>
                                        })
                                    }
                                </Field>
                                <div style={{ height: '20px' }}>
                                    <ErrorMessage component='small' className="text-danger" name='fromStation' />
                                </div>
                                <label htmlFor="toStation">Ga đích</label><br />
                                <Field as="select" className="form-control" name="toStation" id="toStation" >
                                <option>--Chọn Ga Đến--</option>
                                    {
                                        stationList.map((value, index) => {
                                            return <option key={`S_${index}`} value={`${value}`} >{value}</option>
                                        })
                                    }
                                </Field>
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
                    </div>

                    <div className="row col-lg-9 col-md-9 col-sm-12 col-xl-9 shadow-lg p-3 my-5 bg-body-tertiary rounded d-flex justify-content-between">
                        {trainList && trainList.map((value, index) => {

                            return <div key={`TR_${index}`} className="col-sm-12 col-md-6 col-lg-3 col-xl-3"
                                onClick={() => choseTrain(value)}
                            >
                                <Train props={value} />
                            </div>
                        })}
                        <div className="d-flex justify-content-center">
                            {
                                coachList && <TrainDetails props={coachList} onOpenCoach={getCoach} />

                            }
                        </div>
                        <div className="text-center">
                            {
                                seatList && <Coach />
                            }
                        </div>
                    </div>

                </div>
            </div>


            <Footer />
        </>
    );
}

export default Booking;