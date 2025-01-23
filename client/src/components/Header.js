import { AuthContext } from "../context/AuthContext"; 
import { useContext } from "react";
function Header() {
    const { logout } = useContext(AuthContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand">College Placement Management System</a>
                <div class="d-flex">
                    <button class="btn btn-outline-success" onClick={() => logout() } type="button">Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Header;