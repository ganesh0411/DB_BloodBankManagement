//SJSU CMPE 138 Spring2020 TEAM7
import axios from "axios";
import {
  AddEventUrl,
  GetAllEventsUrl,
  GetAllActiveEventsUrl,
  GetParticularEventUrl,
} from "../../utils/Constants";
import {
  startLoading,
  stopLoading,
  addSnackbar,
  addAllEvents,
  addAllActiveEvents,
} from "../../reducer/appReducer";
import { handleCatch } from "../../utils/utilityFunctions";

export const addEvent = (data, callback) => {
  return (dispatch, getState) => {
    dispatch(startLoading());

    return axios
      .post(AddEventUrl, data)
      .then((response) => {
        dispatch(
          addSnackbar({ success: true, error: "Event added successfully"}, dispatch)
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

export const updateEvent = (data, callback) => {
  return (dispatch, getState) => {
    dispatch(startLoading());

    return axios
      .put(AddEventUrl, data)
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

export const deleteEvent = (Drive_id, callback) => {
  return (dispatch, getState) => {
    dispatch(startLoading());

    return axios
      .delete(
        `${AddEventUrl}?Drive_id=${Drive_id}&Operator_id=${
          getState().auth.loginData.Operator_id
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

export const getParticularEventInfo = (Drive_id, callback) => {
  return (dispatch, getState) => {
    dispatch(startLoading());
    const url = GetAllEventsUrl.replace(
      ":operator_id",
      getState().auth.loginData.Operator_id
    );

    return axios
      .get(
        `${GetParticularEventUrl}?Operator_id=${
          getState().auth.loginData.Operator_id
        }&Drive_id=${Drive_id}`
      )
      .then((response) => {
        callback(response.data.entry);
        dispatch(stopLoading());
      })
      .catch((e) => {
        dispatch(stopLoading());
        handleCatch(e);
      });
  };
};

export const getAllEvents = () => {
  return (dispatch, getState) => {
    dispatch(startLoading());
    const url = GetAllEventsUrl.replace(
      ":operator_id",
      getState().auth.loginData.Operator_id
    );

    return axios
      .get(url)
      .then((response) => {
        dispatch(addAllEvents(response.data.eventList));
        dispatch(stopLoading());
      })
      .catch((e) => {
        dispatch(stopLoading());
        handleCatch(e);
      });
  };
};

export const getAllActiveEventsForGuest = () => {
  return (dispatch, getState) => {
    dispatch(startLoading());

    return axios
      .get(GetAllActiveEventsUrl)
      .then((response) => {
        dispatch(addAllActiveEvents(response.data.events));
        dispatch(stopLoading());
      })
      .catch((e) => {
        dispatch(stopLoading());
        handleCatch(e);
      });
  };
};
