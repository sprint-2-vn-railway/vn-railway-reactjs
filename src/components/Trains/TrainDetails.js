import React from 'react';
import train_coach from '../../img/train-coach.png';
import train_header from '../../img/train-header.png';
const TrainDetails = ({ props, onOpenCoach }) => {
    return (
        <div >
            <div className='d-flex justify-content-start ' style={{ width: '20%', height: '40%' }}>
                {
                    props.map((value, index) => {
                        return (
                            <img
                                onClick={() => onOpenCoach(value)}
                                src={train_coach}
                                style={{ width: '100%', height: '100%' }}
                                key={`TRAIN_${index}`}
                                alt='Toa tàu'
                            />
                        )

                    })
                }

                <img src={train_header} style={{ width: '100%', height: '100%' }} />
            </div>
            <div >

            </div>

        </div>
    );
};

export default TrainDetails;