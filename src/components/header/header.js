import "./header.scss";
import { FaKey, FaUserAlt } from "react-icons/fa";
import {
  AiOutlineDown,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/apiRequests";
import createAxiosJWT from "../../axiosJWT";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailed } from "../../redux/slice/authSlice";

const Header = (props) => {

  let loggedIn = useSelector((state) => state.auth.login.loggedIn);
  let loginUser = useSelector((state) => state.auth.login.user);
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosJWT = createAxiosJWT(loginUser, dispatch, loginSuccess, loginFailed);

  const onKeyChange = (e) => {
    setKey(e.target.value);
  };
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${key}`);
    }
  };
  const handleClickSearchButton = (e) => {
    navigate(`/search/${key}`);
  };

  const handleLogout = () => {
    logoutUser(loginUser.accessToken, axiosJWT, dispatch, navigate);
  };
  return (
    <div className="container">
      <header>
        <div className="container">
          <div className="header-top">
            <div className="row">
              <div className="col-lg-6 logo">
                <Link to="/">
                  <img
                    src={require("../../assets/image/logo.png")}
                    alt="logo image"
                  />
                </Link>
              </div>
              <div className="col-lg-6">
                <div className="header-top-right">
                  {loggedIn ? (
                    <>
                      <Link className="link-to-cart" to="/cart">
                        <AiOutlineShoppingCart className="cart-icon" />
                        Gi??? h??ng
                      </Link>

                      <span className="text-capitalize">
                        <FaUserCircle /> {loginUser?.userName}
                        <ul className="user-action">
                          {loginUser?.role === "admin" ? (
                            <>
                              <Link to="/handle-ordered">
                                <li>????n ch??? x??? l??</li>
                              </Link>
                              <Link to="/manage-user">
                                <li> Qu???n l?? ng?????i d??ng </li>
                              </Link>
                              <Link to="/manage-product">
                                <li> Qu???n l?? s???n ph???m </li>
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link to="/">
                                <li> S???a th??ng tin </li>
                              </Link>
                              <Link to="/history">
                                <li> L???ch s??? mua </li>
                              </Link>
                            </>
                          )}
                          <li onClick={handleLogout}> ????ng xu???t </li>
                        </ul>
                      </span>
                    </>
                  ) : (
                    <>
                      <button>
                        <Link to="/login">????NG NH???P</Link>
                      </button>
                      <button>
                        <Link to="/sign-up"> ????NG K??</Link>
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="search">
                <input
                  type="text"
                  placeholder="T??m ki???m m??n ??n"
                  value={key}
                  onChange={(e) => onKeyChange(e)}
                  onKeyDown={(e) => handleSearchKeyDown(e)}
                />
                <div className="search-icon">
                  <AiOutlineSearch
                    onClick={(e) => handleClickSearchButton(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
