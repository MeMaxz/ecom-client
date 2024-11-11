<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";
import hero from "@/assets/hero.png";

import { useCartStore } from "@/stores/User/cart";

const cartStore = useCartStore();

onMounted(() => {
  const checkAuth = localStorage.getItem("token");
  if (!checkAuth) {
    return
  }
  cartStore.loadCart();
});
</script>

<template>
  <UserLayout>
    <section class="flex min-h-[calc(100vh-4rem)]">
      <!-- Hero Picture -->
      <img :src="hero" />
      <!-- Hero Text -->
      <div class="flex flex-col items-center justify-center w-full px-20">
        <div class="flex flex-col items-start justify-center m-10">
          <label class="font-itim text-2xl"
            >Address: 60-3 Tanon Sanamchan, Sanam Chan Sub-district, Mueang Nakhon Pathom District, Nakhon Pathom 73000</label
          >
          <label class="font-itim text-2xl mt-10"
            >Contact: 999-999-999</label
          >
        </div>
      </div>
    </section>
  </UserLayout>
</template>

<style scoped>
.stroke-custom {
  -webkit-text-stroke: 2px #8c52ff;
}
</style>
