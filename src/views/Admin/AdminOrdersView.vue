<script setup>
import { RouterLink } from "vue-router";
import { onMounted } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

import { useOrderStore } from "@/stores/order";

const orderStore = useOrderStore();

onMounted(() => {
  orderStore.loadOrdersAdmin();
});
</script>

<template>
  <AdminLayout>
    <div class="bg-white min-h-screen">
        <div class="text-3xl font-bold p-6 px-10">Order</div>
      <div class="overflow-y-auto px-10">
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>Customer Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orderStore.orders">
              <th>{{ index + 1 }}</th>
              <td>{{ order.customerName }}</td>
              <td>฿ {{ order.total_amount }}</td>
              <td>
                {{ order.status }}
              </td>
              <td>{{ order.create_at }}</td>
              <td>
                <RouterLink :to="{ name: 'adminOrderDetail', params: { id: order.order_id } }" class="btn btn-neutral btn-sm">Show detail</RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>
