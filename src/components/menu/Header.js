import React, { useState } from "react";
import { Translate } from "react-localize-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { logOutUser } from "../../store/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import "./menu.css";
export default function Header(props) {
  const [menuFlag, setMenuFlag] = useState(false);
  const toggleMenu = () => setMenuFlag(!menuFlag);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <div className="main-color-bg">
      <div className="height-1 d-flex justify-content-start align-items-center p-3">
        <span
          onClick={() => {
            toggleMenu();
          }}
          className="text-light fa-2x"
        >
          <FontAwesomeIcon icon={faBars} />
        </span>
        <span className="text-light mr-4 ml-4 h5 mt-1">{props.title}</span>
      </div>
      {menuFlag && (
        <div className="opened-menu-wrapper w-100 full-height">
          <div className="w-75">
            <div className="main-menu main-color-bg position-fixed full-height d-flex justify-content-start flex-column pl-4 pr-4 pt-3">
              <div className="d-flex justify-content-center">
                <span className="text-light w-75 ">
                  <Translate id="general.mainMenuTitle" />
                </span>
                <span
                  onClick={() => {
                    toggleMenu();
                  }}
                  className="text-light fa-2x"
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                </span>
              </div>

              <div className="menu-items justify-content-start d-flex">
                <ul className="p-0 m-0 w-100 text-left mt-4">
                  <li className="m-0 pb-3 pt-3">
                    <Link
                      onClick={() => {
                        toggleMenu();
                      }}
                      to="/"
                    >
                      <Translate id="general.home" />
                    </Link>
                  </li>
                  <li className="m-0 pb-3 pt-3">
                    <Link
                      onClick={() => {
                        toggleMenu();
                      }}
                      to="/orders-under-review"
                    >
                      <Translate id="general.ordersWithAttachement" />
                    </Link>
                  </li>
                  <li className="m-0 pb-3 pt-3">
                    <Link
                      onClick={() => {
                        toggleMenu();
                      }}
                      to="/orders-ready-preparation"
                    >
                      <Translate id="general.orderReadyToReview" />
                    </Link>
                  </li>
                  <li className="m-0 pb-3 pt-3">
                    <Link
                      onClick={() => {
                        toggleMenu();
                      }}
                      to="/active-orders"
                    >
                      <Translate id="general.activeOrders" />
                    </Link>
                  </li>
                  <li className="m-0 pb-3 pt-3">
                    <Link
                      onClick={() => {
                        toggleMenu();
                      }}
                      to="/previous-orders"
                    >
                      <Translate id="general.previousOrders" />
                    </Link>
                  </li>
                  <li className="m-0 pb-3 pt-3">
                    <Link
                       onClick={() => {
                        toggleMenu();
                      }}
                      to="/adding-medicine"
                    >
                      <Translate id="general.adding_medicine" />
                    </Link>
                  </li>
                  <li className="m-0 pb-3 pt-3">
                    <a
                      href="#"
                      onClick={() => {
                        dispatch(logOutUser());
                      }}
                    >
                      <Translate id="general.logout" />
                    </a>
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
