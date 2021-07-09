import axios from "../helpers/axios";
import { blogConstants } from "./constants";

// new action
const findAllBlogs = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: blogConstants.GET_ALL_BLOGS_REQUEST });
      const res = await axios.get(`blog/findAll`);
      if (res.status === 200) {
        const { blogs } = res.data;
        dispatch({
          type: blogConstants.GET_ALL_BLOGS_SUCCESS,
          payload: { blogs },
        });
      } else {
        dispatch({ type: blogConstants.GET_ALL_BLOGS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// modified actrion
export const addBlog = (form) => {
  return async (dispatch) => {
    console.log(form);
    try {
      dispatch({ type: blogConstants.ADD_BLOG_REQUEST });
      const res = await axios.post(`blog/create`, form);
      if (res.status === 201) {
        dispatch({ type: blogConstants.ADD_BLOG_SUCCESS });
        dispatch(findAllBlogs());
      } else {
        dispatch({ type: blogConstants.ADD_BLOG_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const UploadBlog= (form) => {
  return async (dispatch) => {
    console.log(form);
    try {
      dispatch({ type: blogConstants.ADD_BLOG_REQUEST });
      const res = await axios.post(`blog/upload`, form);
      if (res.status === 201) {
        const { data } = res;
        const filename = data.filename;
       localStorage.setItem("filename",filename) ;
        console.log(res);
       
       
        
      } else {
        dispatch({ type: blogConstants.ADD_COURSE_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};


export const updateBlogs= (form) => {
  return async dispatch => {
      dispatch({ type: blogConstants.UPDATE_BLOGS_REQUEST });
      const res = await axios.post(`/blog/update`, form);
      if (res.status === 201) {
          dispatch({ type: blogConstants.UPDATE_BLOGS_SUCCESS });
          dispatch(findAllBlogs());
      } else {
          const { error } = res.data;
          dispatch({
              type: blogConstants.UPDATE_BLOGS_FAILURE,
              payload: { error }
          });
      }
  }
}

// new action
export const deleteBlogById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`blog/deleteBlogById`, {
        data: { payload },
      });
      dispatch({ type: blogConstants.DELETE_BLOG_BY_ID_REQUEST });
      if (res.status === 202) {
        dispatch({ type: blogConstants.DELETE_BLOG_BY_ID_SUCCESS });
        dispatch(findAllBlogs());
      } else {
        const { error } = res.data;
        dispatch({
          type: blogConstants.DELETE_BLOG_BY_ID_FAILURE,
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
  findAllBlogs
}