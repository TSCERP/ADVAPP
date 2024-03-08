import axiosClient from "./axiosClient";

const masterDataApi = {
    // login: (email, password) => {
    //     const url = `/login`;
    //     return axiosClient().post(url, {
    //         email,
    //         password,
    //     });
    // },
    // register: (email, password) => {
    //     const url = `/signup`;
    //     return axiosClient().post(url, {
    //         email,
    //         password,
    //     });
    // },
    getAllItem: (dispatch) => {
        const url = `/Items`;
        return axiosClient(dispatch).get(url);
    },
    getAllVendor: (dispatch) => {
        // const url = `/users?pageSize=${pageSize}&page=${page}`;
        const url = `/vendors`;
        return axiosClient(dispatch).get(url);
    },
    getAllCustomer: (dispatch) => {
        // const url = `/users?pageSize=${pageSize}&page=${page}`;
        const url = `/customers`;
        return axiosClient(dispatch).get(url);
    },
};

export default masterDataApi;
