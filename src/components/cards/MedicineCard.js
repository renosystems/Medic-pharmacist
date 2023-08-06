import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { Translate } from "react-localize-redux";
import Switch from "@material-ui/core/Switch";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PrepareMedicineModal from "./../PrepareMedicineModal";
import { getLocalizedName } from "../../utils/helper";
import { getActiveLanguage } from "react-localize-redux";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "./../DeleteModal";
import Badge from "../Badge";

export default function MedicineCard(props) {
    const [state, setState] = React.useState({
        checkedB: true,
    });
    const [isAlt, setIsAlt] = useState(false);
    const activeLanguage = useSelector((state) =>
        getActiveLanguage(state.localize)
    );
    let addedMedicines = useSelector((state) => state.orders.medicinesList);

    const handleChange = (event, itemMedicine) => {
        if (!event.target.checked) {
            setItemMedicine(itemMedicine);
            props.changeCickedItemIndex(props.itemIndex, false);
        } else {
            props.changeCickedItemIndex(props.itemIndex, true);
            setItemMedicine({});
        }
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const [itemClicked, setItemMedicine] = useState({});
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    };
    function handleCloseImagesModal() {
        toggle();
    }

    let medicine = props.medicine;
    if (props.medicine.productform) {
        let isAlternative = medicine.itemtype == "2" ? true : false;
        medicine = props.medicine.productform;
        medicine.isAlternative = isAlternative;
        medicine.quantity = props.medicine.quantity;
    }
    // let  = false;

    let hasAlternative =
        addedMedicines.findIndex(
            (i) =>
                typeof medicine.related_alternative_item === "undefined" &&
                typeof i.related_alternative_item != "undefined" &&
                i.related_alternative_item.productform.id == medicine.id
        ) != -1
            ? true
            : false;

    const viewOption = props.viewOption;

    let price = medicine ? medicine.price : 0;
    let hasDiscount = medicine ? medicine.discount_amount > 0 : false;
    let priceAfterDiscount = medicine
        ? medicine.price - medicine.discount_amount
        : 0;


      

              
    function handleDeleteMedicine(medicine) {
        props.toggleDeleteModal(medicine);
    }
    return (
        <div className="medicine border w-100 p-3 mt-3 rounded position-relative bg-white">
            {medicine.isAlternative && (
                <div className="d-flex justify-content-end font-size-1 ">
                    <span
                        style={{ borderRadius: "11px" }}
                        className="red-background text-light pl-3 pr-3"
                    >
                        <Translate id="general.alternativeMedicine" />
                    </span>
                </div>
            )}

            {props.orderType === "attachment" && !hasAlternative && (
                <FontAwesomeIcon
                    onClick={() => handleDeleteMedicine(medicine)}
                    className="ml-1 mr-1 position-absolute remove-medicine"
                    color="#6B4C8B"
                    size="2x"
                    icon={faTimesCircle}
                />
            )}
            {props.orderType === "prepared" && (
                <FontAwesomeIcon
                    onClick={() => props.handleDeleteItem(props.itemIndex)}
                    className="ml-1 mr-1 position-absolute remove-medicine"
                    color="#6B4C8B"
                    size="2x"
                    icon={faTimesCircle}
                />
            )}
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-start">
                    {medicine && medicine.quantity && (
                        <>
                            <img
                                style={{ width: "50px" }}
                                src={medicine.image}
                                className=""
                                alt={medicine.name}
                            />
                            <div className="d-flex flex-column mr-2 ml-2">
                                <span className="medicine-title text-left">
                                    {`(${medicine.price} LE)  ${
                                        medicine.product_name
                                    } ${medicine.concentration} ${
                                        medicine.product_name_ar
                                    } [${medicine.size} * ${
                                        medicine.unit
                                            ? getLocalizedName(
                                                  medicine.unit,
                                                  activeLanguage
                                              )
                                            : "unit"
                                    }] [${
                                        medicine.form
                                            ? getLocalizedName(
                                                  medicine.form,
                                                  activeLanguage
                                              )
                                            : "form"
                                    }]`}
                                </span>
                                <div className="d-flex flex-row align-items-center">
                                    <span className="quantity-title text-black-50 font-size-1 ml-1 mr-1">
                                        <Translate id="general.quantity" />
                                    </span>

                                    <div className="d-flex flex-row align-items-center">
                                        {props.handleIncrease &&
                                            props.medicine.ordered_quantity >
                                                medicine.quantity && (
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    color="black"
                                                    size="xs"
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        props.handleIncrease(
                                                            medicine
                                                        )
                                                    }
                                                />
                                            )}{" "}
                                        <span className="ml-2 mr-2">
                                            {" "}
                                            {medicine.quantity}{" "}
                                        </span>{" "}
                                        {props.handleDecrease && (
                                            <FontAwesomeIcon
                                                icon={faMinus}
                                                color="black"
                                                size="xs"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    props.handleDecrease(
                                                        medicine
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {medicine && price && (
                    <div className="d-flex flex-column align-items-center">
                        <p className="text-black-50 font-size-1 ml-2 mr-2">
                            <Translate id="general.price" />
                        </p>
                        <p>
                            <Translate id="general.price" />
                            <span> {price} ج.م</span>
                            {hasDiscount && (
                                <Badge>
                                    <Translate
                                        id="general.cashBack"
                                        data={{
                                            amount: medicine.discount_amount,
                                        }}
                                    />
                                </Badge>
                            )}
                            {/* <span className= {hasDiscount? "deleted":""}> {price} ج.م</span> */}
                            {/* {hasDiscount && <span> {priceAfterDiscount} ج.م</span>} */}
                        </p>
                    </div>
                )}
            </div>
            <div className="d-flex justify-content-end">
                {props.orderType == "attachment" &&
                    props.medicine.productform && (
                        <div>
                            <span className="font-size-1">
                                <Translate id="general.available" />
                            </span>
                            <Switch
                                disabled={hasAlternative}
                                checked={state.checkedB}
                                onChange={(e) =>
                                    handleChange(e, props.medicine)
                                }
                                color="primary"
                                name="checkedB"
                                inputProps={{
                                    "aria-label": "primary checkbox",
                                }}
                            />
                            {props.orderType == "attachment" &&
                                !state.checkedB &&
                                !hasAlternative && (
                                    <div
                                        onClick={toggle}
                                        className="font-size-1"
                                        style={{
                                            cursor: "pointer",
                                            textDecoration: "underline",
                                        }}
                                    >
                                        <Translate id="general.add_another_product" />
                                    </div>
                                )}
                        </div>
                    )}
            </div>
            {(props.orderType == "prepared" ||
                props.orderType == "attachment") &&
                medicine.note && (
                    <div className="d-flex mt-2">
                        <span className="text-black-50 font-size-1 ml-1 mr-1">
                            <Translate id="general.note" />
                        </span>
                        <span className="text-black-50 font-size-1">
                            {medicine.note}
                        </span>
                    </div>
                )}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}></ModalHeader>
                <ModalBody className="full-height">
                    <PrepareMedicineModal
                        handleCloseImagesModal={handleCloseImagesModal}
                        orderType={props.orderType}
                        item={itemClicked}
                        isAttachment={false}
                    />
                </ModalBody>
            </Modal>
        </div>
    );
}
