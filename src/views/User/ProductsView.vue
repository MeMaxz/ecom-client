<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";
import Product from "@/components/Product.vue";
import Slider from "primevue/slider";

import { useProductStore } from "@/stores/product";

const route = useRoute();
const productStore = useProductStore();

onMounted(() => {
  productStore.loadProducts();
});

const maxPrice = computed(() =>
  Math.max(...productStore.products.map((p) => p.price))
);
const minPrice = computed(() =>
  Math.min(...productStore.products.map((p) => p.price))
);

const price = ref([minPrice.value, maxPrice.value]);
const filter = ref(true);
const category = ref("ทุกประเภท");

const products = () => {
  if (route.query.search) {
    filter.value = false;
    return productStore.searchProducts(route.query.search);
  }
  filter.value = true;
  return productStore.filterProducts(category.value, price.value);
};
</script>

<template>
  <UserLayout>
    <section class="flex flex-col">
      <div
        v-if="filter"
        class="flex items-center justify-center shadow-xl bg-white rounded-lg w-fit mx-auto mt-4 p-3"
      >
        <!-- Category -->
        <div class="flex items-center h-full mr-6">
          <div class="label">
            <span class="label-text font-itim text-base">ประเภทอาหาร:</span>
          </div>
          <select
            v-model="category"
            class="select select-bordered select-sm font-itim text-base"
          >
            <option>ทุกประเภท</option>
            <option>เครื่องดื่ม</option>
            <option>ของหวาน</option>
          </select>
        </div>

        <!-- Price -->
        <div class="h-full ml-6">
          <div class="label">
            <span class="label-text font-itim text-base"
              >ช่วงราคา: ฿{{ price[0] }} - ฿{{ price[1] }}</span
            >
          </div>
          <Slider v-model="price" range :min="minPrice" :max="maxPrice" />
        </div>
      </div>

      <section class="grid grid-cols-4 gap-4 m-4">
        <Product :products="products()"></Product>
      </section>
    </section>
  </UserLayout>
</template>

<style scoped></style>
