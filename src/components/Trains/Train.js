import React from "react";
import { FiCircle } from 'react-icons/fi';
import { parseDate } from "../../services/ParseDate";

const Train = ({ props }) => {

    return (
        <>
            <div className="border border-dark border-2 rounded rounded-5  
             my-5 mx-2 bg-primary bg-opacity-25 w-75 h-auto">
                <div className="d-flex justify-content-center">
                    <div className="text-center m-1 border 
                    border-dark border-1  rounded rounded-5 w-50 bg-light">
                        <div><strong>{props.trainCode}</strong></div>
                    </div>
                </div>

                <div className="container-fluid border border-dark border-2 
                border-start-0 border-end-0  bg-light pb-3">

                    <div style={{ height: '6.5rem' }}>
                        <div className="text-center fw-bolder">
                            {props.trainName}
                        </div>
                        <div>
                            <div className="">
                                <div className="fw-bold ">Thời gian đi:</div>
                                <small>{parseDate(props.startDate)}</small>

                                <div className="fw-bold">Thời gian đến:</div>
                                <small>{parseDate(props.endDate)}</small>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="d-flex justify-content-around w-100 mt-2 mb-2">
                    <FiCircle fontSize={'30px'} className="bg-warning rounded-circle" />

                    <FiCircle fontSize={'30px'} className="bg-warning rounded-circle" />
                </div>

            </div>
        </>
    )
}

export default Train;