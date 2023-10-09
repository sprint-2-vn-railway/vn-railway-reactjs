import React, { useState } from 'react';
import Header from './Header';

export default function Seats() {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatCount, setSeatCount] = useState(0);
    const [seatPrice, setSeatPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [screeningDate, setScreeningDate] = useState('');
    const [screeningTime, setScreeningTime] = useState('');
    const [seatDetail, setSeatDetail] = useState(null);
    const rows = [
        ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
        ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
        ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
        ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"],
        ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
        ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"]
    ];
    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        // Cập nhật giá trị của screeningDate
        setScreeningDate(selectedDate);
        // Lấy thông tin chi tiết ghế dựa trên ngày và thời gian đã chọn
        fetchSeatDetail(selectedDate, screeningTime);
    };
    const handleTimeChange = (event) => {
        const selectedTime = event.target.value;
        // Cập nhật giá trị của screeningTime
        setScreeningTime(selectedTime);
        // Lấy thông tin chi tiết ghế dựa trên ngày và thời gian đã chọn
        fetchSeatDetail(screeningDate, selectedTime);
    };
    const fetchSeatDetail = (date, time) => {
        // Thực hiện các yêu cầu API để lấy thông tin chi tiết ghế dựa trên ngày và thời gian đã chọn
        // Khi nhận được dữ liệu, cập nhật giá trị của seatDetail
        // Ví dụ:
        const seatDetailData = {
            // Dữ liệu chi tiết ghế
            // ...
        };
        setSeatDetail(seatDetailData);
    };
    const handleSeatClick = (seatId) => {
        // Xử lý khi người dùng chọn/chọn lại một ghế
        // Cập nhật giá trị của selectedSeats, seatCount, seatPrice và totalPrice
    };
    const showTickets = () => {
        // Xử lý khi người dùng nhấn nút Submit
        // Gửi thông tin vé đến server hoặc thực hiện các xử lý khác
    };
    return (
        <>
            <Header />
            <div className='row'>
                <div className='col-6'>
                    <div className='d-flex justify-content-center'>
                        <div className="screen text-dark text-center fs-5 rounded" style={{ height: '2rem', width: '75%', marginTop: '200px', }}>Screen</div>
                    </div>
                    {rows.map((seats, index) => (
                        <Row key={index} seats={seats} />
                    ))}
                </div>
                <div className='col-6'>
                </div>
            </div>
        </>
    )
}
function Seat(props) {
    return (
        <p className="seat" id={props.seatId}>
            {props.seatId}
        </p>
    );
}
function Row(props) {
    return (
        <div className="row">
            {props.seats.map((seat) => (
                <Seat key={seat} seatId={seat} />
            ))}
        </div>
    );
}