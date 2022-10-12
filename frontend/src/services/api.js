import axios from 'axios'

const sendData = async (data) => {
    //const response = await axios.post('http://localhost:5000/api/model', data)
    const response = await axios.post('api/model', data)
    return response.data
}

export default { sendData }
