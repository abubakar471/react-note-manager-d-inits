import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <div className="notFound">
                <h2>404 Not Found</h2>

                <div className="notFoundHomeBtn">
                    <Link to="/">
                        <button>go to homepage</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NotFound;