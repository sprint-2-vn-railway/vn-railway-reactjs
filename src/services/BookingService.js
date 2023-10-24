import axios from "axios";

export const redirectToVNPay = async (userName) => {
    const result = await axios.get
    (`http://localhost:8080/api/payment/vn-pay/create/${userName}`)
    return result;
}