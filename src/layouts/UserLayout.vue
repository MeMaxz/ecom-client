<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { useCartStore } from "@/stores/User/cart";
import { useAccountStore } from "@/stores/account";

const cartStore = useCartStore();
const accountStore = useAccountStore();
const router = useRouter();

const searchText = ref("");

const handleSearch = (event) => {
  if (event.key === "Enter") {
    router.push({ name: "products", query: { search: searchText.value } });
  }
};

const logout = () => {
  accountStore.logout();
  window.location.reload();
};

</script>

<template>
  <div class="navbar bg-gradient-to-r from-[#5170ff]/35 to-[#ff66c4]/35">
    <div class="flex-none px-10">
      <RouterLink :to="{ name: 'home' }" class="btn btn-ghost text-xl logo">
      </RouterLink>
    </div>
    <div class="flex-1 justify-around">
      <!-- Search -->
      <div class="form-control">
        <p class="input input-bordered flex items-center">
          <input
            type="text"
            placeholder="Search"
            class="grow w-96 font-itim"
            v-model="searchText"
            @keyup="handleSearch"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            fill="currentColor"
            class="h-8 w-8 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </p>
      </div>
      <!-- Home -->
      <RouterLink :to="{ name: 'home' }">
        <button class="btn w-40 rounded-full font-itim">Home</button>
      </RouterLink>
      <!-- Menu -->
      <RouterLink :to="{ name: 'products' }">
        <button class="btn w-40 rounded-full font-itim">Menu</button>
      </RouterLink>
      <!-- About -->
      <RouterLink :to="{ name: 'about' }">
        <button class="btn w-40 rounded-full font-itim">About</button>
      </RouterLink>
      <!-- Login -->
      <RouterLink v-if="!accountStore.isLoggedIn" :to="{ name: 'login' }">
        <button class="btn bg-[#8c8ed8] text-white w-40 rounded-full font-itim">
          Login
        </button>
      </RouterLink>
      <div v-else>
        <RouterLink :to="{ name: 'cart' }"
          ><div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span class="badge badge-sm indicator-item">{{
                cartStore.summeryQuantity
              }}</span>
            </div>
          </div>
        </RouterLink>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="h-5 w-5"
              >
                <path
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                />
              </svg>
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <RouterLink :to="{ name: 'profile' }">
                <button class="justify-between">Profile</button></RouterLink
              >
            </li>
            <li><button @click="logout">Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <slot></slot>
</template>

<style scoped>
.logo {
  background-image: url(@/assets/11.png);
  background-size: cover;
  background-position: center;
  width: 100px;
}
</style>
