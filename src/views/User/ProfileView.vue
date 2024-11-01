<script setup>
import { ref, onMounted } from "vue";
import UserLayout from "@/layouts/UserLayout.vue";

import { useOrderStore } from "@/stores/order";
import { useAccountStore } from "@/stores/account";

const orderStore = useOrderStore();
const accountStore = useAccountStore();

const profile = ref({
  firstName: accountStore.user.name,
  lastName: accountStore.user.lastname,
  username: accountStore.user.username,
  email: accountStore.user.email,
  phoneNumber: accountStore.user.phone,
  secondaryPhone: accountStore.user.phone2,
  address: accountStore.user.address,
});
const reviewDialog = ref([]);
const copyProfile = ref({ ...profile.value });
const selectedRating = ref(1);
const reviewText = ref("");

const editProfile = () => {
  profile.value = { ...copyProfile.value };
  console.log(profile.value);
  accountStore.editProfile(profile.value);
};

const openReviewDialog = (index) => {
  reviewDialog.value[index].showModal();
};

const submitReview = (order_id, index) => {
  orderStore.updateReview(order_id, reviewText.value, selectedRating.value);
  reviewText.value = "";
  selectedRating.value = 1;
  reviewDialog.value[index].close();
};

onMounted(() => {
  orderStore.loadOrders();
});
</script>

