import axios from 'axios'

const HOST = "https://jsonplaceholder.typicode.com"

export const getPackage = (id) => {
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

export const getAllPackage = () => {
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

export const createPackage = (data) => {
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

export const updatePackage = (id,data) => {
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

export const deletePackage = (id) => {
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