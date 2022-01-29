<template>
  <div>
    <select
      :ref="
        r => {
          selection = r as HTMLSelectElement;
        }
      "
      :value="selectedGameMode"
      class="bg-gray-200 dark:bg-gray-700 p-1 rounded text-gray-800 dark:text-gray-200 pr-8"
    >
      <option v-for="gm in gameModes" :key="gm" :value="gm">{{ t('gameMode.' + gm) }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { GameMode, useConfig } from '@/core/adapters/config';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const config = useConfig();
const gameModes = Object.keys(GameMode);
const selection = ref<HTMLSelectElement>();
const selectedGameMode = computed(() => config.gameMode);

onMounted(() => {
  selection.value?.addEventListener('change', () => {
    const gameMode = selection.value?.value || GameMode.colors;
    config.setGameMode(gameMode as GameMode);
  });
});
</script>
