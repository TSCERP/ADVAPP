import axiosClient from "./axiosClient";

const usersApi = {
    getAllUsers: (dispatch) => {
        const url = `/users`;
        return axiosClient(dispatch).get(url);
    },
    disabledUser: (id, dispatch) => {
        const url = `/users/disable/${id}`;
        return axiosClient(dispatch).patch(url);
    },
    updateUser: (id, data, dispatch) => {
        const url = `/users/update/${id}`;
        return axiosClient(dispatch).patch(url, data);
    },
};

export default usersApi;
