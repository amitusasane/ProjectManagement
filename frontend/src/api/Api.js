const axios = require('axios');

const apiPath = process.env.REACT_APP_API_PATH;
const headers = {
  Accept: 'application/json, text/plain,*/*',
  'Content-Type': 'application/json'
};

export const getAllUsers = async () => {
  return axios
    .get(`${apiPath}/user`, { headers: headers })
    .then(resp => resp.data)
    .catch(err => Promise.reject(err));
};
export const addNewUser = async user => {
  return axios
    .post(`${apiPath}/user/add`, user, { headers: headers })
    .then(resp => resp.data)
    .catch(err => Promise.reject(err));
};

export const updateUserById = async user => {
  return axios
    .post(`${apiPath}/user/update/${user.userId}`, user, { headers: headers })
    .then(resp => resp.data)
    .catch(err => Promise.reject(err));
};

export const deleteUserById = async user => {
  return axios
    .get(`${apiPath}/user/delete/${user._id}`, user, { headers: headers })
    .then(resp => resp.data)
    .catch(err => Promise.reject(err));
};
