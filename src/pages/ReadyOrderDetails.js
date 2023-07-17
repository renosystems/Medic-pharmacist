import React, { useState, useEffect, Fragment, version } from "react";
import { Translate } from "react-localize-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import ImagesModal from "./../components/ImagesModal";
import MedicineCard from "./../components/cards/MedicineCard";
import { getOrder, changeOrderStatus } from "../store/actions/ordersActions";
import { useSelector, useDispatch } from "react-redux";
import ChangeStatusModal from "./../components/ChangeStatusModal";
import { Link } from "react-router-dom";
import { getLocalizedName } from "../utils/helper";
import { getActiveLanguage } from "react-localize-redux";
import Invoice from "../components/Invoice";
import OrderGeneralInfo from "../components/OrderGeneralInfo";

const NON_CHANGEABLE_STATUSES = [4, 8,9,10];
export default function ReadyOrderDetails(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const orderId = props.match.params.id;
  const order = useSelector((state) => state.orders.orderDetails.order);
  const activeLanguage = useSelector((state) =>
    getActiveLanguage(state.localize)
  );
  // let order_status = props.location && props.location.order?props.location.order.status:order.status;
  const avatar = "";
  let redirect = false;
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  function toggleChangeStatusModal() {
    setChangeStatusModal(!changeStatusModal);
  }
  function handleChangeStatus(order, status) {
    if (order && status != "") {
      toggleChangeStatusModal();
      dispatch(changeOrderStatus(order, status));
      props.history.push("/");
    }
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);
  let order_items =
    order && order.order_items
      ? order.order_items.filter((item) => item.itemtype != "3")
      : [];

  const statuses = [
    "",
    "In Cart",
    "Pending Review",
    "Processing",
    "Cancelled",
    "Confirmed",
    "Ready For Shipping",
    "Out For Delivery",
    "Delivered",
    "Returned",
    "Declined",
  ];
  activeLanguage.code = "ar";
  let payment_method =
    Object.keys(order).length != 0 && order.payment_method
      ? getLocalizedName(order.payment_method, activeLanguage)
      : "";

  return (
      Object.keys(order).length != 0 && (
          <div className="p-4 order-details">

              <div className="user-details bg-white border p-2 rounded">
                    <OrderGeneralInfo order={order} />
              
                  <div className="user-info d-flex mt-3 align-items-start">
                      <span className="font-weight-bold">
                          <Translate id="general.address" />:
                      </span>
                      <Translate id="general.street" />{" "}
                      {order.useraddress.street},
                      <Translate id="general.building" />{" "}
                      {order.useraddress.building_no},
                      <Translate id="general.floor" />{" "}
                      {order.useraddress.floor_no},
                      <Translate id="general.apartment" />{" "}
                      {order.useraddress.apartment_no &&
                          order.useraddress.apartment_no}
                      ,{" "}
                      {getLocalizedName(order.useraddress.district, {
                          code: "ar",
                      })}
                  </div>
                  <div className="">
                      {order.user && (
                          <>
                              <div className="d-flex justify-content-center align-items-baseline mt-3 border-top ">
                                  <span className="text-black-50 font-size-1 ml-2">
                                      <Translate id="general.orderStatus" />
                                  </span>
                                  <span>{statuses[order.status]}</span>

                                  {/* {`Order Status => ${statuses[order.status]}`} */}
                              </div>
                          </>
                      )}
                  </div>
              </div>

              <div className="rounded border bg-white p-2 mt-3 ltr">
                  <CarouselProvider
                      naturalSlideWidth={100}
                      naturalSlideHeight={125}
                      totalSlides={order.order_items.length}
                      visibleSlides="4"
                  >
                      <Slider>
                          {order_items.map((medicine, index) => (
                              <Slide index={index} key={index}>
                                  <img
                                      onClick={toggle}
                                      className=" pl-1 w-100 h-100"
                                      src={medicine.productform.image}
                                  />
                              </Slide>
                          ))}
                      </Slider>
                      <div className="d-flex justify-content-center">
                          <ButtonBack className="border-0 p-2 m-2">
                              <span>
                                  <Translate id="general.previous" />
                              </span>
                          </ButtonBack>
                          <ButtonNext className="border-0 p-2 m-2">
                              <span>
                                  <Translate id="general.next" />
                              </span>
                          </ButtonNext>
                      </div>
                  </CarouselProvider>

                  <ImagesModal
                      orderType="ready"
                      data={order}
                      modal={modal}
                      setModal={setModal}
                      toggle={toggle}
                      addProductsBtn={false}
                  />
              </div>

              <div className="order-details  mt-3">
                  <div className="mt-3">
                      {order_items.map((medicine) => (
                          <div className="selected-medicines-wrapper d-flex">
                              <MedicineCard
                                  key={medicine.id}
                                  orderType="ready"
                                  medicine={medicine}
                                  // viewOption={viewOption}
                              />
                          </div>
                      ))}
                  </div>
                  <br />
                        <Invoice order={order}/>
                  <br />

                  {order && !NON_CHANGEABLE_STATUSES.includes(order.status) && (
                      <button
                          onClick={toggleChangeStatusModal}
                          className="w-100 mt-3 secondary-bg text-light border-0 shadow-sm rounded"
                      >
                          <Translate id="general.changeOrderStatus" />
                      </button>
                  )}

                  <Link className="w-100 d-block" to="/summary">
                      <button className="button-primary w-100 mt-3 rounded shadow-sm">
                          <Translate id="general.back_to_home_page" />
                      </button>
                  </Link>
              </div>

              {changeStatusModal && (
                  <ChangeStatusModal
                      userName={`${order.user.first_name} ${order.user.last_name}`}
                      orderNo={order.so_num}
                      toggleChangeStatusModal={toggleChangeStatusModal}
                      order={order}
                      handleChangeStatus={handleChangeStatus}
                  />
              )}
          </div>
      )
  );
}
