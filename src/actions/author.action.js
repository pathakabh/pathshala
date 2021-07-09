import axios from "../helpers/axios";
import { authorConstants } from "./constants";

// new action
const findAllAuthors = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: authorConstants.GET_ALL_AUTHOR_REQUEST });
      const res = await axios.post(`author/findAll`);
      if (res.status === 200) {
        const { authors } = res.data;
        dispatch({
          type: authorConstants.GET_ALL_AUTHOR_SUCCESS,
          payload: { authors },
        });
      } else {
        dispatch({ type: authorConstants.GET_ALL_AUTHOR_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// modified actrion
export const addAuthor = (form) => {
    return async (dispatch) => {
      console.log(form);
      try {
        dispatch({ type: authorConstants.ADD_AUTHOR_REQUEST });
        const res = await axios.post(`author/create`, form);
        if (res.status === 201) {
          dispatch({ type: authorConstants.ADD_AUTHOR_SUCCESS });
          dispatch(findAllAuthors());
        } else {
          dispatch({ type: authorConstants.ADD_AUTHOR_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  export const updateAuthors= (form) => {
    return async dispatch => {
        dispatch({ type: authorConstants.UPDATE_AUTHOR_REQUEST });
        const res = await axios.post(`/author/update`, form);
        if (res.status === 201) {
            dispatch({ type: authorConstants.UPDATE_AUTHOR_SUCCESS });
            dispatch(findAllAuthors());
        } else {
            const { error } = res.data;
            dispatch({
                type: authorConstants.UPDATE_AUTHOR_FAILURE,
                payload: { error }
            });
        }
    }
  }
  
  // new action
  export const deleteAuthorById = (payload) => {
    return async (dispatch) => {
      try {
        const res = await axios.delete(`author/deleteAuthorById`, {
          data: { payload },
        });
        dispatch({ type: authorConstants.DELETE_AUTHOR_BY_ID_REQUEST });
        if (res.status === 202) {
          dispatch({ type: authorConstants.DELETE_AUTHOR_BY_ID_SUCCESS });
          dispatch(findAllAuthors());
        } else {
          const { error } = res.data;
          dispatch({
            type: authorConstants.DELETE_AUTHOR_BY_ID_FAILURE,
            payload: {
              error,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };


export{
    findAllAuthors
  }