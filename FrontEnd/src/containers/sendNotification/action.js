//SJSU CMPE 138 Spring2020 TEAM7
import axios from "axios";
import { SendNotificationUrl } from "../../utils/Constants";
import {
  startLoading,
  stopLoading,
  addSnackbar,
} from "../../reducer/appReducer";
import { handleCatch } from "../../utils/utilityFunctions";

export const sendNotificationRequest = (data, callback) => {
  return (dispatch, getState) => {
    dispatch(startLoading());
    const url = SendNotificationUrl.replace(
      ":operator_id",
      getState().auth.loginData.Operator_id
    );

    return axios
      .post(url, data)
      .then((response) => {
        dispatch(
          addSnackbar({ success: true, error: response.data.message }, dispatch)
        );
        dispatch(stopLoading());
        callback && callback();
      })
      .catch((e) => {
        dispatch(stopLoading());
        handleCatch(e);
      });
  };
};
