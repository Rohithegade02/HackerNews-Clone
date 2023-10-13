import React from "react";
import { useHistory } from "react-router-dom";

function Logout() {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("userData");
        localStorage.removeItem("authToken");
        history.push("/login");
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;
