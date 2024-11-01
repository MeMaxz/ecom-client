<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";

import { useCartStore } from "@/stores/User/cart";

const cartStore = useCartStore();

defineProps({
  products: Array,
});

const detailDialog = ref([]);
const detailText = ref("");

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const openDetailDialog = (index) => {
  detailDialog.value[index].showModal();
};

const closeDetailDialog = (index) => {
  detailText.value = "";
  detailDialog.value[index].close();
};

const addToCart = (index, product) => {
  const checkAuth = localStorage.getItem("token");
  if (!checkAuth) {
    Toast.fire({
      icon: "error",
      title: "กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าลงตะกร้า",
    });
    closeDetailDialog(index);
    return;
  }
  const { name, price, imageUrl, category, status, updatedAt, ...newProduct } =
    product;
  newProduct.detail = detailText.value;
  newProduct.quantity = 1;

  cartStore.addToCart(newProduct);
  closeDetailDialog(index);
};
</script>

<template>
  <div
    v-for="(product, index) in products"
    class="flex flex-col items-center gap-y-3"
  >
    <img :src="product.imageUrl" class="w-64 h-64 object-cover rounded-lg" />
    <button
      @click="openDetailDialog(index)"
      class="btn bg-white flex justify-center rounded-full"
    >
      <h2 class="font-itim text-lg text-[#8c52ff] font-normal">
        {{ product.name }}
        <span class="text-[#00bf63]">{{ product.price }}฿</span>
      </h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 550 550"
        fill="currentColor"
        class="h-6 w-8 opacity-70"
      >
        <path
          d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
        />
      </svg>
    </button>
    <dialog ref="detailDialog" class="modal">
      <div class="modal-box w-full max-w-lg font-itim">
        <h3 class="text-2xl font-bold text-center mb-4">{{ product.name }}</h3>
        <img
          :src="product.imageUrl"
          class="w-64 h-64 object-cover rounded-lg mx-auto mb-4"
        />
        <p class="text-lg text-center text-gray-600 mb-4">
          ราคา: {{ product.price }}฿
        </p>

        <!-- Textarea for Product Details -->
        <textarea
          v-model="detailText"
          placeholder="กรอกรายละเอียดสินค้า เช่น หวาน 75% ใส่นมเยอะๆ"
          class="textarea textarea-bordered w-full h-32 text-lg resize-none p-3 rounded-lg"
        ></textarea>

        <!-- Submit Button -->
        <button
          @click="addToCart(index, product)"
          class="btn btn-success w-full mt-4 font-itim font-light text-lg"
        >
          เพิ่มเข้ารายการสินค้า
        </button>
      </div>
    </dialog>
  </div>
</template>
