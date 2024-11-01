import { defineStore } from "pinia";
import axios from "axios";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [],
  }),
  actions: {
    async loadOrders() {
      const results = await axios.post(
        "http://localhost:3000/get_order",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      this.orders = results.data;
    },
    async loadOrdersAdmin() {
      const results = await axios.post(
        "http://localhost:3000/get_all_order",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      this.orders = results.data;
    },
    async getOrderDetail(order_id) {
      const results = await axios.post(
        "http://localhost:3000/get_order_id",
        { order_id }
      );
      this.orders = results.data;
    },
    async updateOrderStatus(order_id, status) {
      await axios.post("http://localhost:3000/update_order_status", {
        order_id,
        status,
      });
    },
    async updateReview (order_id, reviewText, rating) {
      await axios.put("http://localhost:3000/update_review", {
        order_id,
        reviewText,
        rating
      });
      window.location.reload();
    }
  } 
});
