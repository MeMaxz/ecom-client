<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="my-bg my-screen">
    <RouterView />
  </div>
</template>

<style scoped>
.my-screen {
  min-height: calc(100vh);
}

.my-bg {
  background-image: url(@/assets/bg.png);
  background-size: cover;
  background-position: center;
}
</style>
