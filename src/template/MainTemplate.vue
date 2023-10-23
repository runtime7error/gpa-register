<template>
  <div class="screen">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style scoped>
.screen {
  @apply h-screen grid w-full text-gray-600;
  background: white;
  background-image: radial-gradient(rgb(159, 229, 255) 1px, transparent 0);
  background-size: 40px 40px;
  background-position: -19px -19px;
}
</style>
