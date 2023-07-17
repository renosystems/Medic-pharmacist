import * as orderActionTypes from "../actionTypes/ordersActionTypes";
import { getUniqueArray } from "../../utils/helper";
import * as CONSTANTS from "../../constants";

const initialState = {
  pendingOrdersList: {
    isLoaded: false,
    hasError: false,
    isLoading: false,
    ended: false,
    total_expected: 0,
    page: 1,
    limit: 1,
    count: 0,
    orders: [],
  },
  readyOrdersList: {
    isLoaded: false,
    hasError: false,
    isLoading: false,
    ended: false,
    total_expected: 0,
    page: 1,
    limit: 1,
    count: 0,
    orders: [],
  },

  previousOrdersList: {
    isLoaded: false,
    hasError: false,
    isLoading: false,
    ended: false,
    total_expected: 0,
    page: 1,
    limit: 1,
    count: 0,
    orders: [],
  },
  activeOrdersList: {
    isLoaded: false,
    hasError: false,
    isLoading: false,
    ended: false,
    total_expected: 0,
    page: 1,
    limit: 1,
    count: 0,
    orders: [],
  },

  orderDetails: {
    isLoaded: false,
    hasError: false,
    isLoading: false,
    order: {},
    comment:"",
    error: null,
  },
  isLoading: false,
  error: null,
  hasError: false,
  medicinesList: [],
  reviewed: false,
  changed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {


    //////////////////////////////
    case orderActionTypes.INCRESE_QUANTITY:
      let  increasedMedcineList = state.medicinesList.map(item => {
        if (item.productform.id === action.payload.id) {
          return {...item, quantity: item.quantity+1}
        };
        return item;
      });
      state = {
          ...state,
          medicinesList: increasedMedcineList
         }
      break;


      case orderActionTypes.DECREASE_QUANTITY:
      let  decreasedMedcineList = state.medicinesList.map(item => {
        if (item.productform.id === action.payload.id) {
          return {...item, quantity: item.quantity<= 1?  item.quantity : item.quantity-1}
        };
        return item;
      });
      state = {
          ...state,
          medicinesList: decreasedMedcineList
         }
      break;



      case orderActionTypes.GET_ORDERS_SUCCESS:
          const { orders = [], count, status } = action.payload;
          let ended = false;
          if (status == CONSTANTS.ORDERS_STATUS_PENDING) {
              const total_expected = Math.ceil(
                  count / state.pendingOrdersList.limit
              );
              if (state.pendingOrdersList.page == total_expected) {
                  ended = true;
              }
              let pendingOrdersList = [
                  ...state.pendingOrdersList.orders,
                  ...orders,
              ];

              state = {
                  ...state,
                  pendingOrdersList: {
                      ...state.pendingOrdersList,

                      isLoaded: true,
                      hasError: false,
                      isLoading: false,
                      ended: ended,
                      total_expected: total_expected,
                      count: action.payload.count,
                      orders: pendingOrdersList,
                  },
              };
          } else if (status == CONSTANTS.ORDERS_STATUS_READY) {
              const total_expected = Math.ceil(
                  count / state.readyOrdersList.limit
              );
              if (state.readyOrdersList.page == total_expected) {
                  ended = true;
              }
              let readyOrdersList = [
                  ...state.readyOrdersList.orders,
                  ...orders,
              ];

              state = {
                  ...state,
                  readyOrdersList: {
                      ...state.readyOrdersList,
                      isLoaded: true,
                      hasError: false,
                      isLoading: false,
                      ended: ended,
                      total_expected: total_expected,
                      count: action.payload.count,
                      orders: readyOrdersList,
                  },
              };
          } else if (status == CONSTANTS.ORDERS_STATUS_PREVIOUS) {
              const total_expected = Math.ceil(
                  count / state.previousOrdersList.limit
              );
              if (state.previousOrdersList.page == total_expected) {
                  ended = true;
              }
              let previousOrdersList = [
                  ...state.previousOrdersList.orders,
                  ...orders,
              ];

              state = {
                  ...state,
                  previousOrdersList: {
                      ...state.previousOrdersList,
                      isLoaded: true,
                      hasError: false,
                      isLoading: false,
                      ended: ended,
                      total_expected: total_expected,
                      count: action.payload.count,
                      orders: previousOrdersList,
                  },
              };
          } else if (status == CONSTANTS.ORDERS_STATUS_ACTIVE) {
              const total_expected = Math.ceil(
                  count / state.activeOrdersList.limit
              );
              if (state.activeOrdersList.page == total_expected) {
                  ended = true;
              }
              let activeOrdersList = [
                  //   ...state.activeOrdersList.orders,
                  ...orders,
              ];

              state = {
                  ...state,
                  activeOrdersList: {
                      ...state.activeOrdersList,
                      isLoaded: true,
                      hasError: false,
                      isLoading: false,
                      ended: ended,
                      total_expected: total_expected,
                      count: action.payload.count,
                      orders: activeOrdersList,
                  },
              };
          }

          break;
      case orderActionTypes.ORDER_STATUS_CHANGED:
          state = {
              ...state,
              changed: true,
              pendingOrdersList: {
                  isLoaded: false,
                  hasError: false,
                  isLoading: false,
                  ended: false,
                  total_expected: 0,
                  page: 1,
                  limit: 1,
                  count: 0,
                  orders: [],
              },
              readyOrdersList: {
                  isLoaded: false,
                  hasError: false,
                  isLoading: false,
                  ended: false,
                  total_expected: 0,
                  page: 1,
                  limit: 1,
                  count: 0,
                  orders: [],
              },
          };
          break;
      case orderActionTypes.GET_ORDERS_RESET:
           if (action.payload.status == CONSTANTS.ORDERS_STATUS_PENDING) {
               state = {
                   ...state,
                   changed: false,
                   pendingOrdersList: {
                    ...initialState.pendingOrdersList
                   },
               };
           } else if (action.payload.status == CONSTANTS.ORDERS_STATUS_READY) {
               state = {
                   ...state,
                   changed: false,
                   readyOrdersList: {
                       ...initialState.readyOrdersList,
                   },
               };
           } else if (action.payload.status == CONSTANTS.ORDERS_STATUS_PREVIOUS) {
               state = {
                   ...state,
                   changed: false,
                   previousOrdersList: {
                       ...initialState.previousOrdersList,
                   },
               };
           } else if (action.payload.status == CONSTANTS.ORDERS_STATUS_ACTIVE) {
               state = {
                   ...state,
                   changed: false,
                   activeOrdersList: {
                       ...initialState.activeOrdersList,
                   },
               };
           }
      break;
      case orderActionTypes.GET_ORDERS_LOADING:
          const { page, limit } = action.payload;
          if (action.payload.status == CONSTANTS.ORDERS_STATUS_PENDING) {
              state = {
                  ...state,
                  changed: false,
                  pendingOrdersList: {
                      ...state.pendingOrdersList,
                      isLoaded: false,
                      hasError: false,
                      isLoading: true,
                      page: page,
                      limit: limit,
                  },
              };
          } else if (action.payload.status == CONSTANTS.ORDERS_STATUS_READY) {
              state = {
                  ...state,
                  changed: false,
                  readyOrdersList: {
                      ...state.readyOrdersList,
                      isLoaded: false,
                      hasError: false,
                      isLoading: true,
                      page: page,
                      limit: limit,
                  },
              };
          } else if (action.payload.status == CONSTANTS.ORDERS_STATUS_PREVIOUS) {
              state = {
                  ...state,
                  changed: false,
                  previousOrdersList: {
                      ...state.previousOrdersList,
                      isLoaded: false,
                      hasError: false,
                      isLoading: true,
                      page: page,
                      limit: limit,
                  },
              };
          } else if (action.payload.status == CONSTANTS.ORDERS_STATUS_ACTIVE) {
              state = {
                  ...state,
                  changed: false,
                  activeOrdersList: {
                      ...state.activeOrdersList,
                      isLoaded: false,
                      hasError: false,
                      isLoading: true,
                      page: page,
                      limit: limit,
                  },
              };
          }
          break;
      case orderActionTypes.GET_ORDERS_FAILURE:
          state = {
              ...state,
              isLoaded: false,
              hasError: true,
              isLoading: false,
              error: action.error,
          };
          break;
      case orderActionTypes.GET_ORDER_SUCCESS:
          const order = action.order;
          let orderItemsList = [];
          if (
              order.status == CONSTANTS.ORDERS_STATUS_PENDING ||
              (order.status == 14 && order.order_items.length > 0)
          ) {
              order.order_items.map((item, index) => {
                  if (item.status != 5) {
                      item.available = true;
                  }
                  if (item.itemtype != 3) {
                      orderItemsList.push(item);
                  }
              });
          }
          state = {
              ...state,
              orderDetails: {
                  isLoaded: true,
                  hasError: false,
                  isLoading: false,
                  order: action.order,
              },
              medicinesList: [...orderItemsList],
          };
          break;
      case orderActionTypes.GET_ORDER_LOADING:
          state = {
              ...state,
              changed: false,
              orderDetails: {
                  isLoaded: false,
                  hasError: false,
                  isLoading: true,
                  order: {},
              },
          };
          break;
      case orderActionTypes.GET_ORDER_FAILURE:
          state = {
              ...state,
              orderDetails: {
                  isLoaded: false,
                  hasError: true,
                  isLoading: false,
                  sheet: null,
                  error: action.error,
              },
          };
          break;

      case orderActionTypes.ADD_MEDICINES_TO_PENDING_CART:
          let { medicinesList = [], resetMedicineList = false } =
              action.payload;
          let previousMedicines = [...state.medicinesList];
          var valueArr = medicinesList.map(function (item) {
              return item.id;
          });
          valueArr.map(function (item, idx) {
              let itemIndex = previousMedicines.findIndex(
                  (i) =>
                      (i.productform && i.productform.id == item) ||
                      i.id == item
              );
              if (itemIndex != -1) {
                  previousMedicines[itemIndex].quantity =
                      medicinesList[idx].quantity;
              }
          });
          if (!resetMedicineList) {
              medicinesList = getUniqueArray(
                  [...previousMedicines, ...medicinesList],
                  ["id"]
              );
          }
          state = {
              ...state,
              medicinesList: medicinesList,
          };
          break;

      case orderActionTypes.ADD_MEDICINES_TO_USER_CART_SUCCESS:
          state = {
              ...state,
              medicinesList: [],
              orderDetails: {
                  isLoaded: false,
                  hasError: false,
                  isLoading: false,
                  order: {},
              },

              reviewed: true,
          };
          break;

      case orderActionTypes.ORDER_FAILURE:
          state = {
              isLoading: false,
              hasError: true,
              error: action.error,
          };
          break;

      case orderActionTypes.ORDER_LOADING:
          state = {
              changed: false,
              isLoading: true,
          };
          break;

      case orderActionTypes.DELETE_ORDER:
          state = {
              ...state,
              delete: {
                  deleteError: false,
                  deleteSuccess: false,
              },
          };
          break;
      case orderActionTypes.DELETE_ORDER_FAILURE:
          state = {
              ...state,
              delete: {
                  deleteError: true,
                  deleteSuccess: false,
              },
          };
          break;
      case orderActionTypes.DELETE_ORDER_SUCCESS:
          state = {
              ...state,
              delete: {
                  deleteError: false,
                  deleteSuccess: true,
              },
          };
          break;
      case orderActionTypes.SEND_COMMENT:
    state = {
      ...state,
      orderDetails: {
        isLoaded: false,
        hasError: false,
        isLoading: false,
        order: {},
        comment:action.payload.comment,
        error: null,
      }
  
    };
    break;
      default:
          return state;
  }
  return state;
};
