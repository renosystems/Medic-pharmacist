import axios from "axios";
//const API_URL = "http://admin.getmedic.co/";
// const API_URL = 'http://3.250.213.85/';
// const API_URL = 'http://52.50.193.242'; //dev
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  var API_URL = "http://54.229.114.61";
} else if (process.env.NODE_ENV === "production") {
  var API_URL = "https://api.getmedic.co";
}

//live
// var API_URL = "http://54.229.114.61"; // "http://52.50.193.242";
const headers = {
  Accept: `application/json`,
  // "Content-Type": "multipart/form-data"
};

const token = localStorage.getItem("token");
if (token) {
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
export const api = axios.create({
  baseURL: API_URL,
  timeout: 0,
  headers: headers,
});

if (token) {
  api.defaults.headers.common["Authorization"] = `Token ${token}`;
}

const apiClient = {
  login(username, password) {
    return api.post("login", { username, password });
  },
  getAllOrders({
    page = 1,
    limit = 10,
    field = "created",
    order = "DESC",
    status,
  }) {
    return api.get("orders", {
      params: {
        page,
        limit,
        order,
        field,
        status,
      },
    });
  },
  getOrder(orderId, status = null) {
    let params = {};
    if (status) {
      params = { status };
    }
    return api.get(`orders/${orderId}`, {
      params: params,
    });
  },
  getProducts(s, page = 1, limit = 100) {
    return api.get("product-forms", {
      params: {
        page,
        limit,
        s,
      },
    });
  },
  getMainProducts(s, page = 1, limit = 100) {
    return api.get("products", {
      params: {
        page,
        limit,
        s,
      },
    });
  },
  changeOrderStatus(order_id, status, rejectionReason = null) {
    return api.patch(`order/${order_id}/change-status`, {
      status: status,
      rejection_reason: rejectionReason,
    });
  },

  getPromo(id) {
    return api.get(`promocodes/${id}`, {});
  },
  addToUserCart(order_id, productList) {
    return api.post(`orders/${order_id}/addItems`, { items_set: productList });
  },
  getCompanies() {
    return api.get(`companies?field=name&limit=100&order=ASC&page=1`);
  },
  getCategories() {
    return api.get(`categories?field=name&limit=100&order=ASC&page=1`);
  },
  getUnits() {
    return api.get(`units?field=name&limit=100&order=ASC&page=1`);
  },
  setProduct(product) {
    return api.post(`/products`, product);
  },
  setProductForm(productForm) {
    return api.post(`/product-forms`, productForm);
  },
  getForms() {
    return api.get(`/forms?field=name&limit=100&order=ASC&page=1`);
  },
  postComment(order_id, comment) {
    return api.post(`/prescription-comment`, {
      order_id: order_id,
      comment: comment,
    });
  },
};

export default apiClient;
