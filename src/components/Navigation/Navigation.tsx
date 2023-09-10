import { Link, useLocation } from "react-router-dom";
import Search from "../Search/Search";
import style from "./Navigation.module.css";

function Navigation() {
  const { pathname } = useLocation();
  return (
    <nav className={style.navigation}>
      <ul>
        <li>
          <Link
            className={
              pathname === "/popular" || pathname === "/" ? style.isActive : ""
            }
            to="/popular"
          >
            Popular movies
          </Link>
        </li>
        <li>
          <Link
            to="/watchlist"
            className={pathname === "/watchlist" ? style.isActive : ""}
          >
            WatchList
          </Link>
        </li>
        <li className={style.search}>
          <Search />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
