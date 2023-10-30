import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import * as trainService from '../../services/TrainServices';
import Header from '../Header';
import Footer from '../Foorter';

const CreateTrip = () => {
    const [trainList, setTrainList] = useState();
    const [stationList, setStationList] = useState();

    const getAllTrain = async () => {
        try {
            const result = await trainService.getAllCurrentTrain();
            setTrainList(result.data);
        } catch (e) {
            console.log(e);
        }
    }
    const getAllDistance = async () => {
        try {
            const result = await trainService.getAllStation();
            setStationList(result.data)
        } catch (e) {
            console.log(e);
        }
    }

    const checkTimeBetweenStartDateAndEndDate = () => {

        return true;
    }

    useEffect(() => {
        getAllTrain();
        getAllDistance();
    }, [])

    if (!stationList || !trainList) return null;

    return (
        <>
            <Header />
            <div className='container mb-5 mt-5'>
                <h1 className='text-center'>Thêm chuyến</h1>
                <div className='w-25 '>
                    <Formik
                        initialValues={{
                            train: "",
                            fromStation: "",
                            toStation: "",
                            startDate: "",
                            endDate: ""
                        }}

                        validationSchema={Yup.object({
                            train: Yup.string()
                                .require("Không để trống tàu")
                                .test("check-train-id", "Không có tàu này", (e) => trainList.some((value) => value.id == e))
                            ,
                            fromStation: Yup.string()
                                .required("Không để trống ga đi")
                                .test('check-exist', "Không tồn tại ga này", (value) => stationList.some((e) => value === e))
                            ,
                            toStation: Yup.string()
                                .required("Không để trống ga đến")
                                .test('check-exist', "Không tồn tại ga này", (value) => stationList.some((e) => value === e))
                            ,
                            startDate: Yup.date()
                                .required("Không để trống ngày đi")
                                .min(new Date(), "Hãy chọn ngày lớn hơn hoặc bằng hiện tại")
                            ,
                            endDate: Yup.date()
                                .required("Không để trống ngày đi")
                                .min(new Date(), "Hãy chọn ngày lớn hơn hoặc bằng hiện tại")
                                .test("check-between-date","Thời gian đến phải lớn hơn thời gian đi 20 tiếng"
                                ,()=>checkTimeBetweenStartDateAndEndDate())
                            ,
                        })}
                        onSubmit={(values, { onSubmitting, setErrors }) => {
                            onSubmitting(false)

                        }}
                    >
                        <Form>
                            <div>
                                <div>
                                    {/* Chosee train */}
                                    <label htmlFor='train'>Chọn tàu</label>
                                    <Field type="text" list="trainList" className="form-control" name="trainId" id="train" />
                                    <datalist id="trainList">
                                        {
                                            trainList.map((value, index) => {
                                                return <option key={`ST_${index}`} defaultValue={JSON.stringify(value)} >{value.name}</option>
                                            })
                                        }
                                    </datalist>
                                    <div style={{ height: '20px' }}>
                                        <ErrorMessage name='train' component='small' className='text-danger' />
                                    </div>
                                </div>

                                <div>
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
                                </div>
                                <div>
                                    {/* Chosee start date  */}
                                    <label htmlFor="startDate">Ngày đi</label><br />
                                    <Field type="date" className="form-control" name="startDate" id="startDate" />
                                    <div style={{ height: '20px' }}>
                                        <ErrorMessage component='small' className="text-danger" name='startDate' />
                                    </div>
                                </div>
                                <div>
                                    {/* Chosee start date  */}
                                    <label htmlFor="endDate">Ngày đến</label><br />
                                    <Field type="date" className="form-control" name="endDate" id="endDate" />
                                    <div style={{ height: '20px' }}>
                                        <ErrorMessage component='small' className="text-danger" name='endDate' />
                                    </div>
                                </div>
                                <button className='btn btn-secondary w-100 mt-3'>Thêm chuyến</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CreateTrip;