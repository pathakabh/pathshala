import axios from "../helpers/axios";
import { courseConstants } from "./constants";

// new action
const findAllCourses = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: courseConstants.GET_ALL_COURSES_REQUEST });
      const res = await axios.get(`course/findAll`);
      if (res.status === 200) {
        const { courses } = res.data;
        dispatch({
          type: courseConstants.GET_ALL_COURSES_SUCCESS,
          payload: { courses },
        });
      } else {
        dispatch({ type: courseConstants.GET_ALL_COURSES_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// modified actrion
export const addCourse = (form) => {
  return async (dispatch) => {
    console.log(form);
    try {
      dispatch({ type: courseConstants.ADD_COURSE_REQUEST });
      const res = await axios.post(`course/create`, form);
      if (res.status === 201) {
        dispatch({ type: courseConstants.ADD_COURSE_SUCCESS });
        dispatch(findAllCourses());
      } else {
        dispatch({ type: courseConstants.ADD_COURSE_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const UploadCourse = (form) => {
  return async (dispatch) => {
    console.log(form);
    try {
      dispatch({ type: courseConstants.ADD_COURSE_REQUEST });
      const res = await axios.post(`course/upload`, form);
      if (res.status === 201) {
        const { data } = res;
        const filename = data.filename;
       localStorage.setItem("filename",filename) ;
        console.log(res);
       
       
        
      } else {
        dispatch({ type: courseConstants.ADD_COURSE_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCourses= (form) => {
  return async dispatch => {
      dispatch({ type: courseConstants.UPDATE_COURSES_REQUEST });
      const res = await axios.post(`/course/update`, form);
      if (res.status === 201) {
          dispatch({ type: courseConstants.UPDATE_COURSES_SUCCESS });
          dispatch(findAllCourses());
      } else {
          const { error } = res.data;
          dispatch({
              type: courseConstants.UPDATE_COURSES_FAILURE,
              payload: { error }
          });
      }
  }
}

// new action
export const deleteCourseById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`course/deleteCourseById`, {
        data: { payload },
      });
      dispatch({ type: courseConstants.DELETE_COURSE_BY_ID_REQUEST });
      if (res.status === 202) {
        dispatch({ type: courseConstants.DELETE_COURSE_BY_ID_SUCCESS });
        dispatch(findAllCourses());
      } else {
        const { error } = res.data;
        dispatch({
          type: courseConstants.DELETE_COURSE_BY_ID_FAILURE,
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
  findAllCourses
}