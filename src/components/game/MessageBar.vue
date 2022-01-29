<template>
  <div class="h-full flex items-center mx-2">
    <p class="text-xl w-full text-center h-6">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useMessages } from '@/core/adapters/messages';
import { computed, ref } from 'vue';

const messages = useMessages();

const message = computed(() => messages.message);
</script>
