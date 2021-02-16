import axios from 'axios'

const HOST = "api/"

export const getOneToMany = (id,path) => {
    return axios
        .get(HOST + path+"/" + id, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getAll = (path) => {
    return axios
        .get(HOST + path+"/", {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const createItem = (data,path) => {
    return axios
        .post(HOST + path+"/", data, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const updateItem = (id,data,path) => {
    return axios
        .put(HOST + path+"/"+id, data, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deleteItem = (id,path) => {
    return axios
        .delete(HOST + path+"/" + id, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
};