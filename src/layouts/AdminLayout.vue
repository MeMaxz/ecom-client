<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";

import { useAccountStore } from "@/stores/account";

const accountStore = useAccountStore();
const router = useRouter();
const route = useRoute();

const log = () => {
  console.log(route.name);
};

const menus = [
  {
    name: "Products",
    routeName: "adminProducts",
  },
  {
    name: "Orders",
    routeName: "adminOrders",
  },
];

const logout = () => {
  accountStore.logout();
  router.push({ name: "home" });
};
</script>

<template>
  <div class="drawer drawer-open">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <slot></slot>
    </div>
    <div class="drawer-side">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
        <li class="text-3xl font-bold mb-8">
          <button>Backoffice</button>
        </li>
        <li v-for="menu in menus">
          <RouterLink
            :to="{ name: menu.routeName }"
            class="text-lg"
            :class="{
              'bg-neutral text-neutral-content hover:text-black': route.name === menu.routeName,
            }"
            >{{ menu.name }}</RouterLink
          >
        </li>
        <li class="mt-auto">
          <button @click="logout" class="text-lg">Logout</button>
        </li>
      </ul>
    </div>
  </div>
</template>
