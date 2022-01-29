<template>
  <div class="h-full flex items-center mx-2">
    <p
      class="text-xl w-full text-center h-6 transition-all transform duration-300 opacity-100"
      :class="{ 'opacity-0 scale-90': message.length === 0 }"
    >
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useMessages } from '@/core/adapters/messages';
import { computed } from 'vue';

const messages = useMessages();

const message = computed(() => messages.message);
</script>
