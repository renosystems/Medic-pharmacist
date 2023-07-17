import apiClient, { api } from "../../utils/apiClient";
import * as productsActionTypes from "../actionTypes/productsActionTypes";

export const getAllSuccess = response => {
  const {results, count} = response;
  return {
    type: productsActionTypes.GET_PRODUCTS_SUCCESS,
    payload: {products: results, count},
  };
};
export const getAllMainSuccess = response => {
  const {results, count} = response;
  return {
    type: productsActionTypes.GET_MAIN_PRODUCTS_SUCCESS,
    payload: {products: results, count},
  };
};
export const getAllFailure = (error) => ({
  type: productsActionTypes.GET_PRODUCTS_FAILURE,
  error,
});

export const getAllMainFailure = (error) => ({
  type: productsActionTypes.GET_MAIN_PRODUCTS_FAILURE,
  error,
});


export const getAllMainProductsLoading = (page,limit) => ({
  type: productsActionTypes.GET_MAIN_PRODUCTS_LOADING,
  payload: {page, limit},
});
export const getAllProductsLoading = (page,limit) => ({
  type: productsActionTypes.GET_PRODUCTS_LOADING,
  payload: {page, limit},
});


export const setProducts = (product)=>({
  type: productsActionTypes.RESET_PRODUCTS,
  payload : {product:product}
})

export const setProductSuccess = (product)=>({
  type: productsActionTypes.SET_PRODUCT_SUCCESS,
  payload: { product },
})

export const setProductLoading = ()=>({
  type: productsActionTypes.SET_PRODUCT_LOADING,
})
export const setProductFailure = (error)=>({
  type: productsActionTypes.SET_PRODUCT_FAILURE,
  hasError: true,
  error
})

export const setProductFormSuccess = (product)=>({
  type: productsActionTypes.SET_PRODUCT_SUCCESS,
  payload: { product },
})

export const setProductFormLoading = ()=>({
  type: productsActionTypes.SET_PRODUCT_LOADING,
})
export const setProductFormFailure = (error)=>({
  type: productsActionTypes.SET_PRODUCT_FAILURE,
  hasError: true,
  error
})


export function getAllProducts(search) {
  return (dispatch) => {
    dispatch(getAllProductsLoading());
    const {s} = search
    apiClient
      .getProducts(s)
      .then((res) => {
        dispatch(getAllSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getAllFailure(err.response));
      });
  };
}

export function getAllMainProducts(search) {
  return (dispatch) => {
    dispatch(getAllProductsLoading());
    const {s} = search
    apiClient
      .getMainProducts(s)
      .then((res) => {
        dispatch(getAllSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getAllFailure(err.response));
      });
  };
}

export function setProduct(data) {
  return (dispatch) => {
    dispatch(setProductLoading());
    apiClient
      .setProduct(data)
      .then((res) => {
        dispatch(setProductSuccess(res.data));
        //dispatch(getUsers());
      })
      .catch((err) => {
        dispatch(setProductFailure(err.response.data));
      });
  };
}

export function setProductForm(data) {
  return (dispatch) => {
    dispatch(setProductFormLoading());
    apiClient
      .setProductForm(data)
      .then((res) => {
        dispatch(setProductFormSuccess(res.data));
        //dispatch(getUsers());
      })
      .catch((err) => {
        dispatch(setProductFailure(err.response.data));
      });
  };
}