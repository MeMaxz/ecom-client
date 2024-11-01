<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import AdminLayout from "@/layouts/AdminLayout.vue";

import { useProductStore } from "@/stores/product";

const ProductStore = useProductStore();
const router = useRouter();
const route = useRoute();

const productIndex = ref(-1);
const mode = ref("ADD");

const formData = ref([
  {
    name: "Name",
    field: "name",
    type: "text",
  },
  {
    name: "Price",
    field: "price",
    type: "number",
  },
]);

let formDataProduct = new FormData();

const product = reactive({
  name: "",
  price: "0",
  category: "เครื่องดื่ม",
  status: "open",
});

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    formDataProduct.append("file", file);
  }
};

const handleFuctionMode = () => {
  if (mode.value === "ADD") {
    addProduct();
  } else {
    updateProduct();
  }
};

const updateProduct = () => {
  formDataProduct.append("product_id", productIndex.value);
  formDataProduct.append("name", product.name);
  formDataProduct.append("price", product.price);
  formDataProduct.append("category", product.category);
  formDataProduct.append("status", product.status);

  ProductStore.updateProduct(formDataProduct);
  router.push({ name: "adminProducts" });
};

const addProduct = () => {
  formDataProduct.append("name", product.name);
  formDataProduct.append("price", product.price);
  formDataProduct.append("category", product.category);
  formDataProduct.append("status", product.status);

  ProductStore.addProduct(formDataProduct);
  router.push({ name: "adminProducts" });
};

const cancel = () => {
  product.name = "";
  product.price = "0";
  product.category = "เครื่องดื่ม";
  product.status = "open";
  formDataProduct = new FormData();
  router.push({ name: "adminProducts" });
};

const getItem = async () => {
  const res = await ProductStore.getProduct(productIndex.value);
  product.name = res.name;
  product.price = res.price;
  product.category = res.category;
  product.status = res.status;
};

onMounted(() => {
  if (route.params.id) {
    productIndex.value = parseInt(route.params.id);
    mode.value = "EDIT";
    getItem();
  }
});
</script>

<template>
  <AdminLayout>
    <div class="bg-white min-h-screen p-8">
      <div class="shadow-xl p-8 mt-4">
        <div class="text-1xl font-bold">{{ mode }}</div>
        <div class="divider"></div>
        <div class="grid grid-cols-2 gap-2">
          <div v-for="form in formData" class="form-control w-full">
            <label class="label">
              <span class="label-text">{{ form.name }}</span>
            </label>
            <input
              :type="form.type"
              v-model="product[form.field]"
              class="input input-bordered w-full"
            />
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Image</span>
            </label>
            <input
              @change="handleFileChange"
              accept=".jpg,.jpeg,.png"
              type="file"
              class="file-input file-input-bordered w-full"
            />
          </div>
        </div>
        <div class="divider"></div>
        <div class="grid grid-cols-2 gap-2">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <select
              v-model="product.category"
              class="select select-bordered w-full"
            >
              <option value="เครื่องดื่ม">Drink</option>
              <option value="ของหวาน">Dessert</option>
            </select>
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Status</span>
            </label>
            <select
              v-model="product.status"
              class="select select-bordered w-full"
            >
              <option value="open">Open</option>
              <option value="close">Close</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end mt-4 gap-4">
          <button @click="cancel" class="btn btn-ghost">Back</button>
          <button @click="handleFuctionMode" class="btn btn-neutral">
            {{ mode }}
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
