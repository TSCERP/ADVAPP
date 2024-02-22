import axiosClient from "./axiosClient";

const usersApi = {
  login: (email, password) => {
      const url = `/login`;
      return axiosClient().post(url, {
          email,
          password,
      });
  },
  logout: () => {
    const url = `/logout`;
    return axiosClient().get(url);
  }
}

export default usersApi;
