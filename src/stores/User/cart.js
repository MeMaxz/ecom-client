import { defineStore } from "pinia";
import axios from "axios";

Omise.setPublicKey("pkey_test_61mnub9r1w8ngqqs8qf");

const createSource = (paymentMethod, amount) => {
  return new Promise((resolve, reject) => {
    // ทำการส่ง source ที่ต้องการจ่ายไป omise เพื่อนำ source token กลับมา
    Omise.createSource(
      paymentMethod,
      {
        amount: amount * 100,
        currency: "THB",
      },
      (statusCode, response) => {
        if (statusCode !== 200) {
          return reject(response);
        }
        resolve(response);
      }
    );
  });
};

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  getters: {
    summeryPrice(state) {
      return state.items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },
    summeryQuantity(state) {
      return state.items.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);
    },
  },
  actions: {
    async loadCart() {
      try {
        const results = await axios.post(
          "http://localhost:3000/get_cart",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        results.data.forEach((item) => {
          item.imageUrl = `http://localhost:3000/${item.imageUrl}`;
        });
        this.items = results.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addToCart(product) {
      try {
        const res = await axios.post(
          "http://localhost:3000/add_to_cart",
          product,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        await this.loadCart();
      } catch (error) {
        console.error(error);
      }
    },
    async updateQuantity(product_id, quantity) {
      try {
        await axios.put(
          "http://localhost:3000/update_cart",
          {
            product_id,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        await this.loadCart();
      } catch (error) {
        console.error(error);
      }
    },
    async removeFromCart(product_id) {
      try {
        await axios.delete("http://localhost:3000/delete_cart", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          data: { product_id },
        });
        await this.loadCart();
      } catch (error) {
        console.error(error);
      }
    },
    async checkout(paymentMethod) {
      try {
        const source = await createSource(paymentMethod, this.summeryPrice);
        const results = await axios.post(
          "http://localhost:3000/insert_order",
          { source: source.id, total: this.summeryPrice },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        window.location.href = results.data.authorize_uri;
        await this.loadCart();
      } catch (error) {
        console.error(error);
      }
    },
  },
});
