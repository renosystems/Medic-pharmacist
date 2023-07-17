import apiClient, { api } from "../../utils/apiClient";
import * as orderActionTypes from "../actionTypes/ordersActionTypes";

export const getAllSuccess = (response, status = null) => {
  const { results, count } = response;
  return {
    type: orderActionTypes.GET_ORDERS_SUCCESS,
    payload: { orders: results, count, status },
  };
};




export const getAllFailure = (error) => ({
  type: orderActionTypes.GET_ORDERS_FAILURE,
  error,
});

export const addMedicinesToPendingCart = (
  medicinesList,
  resetMedicineList
) => ({
  type: orderActionTypes.ADD_MEDICINES_TO_PENDING_CART,
  payload: {
    medicinesList: medicinesList,
    resetMedicineList: resetMedicineList,
  },
});

export const getOrdersReset = (status) => ({
    type: orderActionTypes.GET_ORDERS_RESET,
    payload: { status },
});

export const getOrdersLoading = (page, limit, status) => ({
  type: orderActionTypes.GET_ORDERS_LOADING,
  payload: { page, limit, status },
});

export const getOrderLoading = () => ({
  type: orderActionTypes.GET_ORDER_LOADING,
});

export const getorderFailure = (error) => ({
  type: orderActionTypes.GET_ORDER_FAILURE,
  error,
});

export const getOrderSuccess = (order) => {
  return {
    type: orderActionTypes.GET_ORDER_SUCCESS,
    order: order,
  };
};

export const deleteOrderFailure = (error) => ({
  type: orderActionTypes.DELETE_ORDER_FAILURE,
  error,
});
export const deleteOrderReset = () => ({
  type: orderActionTypes.DELETE_ORDER,
});
export const deleteOrderSuccess = () => ({
  type: orderActionTypes.DELETE_ORDER_SUCCESS,
});

export const OrderFailure = (error) => ({
  type: orderActionTypes.ORDER_FAILURE,
  error,
});
export const OrderLoading = () => ({
  type: orderActionTypes.ORDER_LOADING,
});



export const addMedicinesToUserCartSuccess = () => ({
  type: orderActionTypes.ADD_MEDICINES_TO_USER_CART_SUCCESS,
});

export const statusChanged = () => ({
  type: orderActionTypes.ORDER_STATUS_CHANGED,
});


export const increaseQuantity = (medicine) => {
  return {
    type: orderActionTypes.INCRESE_QUANTITY,
   payload:medicine
  };
};


export const decreaseQuantity = (medicine) => {
  return {
    type: orderActionTypes.DECREASE_QUANTITY,
   payload:medicine
  };
};


export const addMedicinesToAttachments = (medicinesList, resetFlag = false) => {
  console.log(medicinesList);
  return (dispatch) => {
    dispatch(addMedicinesToPendingCart(medicinesList, resetFlag));
  };
};

export const addMedicinesToUserCart = (order_id, medicinesList) => {
  return (dispatch) => {
    apiClient
      .addToUserCart(order_id, medicinesList)
      .then(() => {
        dispatch(addMedicinesToUserCartSuccess());
        dispatch(statusChanged());
        dispatch(getAllOrders({ status: 2 }));
      })
      .catch((err) => {
        dispatch(OrderFailure(err));
      });
  };
};


export function sendComment(order_id,comment) {
  return (dispatch) => {
    console.log(comment)
    dispatch(sendCommentAction(order_id,comment))
    apiClient.postComment(order_id,comment)
    
  }
  }
  
  export const sendCommentAction = (order_id,comment) => ({
    type: orderActionTypes.SEND_COMMENT,
    payload:{
      order_id:order_id,
      comment:comment
  
    }
  });
export const deleteorder = (order) => {
  return (dispatch) => {
    dispatch(deleteOrderReset());
    apiClient
      .deleteorder(order)
      .then(() => {
        // dispatch(getAll());
        dispatch(deleteOrderSuccess());
      })
      .catch((e) => {
        dispatch(deleteOrderFailure(e.response.data));
      });
  };
};

export function getAllOrders(params) {
  return (dispatch) => {
    const { page, limit, status } = params;
    dispatch(getOrdersLoading(page, limit, status));
    apiClient
      .getAllOrders(params)
      .then((res) => {
        dispatch(getAllSuccess(res.data, status));
      })
      .catch((err) => {
        dispatch(getAllFailure(err.response));
      });
  };
}

export function changeOrderStatus(order, status, rejectionReason = null) {
  return (dispatch) => {
    dispatch(getOrdersLoading(1, 10, status));
    apiClient
      .changeOrderStatus(order.id, status, rejectionReason)
      .then((res) => {
        dispatch(statusChanged());
        if (status != 10) {
          dispatch(getOrder(order.id, status));
        }
        dispatch(getAllOrders({ page: 1, limit: 10, status: 2 }));
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(OrderFailure(err.response.data));
        }
      });
  };
}

export function setOrder(order) {
  return (dispatch) => {
    dispatch(getOrderSuccess(order));
  };
}
export function getOrder(order, status = null) {
  // console.log(32552,status);
  return (dispatch) => {
    dispatch(getOrderLoading());
    apiClient
      .getOrder(order, status)
      .then((res) => {
        if (res.data) {
          dispatch(getOrderSuccess(res.data));
        }
      })
      .catch((err) => {
        console.log("err", err);
        // dispatch(getorderFailure(err.response.data));
      });
  };
}

// export function changeQuantity(order_id,medicine){

// apiClient.updateQuantity(order_id,medicine.quantity)

// }

// export function decreaseQuantityCall(order_id,medicine){
//   return (dispatch)=>{
//     // dispatch(decreaseQuantity(medicine))
//   apiClient.updateQuantity(order_id,medicine.quantity)
  
//   }
//   }

