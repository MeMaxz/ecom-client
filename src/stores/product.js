import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
  }),
  actions: {
    async loadAdminProducts() {
      try {
        const results = await axios.get("http://localhost:3000/admin_products");
        this.products = results.data;
      } catch (error) {
        console.error(error);
      }
    },
    async loadProducts() {
      try {
        const results = await axios.get("http://localhost:3000/products");
        this.products = results.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getProduct(product_id) {
      try {
        const results = await axios.post(`http://localhost:3000/get_item`, {
          product_id,
        });
        return results.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addProduct(product) {
      try {
        await axios.post(
          "http://localhost:3000/insert_item",
          product,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        await this.loadProducts();
      } catch (error) {
        console.error(error);
      }
    },
    async updateProduct(product) {
      try {
        await axios.put(
          `http://localhost:3000/update_item`,
          product,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        await this.loadProducts();
      } catch (error) {
        console.error(error);
      }
    },
    async removeProduct(product_id) {
      try {
        await axios.delete(`http://localhost:3000/delete_item`, { data: { product_id } });
        await this.loadProducts();
      } catch (error) {
        console.error(error);
      }
    },
    searchProducts(searchName) {
      return this.products.filter((product) =>
        product.name.toLowerCase().includes(searchName.toLowerCase())
      );
    },
    filterProducts(category, price) {
      return this.products.filter((product) => {
        if (category === "ทุกประเภท") {
          return product.price >= price[0] && product.price <= price[1];
        }
        return (
          product.category === category &&
          product.price >= price[0] &&
          product.price <= price[1]
        );
      });
    },
  },
});
