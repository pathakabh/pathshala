import axios from "../helpers/axios";
import { curriculumConstants } from "./constants";

// new action
const findAllCurriculums = (course_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: curriculumConstants.GET_ALL_CURRICULUMS_REQUEST });
      const res = await axios.get(`curriculum/findAll?course_id=${course_id}`);
      if (res.status === 200) {
        console.log(res.data);
        const { curriculums } = res.data;
        dispatch({
          type: curriculumConstants.GET_ALL_CURRICULUMS_SUCCESS,
          payload: { curriculums },
        });
      } else {
        dispatch({ type: curriculumConstants.GET_ALL_CURRICULUMS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const findOneCurriculums = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: curriculumConstants.GET_ONE_CURRICULUMS_REQUEST });
      const res = await axios.get(`curriculum/findOne?_id=${_id}`);
      if (res.status === 200) {
        console.log(res.data);
        const { curriculumList } = res.data;
        const lessionResources =  curriculumList.map((curriculum, index) => (
          curriculum.lessionResources
        ))
        
        dispatch({
          type: curriculumConstants.GET_ONE_CURRICULUMS_SUCCESS,
          payload: { curriculumList,lessionResources },
        });
      } else {
        dispatch({ type: curriculumConstants.GET_ONE_CURRICULUMS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// modified actrion
export const addCurriculum = (form) => {
  return async (dispatch) => {
    console.log(form);
    try {
      dispatch({ type: curriculumConstants.ADD_CURRICULUM_REQUEST });
      const res = await axios.post(`curriculum/create`, form);
      if (res.status === 201) {
        dispatch({ type: curriculumConstants.ADD_CURRICULUM_SUCCESS });
       // dispatch(findAllCurriculums(form.course));
      } else {
        dispatch({ type: curriculumConstants.ADD_CURRICULUM_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const UploadDocument = (form) => {
  return async (dispatch) => {
   // console.log(form);
    try {
      dispatch({ type: curriculumConstants.ADD_CURRICULUM_REQUEST });
      const res = await axios.post(`curriculum/upload`, form);
      if (res.status === 201) {
      //   const { data } = res;
      //   const filename = data.filename;
      //  localStorage.setItem("filename",filename) ;
      //   console.log(res);
      //  dispatch(findOneCurriculums(form._id));
       
        
      } else {
        dispatch({ type: curriculumConstants.ADD_CURRICULUM_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const UploadDocumentDelete = (payload) => {
  return async (dispatch) => {
    console.log("doc delete "+ JSON.stringify( payload));
    try {
      dispatch({ type: curriculumConstants.ADD_CURRICULUM_REQUEST });
      const res = await axios.delete(`curriculum/uploaddelete`, {
        data:{payload},
      });
      if (res.status === 202) {
      //   const { data } = res;
      //   const filename = data.filename;
      //  localStorage.setItem("filename",filename) ;
         console.log(res);
        dispatch(findOneCurriculums(payload.course_id));
       
        
      } else {
        dispatch({ type: curriculumConstants.ADD_CURRICULUM_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCurriculums= (form) => {
  return async dispatch => {
      dispatch({ type: curriculumConstants.UPDATE_CURRICULUMS_REQUEST });
      const res = await axios.post(`/curriculum/update`, form);
      if (res.status === 201) {
          dispatch({ type: curriculumConstants.UPDATE_CURRICULUMS_SUCCESS });
         // dispatch(findAllCurriculums(form.course));
      } else {
          const { error } = res.data;
          dispatch({
              type: curriculumConstants.UPDATE_CURRICULUMS_FAILURE,
              payload: { error }
          });
      }
  }
}

// new action
export const deleteCurriculumById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`curriculum/deleteCurriculumById`, {
        data: { payload },
      });
      dispatch({ type: curriculumConstants.DELETE_CURRICULUM_BY_ID_REQUEST });
      if (res.status === 202) {
        dispatch({ type: curriculumConstants.DELETE_CURRICULUM_BY_ID_SUCCESS });
        dispatch(findAllCurriculums());
      } else {
        const { error } = res.data;
        dispatch({
          type: curriculumConstants.DELETE_CURRICULUM_BY_ID_FAILURE,
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
  findAllCurriculums
}