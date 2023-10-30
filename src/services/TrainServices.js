import axios from "axios";

export const getAllTrain = async (train) => {
    const result = await axios.get
        (`http://localhost:8080/api/booking/get-all-train?fromStation=${train.fromStation}&toStation=${train.toStation}&startDate=${train.startDate}`);
    return result;
}

export const getAllStation = async (train) => {
    const result = await axios.get
        (`http://localhost:8080/api/booking/list-station`);
    return result;
}

export const getAllCoachByTrainId = async (trainId) => {
    const result = await axios.get
        (`http://localhost:8080/api/booking/get-all-coach-by-train-id/${trainId}`);
    return result;
}

export const getAllSeatByCoachIdAndTrip = async (coach, train) => {
    const result = await axios.get
        (`http://localhost:8080/api/booking/get-seat/${coach.coachId}/${train.firstTripId}/${train.lastTripId}`);
    return result;
}

export const clearAllTemporary = async (userName) => {
    const result = await axios.get
    (`http://localhost:8080/api/booking/clear-temporary/${userName}`)
    return result;
}

export const getAllTemporarySeatByUserName = async (userName) => {
    const result = await axios.get
    (`http://localhost:8080/api/seat/get-all-temporary-seat-by-userName/${userName}`)
    return result;
}

export const getAllCurrentTrain = async () => {
    const result = await axios.get
    (`http://localhost:8080/api/train/list`)
    return result;
}