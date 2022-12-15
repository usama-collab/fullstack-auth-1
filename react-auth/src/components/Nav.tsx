import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setAuth } from "../redux/authSlice";
import { RootState } from "../redux/store";

export const Nav = () => {
    // const [auth, setAuth] = useState(false);
    const auth = useSelector((state: RootState) => state.auth.value);
    const dispatch = useDispatch();

    const logout = async () => {
        await axios.post("logout");

        dispatch(setAuth(false));
    };

    let links;

    if (auth) {
        links = (
            <div className="text-end">
                <Link
                    to="/"
                    onClick={logout}
                    className="btn btn-outline-light me-2"
                >
                    Logout
                </Link>
            </div>
        );
    } else {
        links = (
            <div className="text-end">
                <Link
                    to="/login"
                    type="button"
                    className="btn btn-outline-light me-2"
                >
                    Login
                </Link>
                <Link
                    to="register"
                    type="button"
                    className="btn btn-outline-light me-2"
                >
                    Register
                </Link>
            </div>
        );
    }
    return (
        <header className="p-3 bg-dark text-center">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li>
                            <Link to="/" className="nav-link px-2 text-white">
                                Home
                            </Link>
                        </li>
                    </ul>
                    {links}
                </div>
            </div>
        </header>
    );
};
