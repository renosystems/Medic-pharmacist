import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Translate } from "react-localize-redux";
import { Link } from "react-router-dom";
import { getLocalizedName } from "../utils/helper";

export default function RejectModal(props) {
  const { medicine, activeLanguage } = props;
  return (
    <div
      className="border d-flex align-items-center justify-content-center position-fixed h-100 w-100"
      style={{ top: 0, background: "rgba(0, 0, 0, 0.5)", right: 0, zIndex: 1 }}
    >
      <div className="d-flex h-100 justify-content-center align-items-center w-100">
        <div className="bg-white rounded d-flex justify-content-center w-100 m-4 flex-column align-items-center pt-5 pb-5 pl-4 pr-4">
          <FontAwesomeIcon
            color="#99C826"
            size="4x"
            icon={faExclamationTriangle}
          />
          <div className="font-size-1 pr-4 pt-3 pl-4">
            <span>
              <Translate id="general.deleteItemMsg1" />
            </span>
            <span>
              {" "}
              {`(${medicine.price} LE)  ${medicine.product_name} ${
                medicine.product_name_ar
              } [${medicine.size} * ${
                medicine.unit
                  ? getLocalizedName(medicine.unit, activeLanguage)
                  : "unit"
              }] #[${
                medicine.form
                  ? getLocalizedName(medicine.form, activeLanguage)
                  : "form"
              }]`}
            </span>
          </div>
          <div className="d-flex justify-content-center w-100">
            <button
              className="button-primary w-100 mt-3 rounded shadow-sm ml-2 mr-2"
              onClick={() => props.handleDelete(medicine)}
            >
              <Translate id="general.deleteItem" />
            </button>
            <button
              onClick={props.toggleDeleteModal}
              className="button-primary w-100 mt-3 rounded shadow-sm"
            >
              <Translate id="general.cancel" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
