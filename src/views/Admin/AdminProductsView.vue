<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

import { useProductStore } from "@/stores/product";

const productStore = useProductStore();

onMounted(() => {
  productStore.loadAdminProducts();
});
</script>

<template>
  <AdminLayout>
    <div class="bg-white min-h-screen">
      <div class="flex items-center justify-between p-4 px-10">
        <div class="text-3xl font-bold">Product</div>
        <RouterLink
          :to="{ name: 'adminProductsCreate' }"
          class="btn btn-neutral"
          >Add New</RouterLink
        >
      </div>
      <div class="overflow-y-auto px-10">
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Category</th>
              <th>Status</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in productStore.products">
              <th>{{ index + 1 }}</th>
              <td>{{ product.name }}</td>
              <td>
                <img
                  :src="product.imageUrl"
                  class="w-12 h-12 rounded-lg object-cover"
                />
              </td>
              <td>฿ {{ product.price }}</td>
              <td>
                {{ product.category }}
              </td>
              <td>
                <div
                  class="badge"
                  :class="
                    product.status === 'open' ? 'badge-success' : 'badge-error'
                  "
                >
                  {{ product.status }}
                </div>
              </td>
              <td>{{ product.updatedAt }}</td>
              <td>
                <div class="flex gap-2">
                  <RouterLink
                    :to="{ name: 'adminProductsUpdate', params: { id: product.product_id } }"
                    class="btn btn-ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      class="h-4 w-4"
                    >
                      <path
                        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
                      />
                    </svg>
                  </RouterLink>
                  <button
                    @click="productStore.removeProduct(product.product_id)"
                    class="btn btn-ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      class="h-4 w-4"
                    >
                      <path
                        d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>
