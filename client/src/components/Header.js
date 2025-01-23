import { AuthContext } from "../context/AuthContext"; 
import { useContext } from "react";
function Header() {
    const { logout } = useContext(AuthContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <p className="navbar-brand">College Placement Management System</p>
                <div className="d-flex">
                    <button className="btn btn-outline-success" onClick={() => logout() } type="button">Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Header;