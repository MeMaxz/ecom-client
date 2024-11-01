<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";

import UserLayout from "@/layouts/UserLayout.vue";

import register_hero from "@/assets/register_hero.png";

const router = useRouter();

let toastTitle = "Please fill in the form correctly.";
const typePassword = ref("password");
const hidePass = ref(true);
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

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

const showPassword = () => {
  hidePass.value = !hidePass.value;
  if (hidePass.value) {
    typePassword.value = "password";
  } else {
    typePassword.value = "text";
  }
};

const validatePassword = computed(() => {
  return password.value === confirmPassword.value;
});

const validateForm = computed(() => {
  return (
    email.value.includes("@") && password.value !== "" && validatePassword.value
  );
});

const submitForm = async () => {
  if (validateForm.value) {
    try {
      const results = await axios.post("http://localhost:3000/register", {
        email: email.value,
        password: password.value,
      });
      if (results.data.message === "Register success") {
        router.push({ name: "login" });
        return;
      }
      toastTitle = results.data.errors[0];
    } catch (error) {
      console.error(error);
    }
  }

  Toast.fire({
    icon: "error",
    title: toastTitle,
  });
};
</script>

<template>
  <UserLayout>
    <section class="flex justify-center items-center my-screen">
      <div class="card bg-transparent card-side">
        <figure>
          <img :src="register_hero" />
        </figure>
        <div
          class="flex flex-col items-center justify-center shadow-xl card w-2/5 bg-base-100 mx-20"
        >
          <h1 class="text-7xl font-shrikhand stroke-custom-head">Welcome</h1>
          <h1 class="text-xl font-itim -mt-2">
            Please Register to your account.
          </h1>
          <form @submit.prevent="submitForm" class="w-full px-10 mt-2">
            <!-- Email Input -->
            <div class="form-control w-full relative">
              <p class="font-itim font-bold m-2">Email Address</p>
              <input
                type="email"
                placeholder="Email address"
                class="input input-bordered w-full font-itim"
                v-model="email"
              />
            </div>
            <!-- Password Input -->
            <div class="form-control w-full relative">
              <p class="font-itim font-bold m-2">Password</p>
              <p class="input input-bordered flex items-center gap-2">
                <input
                  :type="typePassword"
                  placeholder="Password"
                  class="w-full font-itim"
                  v-model="password"
                />
                <button type="button" @click="showPassword">
                  <svg
                    v-if="hidePass"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    fill="currentColor"
                    class="h-6 w-6 opacity-70"
                  >
                    <path
                      d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    fill="currentColor"
                    class="h-6 w-6 opacity-70"
                  >
                    <path
                      d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                    />
                  </svg>
                </button>
              </p>
            </div>
            <!-- Confirm Password Input -->
            <div class="form-control w-full relative">
              <p class="font-itim font-bold m-2">Confirm Password</p>
              <p class="input input-bordered flex items-center gap-2">
                <input
                  :type="typePassword"
                  placeholder="Confirm Password"
                  class="w-full font-itim"
                  v-model="confirmPassword"
                />
                <button type="button" @click="showPassword">
                  <svg
                    v-if="hidePass"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    fill="currentColor"
                    class="h-6 w-6 opacity-70"
                  >
                    <path
                      d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    fill="currentColor"
                    class="h-6 w-6 opacity-70"
                  >
                    <path
                      d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                    />
                  </svg>
                </button>
              </p>
            </div>
            <!-- Sign In Button -->
            <div class="flex justify-center mt-5 mb-2">
              <button
                type="submit"
                class="btn bg-gradient-to-r from-[#5170ff] to-[#ff66c4] w-3/4 h-14 font-shrikhand text-4xl stroke-custom"
              >
                Register
              </button>
            </div>
          </form>
          <p class="w-full font-itim px-10"
            >If you have an account, click to
            <RouterLink :to="{ name: 'login' }"
              ><span class="my-register">Login</span> ?</RouterLink
            ></p
          >
        </div>
      </div>
    </section>
  </UserLayout>
</template>

<style scoped>
.my-screen {
  min-height: calc(100vh - 4rem);
}

.stroke-custom-head {
  -webkit-text-stroke: 5px #8c52ff;
  color: #edddf9;
}
.stroke-custom {
  -webkit-text-stroke: 2px #8c52ff;
  color: #edddf9;
}

.my-register {
  color: #5e17eb;
}
</style>
