import axios from 'axios'

const baseUrl = '/api/users';

const addUser = async (userPayload) => {
    const res = await axios.post(baseUrl, userPayload);
    return;
}

export default {addUser};
