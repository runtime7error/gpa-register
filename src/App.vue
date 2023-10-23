<template>
  <main-template>
    <router-view v-slot="{ Component }">
      <Transition mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </main-template>
</template>

<script setup>
import MainTemplate from './template/MainTemplate.vue'
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 1s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
