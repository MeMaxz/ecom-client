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
    <section class="flex">
      <!-- Hero Picture -->
      <img :src="hero" class="w-1/3" />
      <!-- Hero Text -->
      <div class="flex flex-col items-center justify-center w-full px-20">
        <div class="text-9xl text-[#8c52ff] font-bold font-futura">
          WELCOME TO
        </div>
        <div
          class="text-9xl self-end text-transparent stroke-custom font-futura"
        >
          DUI CAFE
        </div>
        <div class="flex flex-col items-center justify-center m-10">
          <label class="font-itim text-2xl"
            >เรามุ่งมั่นสร้างประสบการณ์ที่น่าประทับใจกับของหวานและเครื่องดื่ม</label
          >
          <label class="font-itim text-2xl"
            >ตั้งแต่บรรยากาศอบอุ่นไปจนถึงบริการที่พิถีพิถัน</label
          >
          <label class="font-itim text-2xl"
            >เพื่อให้ทุกช่วงเวลาของคุณมีความสุข</label
          >
        </div>
        <RouterLink :to="{ name: 'products' }"
          ><button
            class="btn rounded-full bg-gradient-to-r from-[#5170ff] to-[#ff66c4] w-80 h-20 text-white text-5xl font-itim"
          >
            สั่งเลย!
          </button>
        </RouterLink>
      </div>
    </section>
  </UserLayout>
</template>

<style scoped>
.stroke-custom {
  -webkit-text-stroke: 2px #8c52ff;
}
</style>
