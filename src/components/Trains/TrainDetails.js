import React from 'react';
import train_coach from '../../img/train-coach.png';
import train_header from '../../img/train-header.png';

const TrainDetails = ({ props, onOpenCoach }) => {

    return (

        <div className='d-flex justify-content-center' style={{ width: '100%' }}>
            {
                props.map((value, index) => {
                    return (
                        <div  key={`TRAIN_${index}`}>
                            <img
                                onClick={() => onOpenCoach(value)}
                                src={train_coach}
                                style={{ width: '100%', height: '30px' }}
                               
                                alt='Toa tàu'
                            />
                            <div className='text-center'>{value.coachCode}</div>
                        </div>
                    )

                })
            }
            
            <img 
            style={{ width: '7%', height: '30px' }}
            src={train_header} 
            />


        </div>
    );
};

export default TrainDetails;