<template>
  <UserLayout>
    <div class="flex min-h-[calc(100vh-4rem)]">
      <!-- Profile Section -->
      <div class="w-1/2 p-6">
        <h2 class="text-2xl font-itim text-center mb-4">ข้อมูลส่วนตัว</h2>
        <div class="w-full p-6 bg-white rounded-lg">
          <table
            class="table font-itim text-lg w-full border-separate border-spacing-0"
          >
            <tbody>
              <tr>
                <td class="font-medium">ชื่อ</td>
                <td>{{ profile.firstName }}</td>
              </tr>
              <tr>
                <td class="font-medium">นามสกุล</td>
                <td>{{ profile.lastName }}</td>
              </tr>
              <tr>
                <td class="font-medium">ชื่อผู้ใช้</td>
                <td>{{ profile.username }}</td>
              </tr>
              <tr>
                <td class="font-medium">อีเมล</td>
                <td>{{ profile.email }}</td>
              </tr>
              <tr>
                <td class="font-medium">เบอร์โทร</td>
                <td>{{ profile.phoneNumber }}</td>
              </tr>
              <tr>
                <td class="font-medium">เบอร์โทรสำรอง</td>
                <td>{{ profile.secondaryPhone }}</td>
              </tr>
              <tr>
                <td class="font-medium">ที่อยู่</td>
                <td>{{ profile.address }}</td>
              </tr>
            </tbody>
          </table>
          <button
            class="btn btn-neutral my-5 font-itim text-lg font-normal"
            onclick="profileDialog.showModal()"
          >
            แก้ไขข้อมูล
          </button>
          <dialog id="profileDialog" class="modal">
            <div
              class="flex flex-col max-w-2xl mx-auto p-10 shadow-xl bg-white rounded-lg"
            >
              <form @submit.prevent="editProfile">
                <div class="flex w-full my-1 gap-4">
                  <div class="flex flex-col w-full">
                    <div class="mx-auto">
                      <p class="text-lg font-itim text-start">
                        Username
                        <span class="text-sm opacity-50">(แก้ไขไม่ได้)</span>
                      </p>
                      <input
                        type="text"
                        readonly
                        v-model="profile.username"
                        class="input input-bordered min-w-72 font-itim"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col w-full">
                    <div class="mx-auto">
                      <p class="text-lg font-itim">
                        Email
                        <span class="text-sm opacity-50">(แก้ไขไม่ได้)</span>
                      </p>
                      <input
                        type="email"
                        readonly
                        v-model="profile.email"
                        class="input input-bordered min-w-72 font-itim"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex w-full my-1 gap-4">
                  <div class="flex flex-col w-full">
                    <div class="mx-auto">
                      <p class="text-lg font-itim text-start">ชื่อ</p>
                      <input
                        type="text"
                        v-model="copyProfile.firstName"
                        class="input input-bordered min-w-72 font-itim"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col w-full">
                    <div class="mx-auto">
                      <p class="text-lg font-itim">นามสกุล</p>
                      <input
                        type="text"
                        v-model="copyProfile.lastName"
                        class="input input-bordered min-w-72 font-itim"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex w-full my-1 gap-4">
                  <div class="flex flex-col w-full">
                    <div class="mx-auto">
                      <p class="text-lg font-itim text-start">เบอร์ติดต่อ</p>
                      <input
                        type="text"
                        v-model="copyProfile.phoneNumber"
                        class="input input-bordered min-w-72 font-itim"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col w-full">
                    <div class="mx-auto">
                      <p class="text-lg">เบอร์ติดต่อสำรอง</p>
                      <input
                        type="text font-itim"
                        v-model="copyProfile.secondaryPhone"
                        class="input input-bordered min-w-72 font-itim"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex w-full my-1">
                  <div class="w-full">
                    <div class="mx-auto">
                      <p class="text-lg font-itim">ที่อยู่จัดส่ง</p>
                      <textarea
                        v-model="copyProfile.address"
                        class="textarea textarea-bordered w-full resize-none font-itim text-lg"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="flex justify-center w-full my-4 gap-4">
                  <form method="dialog">
                    <button
                      type="submit"
                      class="btn btn-error font-light font-itim text-lg"
                    >
                      ยกเลิก
                    </button>
                  </form>
                  <button
                    type="submit"
                    onclick="profileDialog.close()"
                    class="btn btn-success font-light font-itim text-lg"
                  >
                    บันทึก
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>

      <!-- Order History Section -->
      <div class="w-1/2 p-6 rounded-lg">
        <h2 class="text-2xl font-itim text-center mb-4">ประวัติการสั่งซื้อ</h2>
        <div class="overflow-y-auto max-h-[calc(100vh-10rem)]">
          <div
            v-for="(order, index) in orderStore.orders"
            class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
          >
            <input type="checkbox" />
            <div class="collapse-title text-lg font-itim">
              รายการคำสั่งซื้อ #{{ order.order_id }}
              <div class="badge badge-neutral ml-2">{{ order.status }}</div>
            </div>
            <div class="collapse-content font-itim">
              <table class="table font-itim text-lg">
                <tbody>
                  <tr v-for="menu in order.menuItems">
                    <td class="w-10">x{{ menu.quantity }}</td>
                    <td>
                      <div>
                        <div class="">{{ menu.product_name }}</div>
                        <div class="text-sm opacity-50">{{ menu.detail }}</div>
                      </div>
                    </td>
                    <td class="text-end">฿ {{ menu.price }}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>ราคารวม</td>
                    <td class="text-end">฿ {{ order.total_amount }}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td class="text-sm opacity-50">{{ order.create_at }}</td>
                    <td v-if="!order.review" class="text-end">
                      <button
                        :disabled="order.status !== 'จัดส่งสำเร็จ'"
                        class="btn btn-neutral btn-sm font-light w-20"
                        @click="openReviewDialog(index)"
                      >
                        รีวิว
                      </button>
                      <dialog ref="reviewDialog" class="modal">
                        <div
                          class="flex flex-col items-center modal-box bg-white"
                        >
                          <h1 class="font-itim text-3xl">ให้คะแนนและคำติชม</h1>
                          <div class="rating rating-lg gap-1 my-5">
                            <input
                              type="radio"
                              class="mask mask-heart bg-red-400"
                              :value="1"
                              v-model="selectedRating"
                            />
                            <input
                              type="radio"
                              class="mask mask-heart bg-orange-400"
                              :value="2"
                              v-model="selectedRating"
                            />
                            <input
                              type="radio"
                              class="mask mask-heart bg-yellow-400"
                              :value="3"
                              v-model="selectedRating"
                            />
                            <input
                              type="radio"
                              class="mask mask-heart bg-lime-400"
                              :value="4"
                              v-model="selectedRating"
                            />
                            <input
                              type="radio"
                              class="mask mask-heart bg-green-400"
                              :value="5"
                              v-model="selectedRating"
                            />
                          </div>
                          <textarea
                            v-model="reviewText"
                            class="textarea textarea-bordered w-64 h-32 resize-none"
                          ></textarea>
                          <button
                            @click="submitReview(order.order_id, index)"
                            class="btn btn-neutral font-light my-5 w-32"
                          >
                            ยืนยัน
                          </button>
                        </div>
                      </dialog>
                    </td>
                    <td v-else-if="order.review" class="text-end">
                      <div class="rating gap-1">
                        <input
                          type="radio"
                          name="rating-3"
                          class="mask mask-heart bg-red-400"
                          :checked="order.rating >= 1"
                          disabled
                        />
                        <input
                          type="radio"
                          name="rating-3"
                          class="mask mask-heart bg-orange-400"
                          :checked="order.rating >= 2"
                          disabled
                        />
                        <input
                          type="radio"
                          name="rating-3"
                          class="mask mask-heart bg-yellow-400"
                          :checked="order.rating >= 3"
                          disabled
                        />
                        <input
                          type="radio"
                          name="rating-3"
                          class="mask mask-heart bg-lime-400"
                          :checked="order.rating >= 4"
                          disabled
                        />
                        <input
                          type="radio"
                          name="rating-3"
                          class="mask mask-heart bg-green-400"
                          :checked="order.rating >= 5"
                          disabled
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>

<style scoped>
.table td {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}
</style>
