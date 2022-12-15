import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.withCredentials = true;

let refresh = false;

axios.interceptors.response.use(
    (resp) => resp,
    async (error) => {
        if (error.response.status === 401 && !refresh) {
            refresh = true;
            const response = await axios.post("refresh", {});
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data["access_token"]}`;

            if (response.status === 200) {
                return axios(error.config);
            }
        }

        refresh = false;
        return error;
    }
);
