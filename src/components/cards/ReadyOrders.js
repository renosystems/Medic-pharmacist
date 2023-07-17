import React, { useState } from "react";
import "./card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import classnames from "classnames";

import { Translate, getActiveLanguage } from "react-localize-redux";
import { getLocalizedName } from "../../utils/helper";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Link } from "react-router-dom";
import ImagesModal from "./../ImagesModal";
import RejectModal from "./../RejectModal";
import { useSelector, useDispatch } from "react-redux";
import { changeOrderStatus } from "./../../store/actions/ordersActions";
import Moment from "react-moment";

export default function ReadyOrders(props) {
  let order = props.data;
  const activeLanguage = useSelector((state) =>
    getActiveLanguage(state.localize)
  );
  const avatar = "";
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [rejectModal, setRejectModal] = useState(false);
  const dispatch = useDispatch();
  function toggleRejectModal() {
    setRejectModal(!rejectModal);
  }
  function handleReject(order, rejectionReason) {
    toggleRejectModal();
    dispatch(changeOrderStatus(order, 10, rejectionReason));
  }
  let viewOption =
    props.reference && props.reference == "previous" ? false : true;
  let order_items = order.order_items.filter((item) => item.itemtype != "3");
  return (
    <div>
      <div className="border-bottom order-details-wrapper">
        <div className="d-flex">
          <div className="w-100 pb-2 mb-2 order-details-wrapper d-flex flex-row justify-content-between align-items-center ">
            <div className="d-flex flex-row align-items-center">
              <div className="mr-2 ml-2">
                {!avatar ? (
                  <FontAwesomeIcon color="#6B4C8B" size="2x" icon={faUser} />
                ) : (
                  <div
                    className="rounded-circle border"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <img className="" src={avatar} />
                  </div>
                )}
              </div>
              <div className="user-info d-flex flex-column justify-content-center align-items-start">
                <div>
                  {order.user.first_name} {order.user.last_name}
                </div>
                <div>{order.user.username}</div>
              </div>
            </div>
            <div className="d-flex  align-items-center flex-row">
              <div className="d-flex flex-column justify-content-center align-items-end">
                <div>#{order.so_num}</div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#797777",
                    direction: "ltr",
                  }}
                >
                  <Moment format="DD/MM/YYYY hh:mm a">{order.created}</Moment>
                </div>
              </div>
              {order.read_at && <div className="unread-sign mr-2 ml-2"></div>}
            </div>
          </div>
        </div>
        {order.useraddress && (
          <div className="d-flex mb-3 align-items-start">
            <span className="font-weight-bold">
              <Translate id="general.address" />:
            </span>
            <Translate id="general.street" /> {order.useraddress.street},
            <Translate id="general.building" /> {order.useraddress.building_no},
            <Translate id="general.floor" /> {order.useraddress.floor_no},
            <Translate id="general.apartment" />{" "}
            {order.useraddress.apartment_no && order.useraddress.apartment_no},{" "}
            {getLocalizedName(order.useraddress.district, { code: "ar" })}
          </div>
        )}
      </div>

      <div className="d-flex flex-row justify-content-center ">
        {order_items.map(
          (item, index) =>
            index < 3 && (
              <div
                onClick={toggle}
                className="p-2 medicine-preview d-flex flex-column justify-content-center ml-2"
                key={index}
              >
                <img
                  onClick={toggle}
                  className="w-100"
                  src={item.productform.image}
                />
              </div>
            )
        )}
        {order_items.length > 3 && (
          <div className="main-color-bg text-light h-100 p-3 rounded mt-4">
            {order_items.length - 3}+
          </div>
        )}

        <ImagesModal
          orderType="ready"
          data={order}
          modal={modal}
          setModal={setModal}
          toggle={toggle}
        />
      </div>
      <div className="order-footer d-flex justify-content-between align-items-center mt-2 mb-2">
        {/* {
                    viewOption && (
                        <button onClick={toggleRejectModal} className="primary-button-bordered"><Translate id="general.rejectOrder" /></button>
                    )
                } */}
        <Link
          //  to={`/${order.id}`}
          to={{
            pathname: "/order-details/" + order.id,
            order: order,
            view_option: viewOption,
          }}
        >
          <span className="primary-color">
            <Translate id="general.details" />
          </span>{" "}
        </Link>
      </div>
      {rejectModal && (
        <RejectModal
          userName={`${order.user.first_name} ${order.user.last_name}`}
          orderNo={order.so_num}
          toggleRejectModal={toggleRejectModal}
          order={order}
          handleReject={handleReject}
        />
      )}
    </div>
  );
}
