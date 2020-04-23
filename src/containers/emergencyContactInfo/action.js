import axios from "axios";
import {
  AddEmergencyContactUrl,
  UpdateEmergencyContactUrl,
  DeleteEmergencyContactUrl,
  GetAllEmergencyContactOfDonorUrl,
  GetParticularEmergencyContactOfDonorUrl,
} from "../../utils/Constants";
import {
  startLoading,
  stopLoading,
  addSnackbar,
  addEmergencyContactList,
} from "../../reducer/appReducer";
import { handleCatch } from "../../utils/utilityFunctions";

export const addEmergencyContact = (data, callback) => {
  return (dispatch, getState) => {
    dispatch(startLoading());

    return axios
      .post(`${AddEmergencyContactUrl}`, data)
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

export const updateEmergencyContact = (data, callback) => {
  return (dispatch, getState) => {
    dispatch(startLoading());

    return axios
      .put(`${UpdateEmergencyContactUrl}`, data)
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

export const deleteEmergencyContact = (data, callback) => {
  return (dispatch, getState) => {
    dispatch(startLoading());

    return axios
      .delete(
        `${DeleteEmergencyContactUrl}?Phone_no=${data.Phone_no}&Donor_id=${
          data.Donor_id
        }&Operator_id=${getState().auth.loginData.Operator_id}&Bbank_id=${
          data.Bbank_id || getState().auth.loginData.Bbank_id
        }`
      )
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

export const getAllDonorEmergencyContacts = (Donor_id) => {
  return (dispatch, getState) => {
    dispatch(startLoading());

    return axios
      .get(`${GetAllEmergencyContactOfDonorUrl}?Donor_id=${Donor_id}`)
      .then((response) => {
        dispatch(addEmergencyContactList(response.data.contact_list));
        dispatch(stopLoading());
      })
      .catch((e) => {
        dispatch(stopLoading());
        handleCatch(e);
      });
  };
};

export const getEmergencyContactInfo = (data, callback) => {
  return (dispatch, getState) => {
    dispatch(startLoading());

    return axios
      .get(
        `${GetParticularEmergencyContactOfDonorUrl}?Donor_id=${data.Donor_id}&Phone_no=${data.Phone_no}`
      )
      .then((response) => {
        callback && callback(response.data.entry);

        dispatch(stopLoading());
      })
      .catch((e) => {
        dispatch(stopLoading());
        handleCatch(e);
      });
  };
};
