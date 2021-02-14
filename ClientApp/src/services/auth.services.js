import axios from 'axios'

const HOST = "https://jsonplaceholder.typicode.com"
export const getProfile = () => {

    return axios
        .get(
            HOST + "/users/1",

            // {
            //   headers: {
            //     Authorization: `Bearer ${localStorage.usertoken}`,
            //   },
            // }
        )
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
            localStorage.removeItem("usertoken");
            localStorage.removeItem("userName");
            localStorage.removeItem("userRole");
            setTimeout(() => {
                window.location.replace(window.location.origin);
            }, 1000);
        });
};

export const register = (newUser) => {
    return axios
        .post(HOST + "/users", newUser)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const login = (user) => {

    console.log('Accessing', user)

    return axios
        .get(HOST + "/users/1")
        .then((response) => {
            localStorage.setItem("usertoken", response.data.phone);
            localStorage.setItem("userName", response.data.name)
            localStorage.setItem("userRole", response.data.email)
            
            return response;
        })
        .catch((err) => {
            console.log(err);
        });
};


export const logout = () => {

    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");

    return axios
      .get(HOST + "/users/1", {
        headers: {
          Authorization: `Bearer ${localStorage.usertoken}`,
        },
      })
      .then((response) => {

        localStorage.removeItem("usertoken");

        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  };