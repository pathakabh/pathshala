import {
  initialDataConstants,
  categoryConstansts,
  productConstants,
  orderConstants,
  courseConstants,
  blogConstants,
  authorConstants
} from "./constants";
import axios from "../helpers/axios";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.post(`/initialData`);
    if (res.status === 200) {
      const { categories, products, orders,courses,coursesPublished,  authors,authorsPublished,blogs,blogsPublished } = res.data;
      dispatch({
        type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
      dispatch({
        type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
      dispatch({
        type: courseConstants.GET_ALL_COURSES_SUCCESS,
        payload: { courses },
      });
      dispatch({
        type: courseConstants.GET_ALL_COURSES_PUBLISHED_SUCCESS,
        payload: { coursesPublished },
      });
      dispatch({
        type: authorConstants.GET_ALL_AUTHORS_SUCCESS,
        payload: { authors },
      });
      dispatch({
        type: authorConstants.GET_ALL_AUTHORS_PUBLISHED_SUCCESS,
        payload: { authorsPublished },
      });
    
    dispatch({
      type: blogConstants.GET_ALL_BLOGS_SUCCESS,
      payload: { blogs },
    });
    dispatch({
      type: blogConstants.GET_ALL_BLOGS_PUBLISHED_SUCCESS,
      payload: { blogsPublished },
    });

    
  }
    console.log(res);
  };
};
