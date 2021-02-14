import axios from 'axios'

const HOST = "https://jsonplaceholder.typicode.com"

export const getSale = (id) => {
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

export const getAllSale = () => {
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

export const createSale = (data) => {
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

export const updateSale = (id,data) => {
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

export const deleteSale = (id) => {
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