import React, { useState, useEffect, Fragment } from "react";
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
import InformationModal from "../components/InformationModal";
import { useSelector, useDispatch } from "react-redux";
import { changeQuantity, getOrder } from "../store/actions/ordersActions";
import { getActiveLanguage } from "react-localize-redux";
import DeleteModal from "./../components/DeleteModal";
import { getLocalizedName } from "../utils/helper";
import Moment from "react-moment";
import {
  addMedicinesToAttachments,
  addMedicinesToUserCart,
  changeOrderStatus,
  increaseQuantity,
  decreaseQuantity,
  sendComment,
} from "./../store/actions/ordersActions";
import RejectModal from "./../components/RejectModal";
import OrderGeneralInfo from "../components/OrderGeneralInfo";
import { medicinePrice } from "../utils/medicine";

export default function AttachementOrderDetails(props) {
  const orderId = props.match.params.id;
  const activeLanguage = useSelector((state) =>
    getActiveLanguage(state.localize)
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(orderId, 2));
    return () => {
      window.location.reload(false);
    };
    // dispatch(addMedicinesToAttachments([],true));
  }, []);

  const orderDetails = useSelector((state) => state.orders.orderDetails);
  let order = null;
  if (orderDetails && orderDetails.order) {
    order = orderDetails.order;
  }
  const avatar = order?.user?.avatar;

  let addedMedicines = useSelector((state) => state.orders.medicinesList);
  let total =
      addedMedicines && addedMedicines.length > 0
          ? addedMedicines.reduce(
                (a, b) =>
                    a +
                    (b.available &&
                        (b.productform
                            ? medicinePrice(b.productform) * b.quantity
                            : medicinePrice(b) * b.quantity)),
                0
            )
          : 0;

  const order_state = useSelector((state) => state.orders);
  const [modal, setModal] = useState(false);
  const [medicineToDelete, setMedicine] = useState({});
  const [itemClicked, setItemMedicine] = useState({});
  const [comment, setComment] = useState("");
  function handleChange(e) {
    e.preventDefault();
    setComment(e.target.value);
  }

  function changeCickedItemIndex(itemIndex, checked) {
    addedMedicines[itemIndex].available = checked;
    dispatch(addMedicinesToAttachments(addedMedicines, true));
  }
  const toggle = (medicine) => {
    setModal(!modal);
    if (medicine && medicine.user_attachment) {
      setItemMedicine(medicine.user_attachment.id);
    }
  };

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  function sendOrder() {
    if (!order_state.reviewed && order && Object.keys(order).length != 0) {
      let order_id = order.id;
      let productList = [];
      addedMedicines.map((item, index) => {
        let user_attachment =
          Object.keys(itemClicked).length != 0 ? itemClicked : null;
        let related_alternative_id = item.related_alternative_item
          ? item.related_alternative_item.id
          : null;
        let available =
          typeof item.available !== "undefined" ? item.available : true;
        let isAlternative = item.isAlternative ? 2 : 1;
        let item_id = item.productform ? item.productform.id : item.id;
        productList.push({
          item_id: item_id,
          quantity: item.quantity,
          itemtype: isAlternative,
          user_attachment:
            item.user_attachment &&
            item.user_attachment.user_attachment &&
            item.user_attachment.user_attachment.id
              ? item.user_attachment.user_attachment.id
              : null,
          related_alternative: related_alternative_id,
          available: available,
          note: item.note,
        });
      });
      console.log(productList, "productList");
      dispatch(addMedicinesToUserCart(order_id, productList));
      // dispatch(changeQuantity(order_id,6))
      dispatch(sendComment(order_id, comment));
      setConfirmationModal(!confirmationModal);
    }
  }
  const [rejectModal, setRejectModal] = useState(false);
  function toggleRejectModal() {
    setRejectModal(!rejectModal);
  }
  function handleReject(order, rejectionReason) {
    if (order.status === 2 || order.status == 14) {
      toggleRejectModal();
      dispatch(changeOrderStatus(order, 10, rejectionReason));
      dispatch(sendComment(order.id, comment));
      props.history.push("/");
    }
  }

  let attachments = [];
  if (order && Object.keys(order).length != 0 && order && order.order_items) {
    order.order_items.map((item) => {
      if (item.itemtype == 3) {
        attachments.push(item);
      }
    });
  }

  function toggleDeleteModal(medicine) {
    setMedicine(medicine);
    setDeleteModal(!deleteModal);
  }

  function handleIncrease(medicine) {
    // dispatch(increaseQuantityCall(orderId,medicine))
    dispatch(increaseQuantity(medicine));
  }

  function handleDecrease(medicine) {
    // dispatch(decreaseQuantityCall(orderId,medicine))
    dispatch(decreaseQuantity(medicine));
  }

  function handleDeleteItem(medicine) {
    let productList = [...addedMedicines];
    dispatch(addMedicinesToAttachments([], true));
    let index = productList.findIndex(
      (product) =>
        (!product.productform && product.id === medicine.id) ||
        (product.productform && product.productform.id === medicine.id)
    );

    console.log(index, "index");

    if (index !== -1) {
      // productList[index].quantity = 0;
      productList.splice(index, 1);
      delete productList[index];
    }

    dispatch(addMedicinesToAttachments(productList));
    toggleDeleteModal();
  }
  return (
    <div className="p-4 attachement-order-details">
      {order && Object.keys(order).length != 0 && (
        <>
        <div className="user-details bg-white border p-2 rounded">
            <OrderGeneralInfo order={order} />
          {order.useraddress && (
            <div className="d-flex mb-3 align-items-start">
              <span className="font-weight-bold">
                <Translate id="general.address" />:
              </span>
              <Translate id="general.street" /> {order.useraddress.street},
              <Translate id="general.building" />{" "}
              {order.useraddress.building_no},
              <Translate id="general.floor" /> {order.useraddress.floor_no},
              <Translate id="general.apartment" />{" "}
              {order.useraddress.apartment_no && order.useraddress.apartment_no}
              , {getLocalizedName(order.useraddress.district, { code: "ar" })}
            </div>
            )}
            </div>

          <div className="rounded border bg-white p-2 mt-3 ltr">
            <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={125}
              totalSlides={order.order_items.length}
              visibleSlides="4"
            >
              <Slider>
                {order.order_items.map((medicine, index) => (
                  <Slide key={index} index={index}>
                    <img
                      onClick={() => {
                        medicine.itemtype === "3" && toggle(medicine);
                      }}
                      className=" pl-1 w-100 h-100"
                      alt={medicine.name}
                      src={
                        medicine.itemtype === "3"
                          ? medicine.user_attachment.image
                          : medicine.productform.image
                      }
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
              orderType="attachment"
              data={order}
              modal={modal}
              setModal={setModal}
              toggle={toggle}
              addProductsBtn={true}
              itemClicked={itemClicked}
            />
          </div>
          <div className="mt-3">
            {addedMedicines.length > 0 &&
              addedMedicines.map(
                (medicine, index) =>
                  medicine.quantity > 0 && (
                    <div
                      key={index}
                      className="selected-medicines-wrapper d-flex"
                    >
                      <MedicineCard
                        orderType="attachment"
                        medicine={medicine}
                        handleIncrease={handleIncrease}
                        handleDecrease={handleDecrease}
                        handleDeleteItem={handleDeleteItem}
                        toggleDeleteModal={toggleDeleteModal}
                        deleteModal={deleteModal}
                        toggle={toggle}
                        changeCickedItemIndex={changeCickedItemIndex}
                        itemIndex={index}
                      />
                    </div>
                  )
              )}

            <div className=" d-flex flex-column justify-content-center align-items-start  bg-white border p-2 rounded">
              <div className="mr-3 font-weight-bold">
                <Translate id="general.comment" />
              </div>
              <Translate>
                {({ translate }) => (
                  <textarea
                    className="m-3 p-2 pr-3 border border-secondary rounded"
                    cols="30"
                    rows="5"
                    placeholder={translate("general.commentPlaceHolder")}
                    value={comment}
                    onChange={handleChange}
                  >
                    {" "}
                  </textarea>
                )}
              </Translate>
            </div>
            {addedMedicines.length == 0 ? (
              <div>
                <button disabled className="w-100 mt-3 secondary-bg text-light">
                  <Translate id="general.backAndSendOrder" />
                </button>
              </div>
            ) : (
              <div>
               
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-end",
                    }}
                  >
                    <span>
                      <Translate id="general.total" /> {total} <span>ج.م</span>
                    </span>{" "}
                  </span>
                {// )}
                }
                <button
                  onClick={() => {
                    sendOrder();
                  }}
                  className="w-100 mt-3 secondary-bg text-light border-0 shadow-sm rounded"
                >
                  <Translate id="general.sendOrderToClient" />
                </button>
              </div>
            )}
            {deleteModal && (
              <DeleteModal
                handleDelete={handleDeleteItem}
                activeLanguage={activeLanguage}
                toggleDeleteModal={toggleDeleteModal}
                medicine={medicineToDelete}
              />
            )}
          </div>
          <button
            onClick={toggleRejectModal}
            className="primary-button-bordered w-100 mt-3 bg-white rounded shadow-sm"
          >
            <Translate id="general.rejectOrder" />
          </button>
        </>
      )}
      {rejectModal && (
        <RejectModal
          userName={`${order.user.first_name} ${order.user.last_name}`}
          orderNo={order.so_num}
          toggleRejectModal={toggleRejectModal}
          order={order}
          handleReject={handleReject}
        />
      )}

      {confirmationModal && <InformationModal />}
    </div>
  );
}
