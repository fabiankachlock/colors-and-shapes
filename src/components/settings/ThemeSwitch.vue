<template>
  <button
    @click="toggleDarkMode"
    class="text-gray-900 dark:text-gray-100 text-xl transform ease-linear transition-transform hover:scale-110"
  >
    <i-ri-moon-fill v-show="!isDarkMode" /> <i-ri-sun-fill v-show="isDarkMode" />
  </button>
</template>

<script setup lang="ts">
import { useConfig } from '@/core/adapters/config';
import { computed } from 'vue';

const config = useConfig();
const isDarkMode = computed(() => config.useDarkMode);

const toggleDarkMode = () => {
  config.setDarkMode(!isDarkMode.value);
};
</script>
