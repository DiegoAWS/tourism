import axios from "axios";

const HOST = "api/users/";
export const getProfile = () => {
  return axios
    .get(
      HOST + "current",

      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      logout();
    });
};

export const register = (newUser) => {
  return axios
    .post(HOST + "", newUser)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login = (user) => {
  return axios
    .post(HOST + "authenticate", user)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);

      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logout = () => {
//   localStorage.removeItem("username");
//   localStorage.removeItem("role");
//   localStorage.removeItem("token");
//   setTimeout(() => {
//     window.location.replace(window.location.origin);
//   }, 1000);
};
