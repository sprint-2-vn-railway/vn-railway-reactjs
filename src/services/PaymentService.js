import axios from "axios";

export const handlePaymentSuccess = async (userName, responseCode) => {
    const result = await axios.get(`http://localhost:8080/api/payment/pay-success/${userName}?responseCode=${responseCode}`);
    return result
}