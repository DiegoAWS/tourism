import axios from 'axios'

const HOST = "https://jsonplaceholder.typicode.com"

export const getTransfer = (id) => {
    return axios
        .get(HOST + "/posts/" + id, {
            headers: {
                Authorization: `Bearer ${localStorage.usertoken}`,
            },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getAllTransfer = () => {
    return axios
        .get(HOST + "/posts", {
            headers: {
                Authorization: `Bearer ${localStorage.usertoken}`,
            }
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const createTransfer = (data) => {
    return axios
        .post(HOST + "/posts", data, {
            headers: {
                Authorization: `Bearer ${localStorage.usertoken}`,
            }
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const updateTransfer = (id,data) => {
    return axios
        .put(HOST + "/posts/"+id, data, {
            headers: {
                Authorization: `Bearer ${localStorage.usertoken}`,
            }
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deleteTransfer = (id) => {
    return axios
        .delete(HOST + "/posts/" + id, {
            headers: {
                Authorization: `Bearer ${localStorage.usertoken}`,
            },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
};