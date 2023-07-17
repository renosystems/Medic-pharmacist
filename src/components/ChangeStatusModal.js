import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { Translate } from "react-localize-redux";
import Select from 'react-select'
import { Redirect } from "react-router-dom";

export default function RejectModal(props) {
    // handleChangeStatus
    const [status, setStatus] = useState("");
   
    function handleStatusChange(status) {
        setStatus(status)
        

    }
    const options = [{
        value: 4,
        label: "Cancel"
    }, {
        value: 6,
        label: "Ready For Shipping"
    }, {
        value: 7,
        label: "Out For Delivery"
    }, {
        value: 8,
        label: "Delivered"
    }, {
        value: 9,
        label: "Returned"
    }];
    return (
        <div className="border d-flex align-items-center justify-content-center position-fixed h-100 w-100" style={{ top: 0, background: 'rgba(0, 0, 0, 0.5)', right: 0, zIndex: 1 }}>
            <div className="d-flex h-100 justify-content-center align-items-center w-100">
                <div className="bg-white rounded d-flex justify-content-center w-100 m-4 flex-column align-items-center pt-5 pb-5 pl-4 pr-4">
                    <FontAwesomeIcon color="#99C826" size="4x" icon={faExclamationTriangle} />
                    <div className="d-flex justify-content-center w-100">
                        <Translate>
                            {({ translate }) =>
                                <Select
                                    placeholder={translate("general.selectStatus")}
                                    className="mt-2 select-2-wrapper w-100"
                                    options={options}
                                    isRtl={true}
                                    onChange={e => handleStatusChange(e.value)}
                                />
                            }
                        </Translate>
                    </div>

                    <div className="d-flex justify-content-center w-100">
                        <button onClick={() => props.handleChangeStatus(props.order, status)} className="button-primary w-100 mt-3 rounded shadow-sm ml-2 mr-2"><Translate id="general.changeOrderStatus" /></button>
                        <button onClick={props.toggleChangeStatusModal} className="button-primary w-100 mt-3 rounded shadow-sm"><Translate id="general.cancel" /></button>
                    </div>
                </div>
            </div>
           
        </div>
    )
}
