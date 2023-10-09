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