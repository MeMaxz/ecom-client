<script setup>
import { ref, watch, onMounted } from "vue";
import Swal from "sweetalert2";

import UserLayout from "@/layouts/UserLayout.vue";

import { useCartStore } from "@/stores/User/cart";
import { useAccountStore } from "@/stores/account";

const cartStore = useCartStore();
const accountStore = useAccountStore();

const discount = ref(0);
const discountCode = ref("");
const checkoutDialog = ref(null);

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

const selectBank = (bankname) => {
  const address = accountStore.user.address;
  const firstName = accountStore.user.name;
  const lastName = accountStore.user.lastname;
  const phone = accountStore.user.phone;
  if (!address && !firstName && !lastName && !phone) {
    Toast.fire({
      icon: "error",
      title: "กรุณากรอกข้อมูลส่วนตัวก่อนชำระเงิน",
    });
    checkoutDialog.value.close();
    return;
  }
  cartStore.checkout(bankname);
  checkoutDialog.value.close();
};

watch([() => cartStore.summeryPrice, discountCode], ([newPrice, newCode]) => {
  if (newCode === "DUICAFE") {
    discount.value = newPrice * 0.1;
  } else {
    discount.value = 0;
  }
});

onMounted(() => {
  cartStore.loadCart();
});
</script>

<template>
  <UserLayout>
    <div class="flex my-screen">
      <section class="w-full">
        <div class="overflow-y-auto w-full p-5 min-h-[calc(100vh-22rem)]">
          <table class="table font-itim">
            <!-- head -->
            <thead>
              <tr>
                <th>Menu</th>
                <th class="text-center">Quality</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cartStore.items">
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle h-12 w-12">
                        <img :src="item.imageUrl" />
                      </div>
                    </div>
                    <div>
                      <div class="">{{ item.name }}</div>
                      <div class="text-sm opacity-50">{{ item.detail }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="flex justify-center items-center gap-3">
                    <!-- minus -->
                    <button
                      @click="
                        cartStore.updateQuantity(
                          item.product_id,
                          item.quantity - 1
                        )
                      "
                      :disabled="item.quantity <= 1"
                      class="btn btn-circle btn-outline btn-xs hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        fill="currentColor"
                        class="h-4 w-4"
                      >
                        <path
                          d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
                        />
                      </svg>
                    </button>
                    <!-- quantity -->
                    <input
                      type="text"
                      v-model="item.quantity"
                      readonly
                      class="input input-bordered w-14 input-sm max-w-xs text-center"
                    />
                    <!-- plus -->
                    <button
                      @click="
                        cartStore.updateQuantity(
                          item.product_id,
                          item.quantity + 1
                        )
                      "
                      class="btn btn-circle btn-outline btn-xs hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        fill="currentColor"
                        class="h-4 w-4"
                      >
                        <path
                          d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td>฿ {{ item.price * item.quantity }}</td>
                <td>
                  <!-- trash -->
                  <button
                    @click="cartStore.removeFromCart(item.product_id)"
                    class="btn btn-ghost btn-circle btn-xs"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      class="h-5 w-5"
                    >
                      <path
                        d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-end px-32 py-4 w-full">
          <div class="flex flex-col items-start">
            <p class="font-itim">โค้ดโปรโมชั่น</p>

            <input
              type="text"
              class="input input-bordered w-48 font-itim"
              placeholder="โค้ดโปรโมชั่น"
              v-model="discountCode"
            />
            <table class="table font-itim mt-2">
              <tbody>
                <tr>
                  <td class="px-0">ราคาสินค้า</td>
                  <td class="px-0 text-end">฿ {{ cartStore.summeryPrice }}</td>
                </tr>
                <tr>
                  <td class="px-0">ส่วนลด</td>
                  <td class="px-0 text-end">฿ {{ discount }}</td>
                </tr>
                <tr>
                  <td class="px-0">รวมทั้งสิ้น</td>
                  <td class="px-0 text-end">
                    ฿ {{ cartStore.summeryPrice - discount }}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onclick="checkout.showModal()"
              class="btn btn-neutral w-full"
            >
              ชำระเงิน
            </button>

            <dialog ref="checkoutDialog" id="checkout" class="modal">
              <div class="modal-box w-full max-w-lg font-itim">
                <form method="dialog">
                  <button
                    onclick="checkout.close()"
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  >
                    ✕
                  </button>
                </form>
                <h3 class="text-2xl font-medium text-center">
                  เลือกธนาคารสำหรับ Mobile Banking
                </h3>

                <div class="mt-4 space-y-4">
                  <!-- Bangkok Bank -->
                  <button
                    @click="selectBank('mobile_banking_bbl')"
                    class="flex items-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src="https://f.ptcdn.info/801/022/000/1409170288-b60f8c1e0e-o.png"
                      alt="ธนาคารกรุงเทพ"
                      class="w-10 h-10 mr-4 rounded-lg"
                    />
                    <span class="text-lg font-medium">ธนาคารกรุงเทพ</span>
                  </button>

                  <!-- KBank -->
                  <button
                    @click="selectBank('mobile_banking_kbank')"
                    class="flex items-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src="https://i.pinimg.com/originals/66/3b/5e/663b5ede3b55beaee63bf3100db21f25.png"
                      alt="ธนาคารกสิกรไทย"
                      class="w-10 h-10 mr-4 rounded-lg"
                    />
                    <span class="text-lg font-medium">ธนาคารกสิกรไทย</span>
                  </button>

                  <!-- Krungthai Bank -->
                  <button
                    @click="selectBank('mobile_banking_ktb')"
                    class="flex items-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src="https://images-storage.thaiware.site/software/2021_04/thumbnails/6891_210428165242r6.jpg"
                      alt="ธนาคารกรุงไทย"
                      class="w-10 h-10 mr-4 rounded-lg"
                    />
                    <span class="text-lg font-medium">ธนาคารกรุงไทย</span>
                  </button>

                  <!-- SCB -->
                  <button
                    @click="selectBank('mobile_banking_scb')"
                    class="flex items-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src="https://companieslogo.com/img/orig/SCB.BK-478d8e61.png?t=1720244493"
                      alt="ธนาคารไทยพาณิชย์"
                      class="w-10 h-10 mr-4 rounded-lg"
                    />
                    <span class="text-lg font-medium">ธนาคารไทยพาณิชย์</span>
                  </button>

                  <!-- Krungsri -->
                  <button
                    @click="selectBank('mobile_banking_ktb')"
                    class="flex items-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src="https://play-lh.googleusercontent.com/QBIi36TIcm0gqESKCsElaJN-mMs844EMw009YbdvtXWmIWs0ZJT7YSwjyJE72QGk3Es"
                      alt="ธนาคารกรุงศรีอยุธยา"
                      class="w-10 h-10 mr-4 rounded-lg"
                    />
                    <span class="text-lg font-medium">ธนาคารกรุงศรีอยุธยา</span>
                  </button>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </section>
    </div>
  </UserLayout>
</template>

<style scoped>
.my-screen {
  min-height: calc(100vh - 4rem);
}
</style>
