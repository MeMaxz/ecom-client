<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import AdminLayout from "@/layouts/AdminLayout.vue";

import { useOrderStore } from "@/stores/order";

const orderStore = useOrderStore();
const route = useRoute();

const update_status = (e) => {
  orderStore.updateOrderStatus(parseInt(route.params.id), e.target.value);
};

onMounted(() => {
  orderStore.getOrderDetail(parseInt(route.params.id)); // ดึงข้อมูล order ตาม order_id
});

</script>

<template>
  <AdminLayout>
    <div class="bg-white min-h-screen pt-4">
      <div v-for="order in orderStore.orders" class="shadow-xl p-8">
        <div class="flex">
          <div class="text-3xl font-bold">Order Detail No. #{{ order.order_id }}</div>
          <select @change="update_status" class="select select-bordered w-full max-w-xs ml-auto">
            <option disabled selected>{{ order.status }}</option>
            <option value="กำลังจัดส่ง">กำลังจัดส่ง</option>
            <option value="จัดส่งสำเร็จ">จัดส่งสำเร็จ</option>
          </select>
        </div>
        <div class="divider"></div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <div class="font-bold">Order date</div>
            <div>{{ order.create_at }}</div>
          </div>
          <div>
            <div class="font-bold">Rating</div>
            <div v-if="order.review">{{ order.rating }}/5</div>
            <div v-else>-</div>
          </div>
          <div>
            <div class="font-bold">Address</div>
            <div>{{ order.delivery_to }}</div>
          </div>
          <div>
            <div class="font-bold">Review</div>
            <div v-if="order.review">{{ order.reviewText }}</div>
            <div v-else>-</div>
          </div>
        </div>
        <div class="divider"></div>
        <div v-for="menu in order.menuItems" class="grid grid-cols-3 items-center">
          <div>
            <div class="font-bold">{{ menu.product_name }}</div>
            <div>{{ menu.detail }}</div>
          </div>
          <div class="mx-auto">{{ menu.quantity }} ชิ้น</div>
          <div class="ml-auto">฿ {{ menu.price * menu.quantity }}</div>
        </div>
        <div class="divider"></div>
        <div class="flex justify-between">
          <div>
            <div class="font-bold">Total</div>
          </div>
          <div>
            <div>฿ {{ order.total_amount }}</div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
