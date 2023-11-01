import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

export const Header = () => {
  const { logout, user } = useAuthContext();
  const nav = useNavigate();

  return (
    <div className="container">
      <nav>
        <ul>
          <hgroup>
            <h1>
              <Link to="/">AggieCanvas</Link>
            </h1>
            <h4>
              By the{" "}
              <Link to="https://linux.usu.edu">
                Free Software and Linux Club
              </Link>
            </h4>
          </hgroup>
        </ul>
        <ul>
          {user && (
            <li>
              <button
                data-tooltip={`user: ${user?.username}`}
                onClick={() => logout().then(() => nav("/"))}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
