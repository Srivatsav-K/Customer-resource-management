import axios from "axios";
import { toast } from "react-toastify";
//--------------------------------------------------------------------------
export const PRODUCTS_LOADING_TRUE = "PRODUCTS_LOADING_TRUE";
export const PRODUCTS_LOADING_FALSE = "PRODUCTS_LOADING_FALSE";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";
export const CLEAR_PRODUCT_DETAILS = "CLEAR_PRODUCT_DETAILS";
export const UPDATE_PRODUCT_DETAILS = "UPDATE_PRODUCT_DETAILS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
//---------------------------------------------------------------------------
const loadingTrue = () => {
  return { type: PRODUCTS_LOADING_TRUE };
};
const loadingFalse = () => {
  return { type: PRODUCTS_LOADING_FALSE };
};
const getProducts = (data) => {
  return { type: GET_PRODUCTS, payload: data };
};
const createProduct = (data) => {
  return { type: CREATE_PRODUCT, payload: data };
};
const getProductDetails = (data) => {
  return { type: GET_PRODUCT_DETAILS, payload: data };
};
export const clearProductDetails = () => {
  return { type: CLEAR_PRODUCT_DETAILS };
};
const updateProductDetails = (data) => {
  return { type: UPDATE_PRODUCT_DETAILS, payload: data };
};
const deleteProduct = (data) => {
  return { type: DELETE_PRODUCT, payload: data };
};

//----------------------------------------------------------------------------
export const startGetProducts = () => {
  return (dispatch) => {
    dispatch(loadingTrue());
    axios
      .get("/api/products", {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const result = response.data;
        dispatch(getProducts(result));
      })
      .catch((err) => {
        toast.error(err.message);
        dispatch(loadingFalse());
      });
  };
};

//helper
const serverErrorHelper = (errors) => {
  const fieldErrors = {};
  for (let key in errors) {
    fieldErrors[key] = errors[key].message;
  }
  return fieldErrors;
};

export const startCreateProduct = (formData, resetForm, setErrors) => {
  return (dispatch) => {
    dispatch(loadingTrue());
    axios
      .post("/api/products", formData, {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch(loadingFalse());
        const result = response.data;
        if (result.errors) {
          if (result.errors.notice) {
            toast.error(result.errors.notice);
          } else {
            setErrors(serverErrorHelper(result.errors));
          }
        } else {
          dispatch(createProduct(result));
          resetForm();
          toast.success("Product created!");
        }
      })
      .catch((err) => {
        toast.error(err.message);
        dispatch(loadingFalse());
      });
  };
};

export const startGetProductDetails = (path) => {
  return (dispatch) => {
    dispatch(loadingTrue());
    axios
      .get(`/api/${path}`, {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch(loadingFalse());
        const result = response.data;
        if (result.errors) {
          toast.error(result.errors);
        } else {
          dispatch(getProductDetails(result));
        }
      })
      .catch((err) => {
        dispatch(loadingFalse());
        toast.error(err.message);
      });
  };
};

export const startUpdateProductDetails = (
  _id,
  formData,
  setErrors,
  history
) => {
  return (dispatch) => {
    axios
      .put(`/api/products/${_id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.errors) {
          setErrors(serverErrorHelper(result.errors));
        } else {
          dispatch(updateProductDetails(result));
          toast.success("Updated successfully!");
          history.push("/user/products");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
};

export const startDeleteProduct = (_id) => {
  return (dispatch) => {
    axios
      .delete(`/api/products/${_id}`, {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.errors) {
          toast.error(result.errors.message);
        } else {
          dispatch(deleteProduct(result));
          toast.success("Deleted Successfully!");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
};
