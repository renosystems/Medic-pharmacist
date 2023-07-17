import React, { useState } from "react";
import { Translate } from "react-localize-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getLocalizedName } from "../utils/helper";

const OrderGeneralInfo = ({ order }) => {
   const [avatar,setAvatar]= useState(order.user.avatar);
   const onAvatarError = () => {
        setAvatar("");
    };
   return (
       <>
           <div className="text-right mr-2 text-black-50 font-size-2">
               <Translate id="general.userDetails" />
           </div>
           <div className="d-flex flex-row  justify-content-between ml-10">
               <div className="d-flex align-items-center">
                   <div className="ml-2">
                       {!avatar ? (
                           <FontAwesomeIcon
                               color="#6B4C8B"
                               size="2x"
                               icon={faUser}
                           />
                       ) : (
                           <div
                               className="rounded-circle border"
                               style={{ width: "50px", height: "50px", overflow: "hidden" }}
                           >
                               <img
                                   className="img-fluid"
                                   style={{objectFit:"cover"}}
                                   src={avatar}
                                   alt={`${order.user.first_name} ${order.user.last_name}`}
                                   onError={onAvatarError}

                               />
                           </div>
                       )}
                   </div>
                   <div className="user-info d-flex flex-column justify-content-center align-items-start">
                       <div>{`${order.user.first_name} ${order.user.last_name}`}</div>
                       <div>{order.user.username}</div>
                   </div>
               </div>

               {Object.keys(order).length !== 0 && (
                   <>
                       <div className="d-flex flex-column">
                           <div className="d-flex  align-items-center flex-row">
                               <div className="d-flex flex-column justify-content-center align-items-end">
                                   <div>
                                       <Translate id="general.orderDetails" />
                                   </div>
                                   <div>#{order.so_num}</div>
                                   <div
                                       style={{
                                           fontSize: "12px",
                                           color: "#797777",
                                           direction: "ltr",
                                       }}
                                   >
                                       <Moment format="DD/MM/YYYY hh:mm a">
                                           {order.created}
                                       </Moment>
                                   </div>
                               </div>
                               {order.read_at && (
                                   <div className="unread-sign mr-2 ml-2"></div>
                               )}
                           </div>
                           <div className="">
                               <span className="text-black-50 font-size-1">
                                   <Translate id="general.paymentWay" />
                               </span>{" "}
                               <span>
                                   {!order.payment_method && (
                                       <Translate id="general.cash" />
                                   )}
                                   {order.payment_method &&
                                       getLocalizedName(order.payment_method, {
                                           code: "ar",
                                       })}
                               </span>
                           </div>
                           <div>
                               <span className="text-black-50 font-size-1">
                                   <Translate id="general.ordersCount" />
                               </span>{" "}
                               <span>{order.order_items.length}</span>
                           </div>
                       </div>
                   </>
               )}
           </div>
       </>
   );
}


export default OrderGeneralInfo;