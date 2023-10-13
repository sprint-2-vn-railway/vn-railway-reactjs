import React from 'react';

const Coach = ({ props, onChoseSeat }) => {

    return (
        <div>
            <div className='row border border-4 border-dark rounded 
                            flex-column flex-wrap align-items-start d-flex justify-content-center align-items-center
            ' style={{ height: '160px' }}>
                {
                    props.map((value, index) => {
                        return <small key={`S_${index}`}
                            className={`border border-1 border-dark rounded d-inline col-2 m-1
                                    ${value.available ? "bg-danger" : ""}  `}
                            onClick={() => onChoseSeat(value)}
                            style={{ width: '80px' }}
                        >
                            {value.seatCode}
                        </small>
                    })
                }

            </div>


        </div>
    );
};

export default Coach;