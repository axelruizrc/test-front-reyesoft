import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const loginRequest = async (body) => {
  try {
    const response = await axios.post(apiUrl, body);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default loginRequest;
