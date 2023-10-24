import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import * as trainService from '../../services/TrainServices';

const CreateTrip = () => {
    const [train, setTrain] = useState();
    const [distance, setDistance] = useState();

    return (
        <div className='container'>
            <h1>Thêm chuyến</h1>
            <Formik
                initialValues={{

                }}
                validationSchema={Yup.object({

                })}
                onSubmit={(values, { onSubmitting, setErrors }) => {
                    onSubmitting(false)

                }}
            >
                <Form>
                    <div>
                        {/* Chosee train */}
                        <label htmlFor='train'>Chọn tàu</label>
                        <Field as='select' name='train' id='train' >
                            {/* {
                                train.map((value, index) => {
                                    return <option key={`ST_${index}`}>{value.trainName}</option>
                                })
                            } */}
                        </Field>
                        <div style={{ height: '15px' }}>
                            <ErrorMessage name='train' component='small' className='text-danger' />
                        </div>
                    </div>

                    <div>
                        {/* Chosee distance */}
                        <label htmlFor='train'>Chọn quảng đường</label>
                        <Field as='select' name='distance' id='distance' >
                            {/* {
                                distance.map((value, index) => {
                                    return <option key={`SD_${index}`}>{value.distanceName}</option>
                                })
                            } */}
                        </Field>
                        <div style={{ height: '15px' }}>
                            <ErrorMessage name='distance' component='small' className='text-danger' />
                        </div>
                    </div>
                    <div>
                        {/* Chosee start date  */}
                        <label htmlFor='startDate'>Thời gian khởi hành</label>
                        <Field type="datetime" name='startDate' id='startDate' />
                        <div style={{ height: '15px' }}>
                            <ErrorMessage name='startDate' component='small' className='text-danger' />
                        </div>
                    </div>
                    <button className='btn btn-outline-secondary'>Thêm chuyến</button>
                </Form>
            </Formik>
        </div>
    );
};

export default CreateTrip;