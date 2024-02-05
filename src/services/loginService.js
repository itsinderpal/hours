import axios from 'axios'

const baseUrl = '/api/login';

const login = async (loginPayload) => {
    const res = await axios.post(baseUrl, loginPayload)
    return res.data;
}

export default {login};
