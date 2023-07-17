import apiClient, { api } from "../../utils/apiClient";
import * as unitActionTypes from "../actionTypes/unitActionTypes";
import axios from "axios";
// import AsyncStorage from '@react-native-community/async-storage';



export const getUnitsFailure = (error) => ({
  type: unitActionTypes.GET_UNITS_FAILURE,
  hasError: true,
  error,
});

export const getUnitsLoading = () => ({
  type: unitActionTypes.GET_UNITS_LOADING,
});

export const getUnitsSuccess = (payload) => ({
  type: unitActionTypes.GET_UNITS_SUCCESS,
  payload,
});


export function getUnits() {
  return (dispatch) => {
    dispatch(getUnitsLoading());
    apiClient
      .getUnits()
      .then((res) => {
        dispatch(getUnitsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getUnitsFailure(err.response));
      });
  };
}
