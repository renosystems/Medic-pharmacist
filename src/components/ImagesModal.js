import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import { Translate } from "react-localize-redux";
import PrepareMedicineModal from "./PrepareMedicineModal";
import { getLocalizedName } from "./../utils/helper";
import { useSelector, useDispatch } from "react-redux";
import { getActiveLanguage } from "react-localize-redux";
export default function ImagesModal(props) {
  const [medicineFormFlag, setMedicineForm] = useState(false);

  const activeLanguage = useSelector((state) =>
    getActiveLanguage(state.localize)
  );
  const [imagesModalState, setImagesModalState] = useState(props);

  const { itemClicked = {} } = props;
  const [selectedItem, setItem] = useState(itemClicked);
  const { setModal, toggle } = props;
  useEffect(() => {
    setImagesModalState(props);
  }, [props]);

  function handleClose() {
    setMedicineForm(!medicineFormFlag);
  }
  function handleCloseImagesModal() {
    setImagesModalState(!imagesModalState.modal);
    handleClose();
    setModal(!toggle);
  }

  const currentSlide = props.data.order_items
    .filter((item) => item.itemtype === "3" || item.itemtype === "2")
    .findIndex((item) => item.id === itemClicked.id);

  return (
    <div>
      <Modal isOpen={imagesModalState.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}></ModalHeader>
        <ModalBody>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={
              (props.orderType === "attachment" &&
                props.data.order_items.filter(
                  (item) =>
                    item.itemtype === "3" ||
                    item.itemtype === "2" ||
                    item.itemtype === "1"
                ).length) ||
              (props.orderType === "ready" && props.data.order_items.length)
            }
            currentSlide={0}
          >
            <Slider>
              {
                //case attachement order
                props.orderType === "attachment" &&
                  props.data.order_items.map((item, index) => (
                    <>
                      {(item.itemtype === "3" ||
                        item.itemtype === "2" ||
                        item.itemtype === "1") && (
                        <Slide key={index} index={index}>
                          <div className="text-left">
                            <Translate id="general.attachments" />
                          </div>
                          {props.addProductsBtn && (
                            <button
                              onClick={() => {
                                setMedicineForm(!medicineFormFlag);
                                setItem(item);
                                console.log("add products", item);
                              }}
                              className="button-primary w-100 rounded shadow-sm"
                            >
                              <Translate id="general.addingProducts" />
                            </button>
                          )}
                          <span className="mb-3 text-left d-block">
                            <span>
                              <Translate id="general.image" />
                            </span>{" "}
                            {index + 1} /{" "}
                            {
                              props.data.order_items.filter(
                                (item) =>
                                  item.itemtype === "3" ||
                                  item.itemtype === "2" ||
                                  item.itemtype === "1"
                              ).length
                            }{" "}
                          </span>
                          <img
                            className="h-75 img-fluid d-block m-auto"
                            style={{ "object-fit": "contain" }}
                            src={
                              item.itemtype === "3"
                                ? item.user_attachment.image
                                : item.productform.image
                            }
                            alt={item.productform ? item.productform.name : ""}
                          />
                          {item.itemtype !== "3" &&
                            item &&
                            item.productform && (
                              <input
                                className="border rounded w-100 text-center"
                                disabled
                                value={`(${item.productform.price} LE) [${
                                  item.productform.product_name_ar
                                } -- ${item.productform.product_name}] [${
                                  item.productform.size
                                } * ${
                                  item.productform.unit
                                    ? getLocalizedName(
                                        item.productform.unit,
                                        activeLanguage
                                      )
                                    : ""
                                }] #[${
                                  item.productform.form
                                    ? getLocalizedName(
                                        item.productform.form,
                                        activeLanguage
                                      )
                                    : "form"
                                }]`}
                                type="text"
                              />
                            )}
                        </Slide>
                      )}
                    </>
                  ))
              }

              {
                //case ready order
                props.orderType === "ready" &&
                  props.data.order_items
                    .filter((item) => item.itemtype !== "3")
                    .map((medicine, index) => (
                      <Slide index={index} key={index}>
                        <div className="text-left">
                          <Translate id="general.attachments" />
                        </div>
                        <span className="mb-3 text-left d-block">
                          <span>
                            <Translate id="general.image" />
                          </span>{" "}
                          {index + 1} / {props.data.order_items.length}{" "}
                        </span>
                        <img
                          className="h-75 img-fluid d-block m-auto"
                          style={{ "object-fit": "contain" }}
                          src={medicine.productform.image}
                          alt={medicine.name}
                        />
                      </Slide>
                    ))
              }
            </Slider>
            <div className="d-flex justify-content-center align-items-center mt-3">
              <div className="d-flex ">
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

              {medicineFormFlag && (
                <PrepareMedicineModal
                  medicineFormFlag={medicineFormFlag}
                  handleClose={handleClose}
                  handleCloseImagesModal={handleCloseImagesModal}
                  item={selectedItem}
                  isAttachment={true}
                />
              )}
            </div>
          </CarouselProvider>
        </ModalBody>
      </Modal>
    </div>
  );
}
