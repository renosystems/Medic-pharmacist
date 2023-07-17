import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Translate } from "react-localize-redux";
import Select from "react-select";

export default function RejectModal(props) {
  const [rejectionRejection, setRejectionReason] = useState(null);
  function handleRejectionReasonChange(rejectionRejection) {
    setRejectionReason(rejectionRejection);
  }
  const options = [
    {
      value: 4,
      label: "Cancel",
    },
    {
      value: 6,
      label: "Ready For Shipping",
    },
    {
      value: 7,
      label: "Out For Delivery",
    },
    {
      value: 8,
      label: "Delivered",
    },
    {
      value: 9,
      label: "Returned",
    },
  ];
  const rejection_options = [
    {
      value: "برجاء ارسال روشتة مرفقة مع الطلب",
      label: "برجاء ارسال روشتة مرفقة مع الطلب",
    },
    {
      value: "دواء غير متوفر بالاسواق", 
      label: "دواء غير متوفر بالاسواق",
    },
    {
      value: "الحد الأدنى للطلب ، 50 جنيه", 
      label: "الحد الأدنى للطلب ، 50 جنيه",
    },
  ];

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
              <Translate id="general.rejectOrderMsg1" />
            </span>
            <span> {props.orderNo} </span>
            <span>
              <Translate id="general.rejectOrderMsg2" />
            </span>
            <span> {props.userName} </span>
            <span>
              <Translate id="general.rejectOrderMsg3" />
            </span>
          </div>
          {/* <div className="d-flex justify-content-center w-100">
                        <Translate>
                            {({ translate }) =>
                                <Select
                                    placeholder={translate("general.selectStatus")}
                                    className="mt-2 select-2-wrapper w-100"
                                    options={options}
                                    isRtl={true}
                                    onChange={e => handleNoteChange(e.value)}
                                />
                            }
                        </Translate> 
                    </div> */}
          <div className="d-flex justify-content-center w-100">
            <Translate>
              {({ translate }) => (
                <Select
                  placeholder={translate("general.rejectionReason")}
                  className="mt-2 select-2-wrapper w-100"
                  options={rejection_options}
                  isRtl={true}
                  onChange={(e) => handleRejectionReasonChange(e.value)}
                />
              )}
            </Translate>
          </div>
          <div className="d-flex justify-content-center w-100">
            <button
              onClick={() =>
                props.handleReject(props.order, rejectionRejection)
              }
              className="button-primary w-100 mt-3 rounded shadow-sm ml-2 mr-2"
            >
              <Translate id="general.rejectOrder" />
            </button>
            <button
              onClick={props.toggleRejectModal}
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
