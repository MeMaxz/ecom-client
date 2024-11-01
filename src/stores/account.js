import axios from "axios";

import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
  state: () => ({
    isLoggedIn: false,
    isAdmin: false,
    user: {},
  }),
  actions: {
    async checkAuth() {
      return new Promise(async (resolve) => {
        const token = localStorage.getItem("token");
        if (!token) {
          resolve(false);
          return;
        }
        const headers = { Authorization: `Bearer ${token}` };
        try {
          const userInfos = await axios.post(
            "http://localhost:3000/user_info",
            {},
            { headers }
          );
          if (userInfos.data.role === "admin") {
            this.isAdmin = true;
          }
          this.isLoggedIn = true;
          this.user = userInfos.data;
          resolve(true);
        } catch (error) {
          resolve(false);
          console.log(error);
        }
      });
    },
    async login(userData) {
      try {
        const results = await axios.post(
          "http://localhost:3000/login",
          userData
        );
        if (results.data.message !== "Login success") {
          this.isLoggedIn = false;
          return;
        }
        const token = results.data.token;
        localStorage.setItem("token", token);

        const headers = { Authorization: `Bearer ${token}` };
        const userInfos = await axios.post(
          "http://localhost:3000/user_info",
          {},
          { headers }
        );
        if (userInfos.data.role === "admin") {
          this.isAdmin = true;
        }
        this.isLoggedIn = true;
        this.user = userInfos.data;
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.user = {};
      localStorage.removeItem("token");
    },
    async editProfile(userData) {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const results = await axios.post(
          "http://localhost:3000/edit_profile",
          userData,
          { headers }
        );
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  },
});
