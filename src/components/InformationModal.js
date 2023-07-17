import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Translate } from "react-localize-redux";
import { Link } from 'react-router-dom';

export default function InformationModal(props) {
    return (
        <div className="border d-flex align-items-center justify-content-center position-fixed h-100 w-100" style={{ top: 0, background: 'rgba(0, 0, 0, 0.5)', right: 0 }}>
            <div className="d-flex h-100 justify-content-center align-items-center w-100">
                <div className="bg-white rounded d-flex justify-content-center w-100 m-4 flex-column align-items-center pt-5 pb-5 pl-4 pr-4">
                    <FontAwesomeIcon color="#99C826" size="4x" icon={faCheckCircle} />
                    <span className="font-size-1 pr-4 pt-3 pl-4"><Translate id="general.orderSentMsg" /></span>
                    <Link className="w-100 d-block" to="/">
                        <button className="button-primary w-100 mt-3 rounded shadow-sm"><Translate id="general.continue" /></button>
                    </Link>


                </div>
            </div>

        </div>
    )
}
