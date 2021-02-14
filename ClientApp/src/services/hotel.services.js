import axios from 'axios'

const HOST = "https://jsonplaceholder.typicode.com"

export const getHotel = (id) => {
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

export const getAllHotel = () => {
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

export const createHotel = (data) => {
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

export const updateHotel = (id,data) => {
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

export const deleteHotel = (id) => {
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