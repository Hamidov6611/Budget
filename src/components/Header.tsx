import { FC } from "react";
import { FaBtc, FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/slice/userSlice";

const Header: FC = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/auth");
  };
  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 shadow-sm backdrop-blur-sm">
      <Link to={"/"}>
        <FaBtc size={28} />
      </Link>
      {/* Menu */}
      {isAuth && (
        <nav className="ml-auto mr-10">
          <ul className="hidden md:flex items-center gap-5 ">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-white/50"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/transactions"}
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-white/50"
                }
              >
                Transactions
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/categories"}
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-white/50"
                }
              >
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {/* Actions */}
      {isAuth ? (
        <button onClick={logoutHandler} className="btn btn-red">
          <span>Log Out</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link
          className="py-2 text-white/50 hover:text-white ml-auto"
          to={"auth"}
        >
          Log In / Sign In
        </Link>
      )}
    </header>
  );
};

export default Header;
