import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";
import { RootState } from "../redux/store";

const Home = () => {
    const [message, setMessage] = useState("");
    const auth = useSelector((state: RootState) => state.auth.value);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            const { data } = await axios.get("user");

            setMessage(`Hi ${data.first_name} ${data.last_name}`);
            dispatch(setAuth(true));
        } catch (e) {
            setMessage("You are not authenticated");
            dispatch(setAuth(false));
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container mt-5 text-center">
            <h3>{auth ? message : "You are not authenticated"}</h3>
        </div>
    );
};

export default Home;
