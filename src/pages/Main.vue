<template>
  <div id="main" class="min-w-full overflow-hidden overflow bg-zinc-100 dark:bg-zinc-800 full-height p-4">
    <div class="relative grid wrapper w-full h-full max-h-full">
      <header class="my-2 w-full flex flex-row justify-between items-start">
        <h1 class="text-3xl">{{ t('title') }}</h1>
        <div class="flex flex-row flex-wrap justify-end">
          <div class="bg-gray-300 dark:bg-gray-700 rounded-full px-4 py-1 m-2">
            <button class="flex flex-row flex-nowrap items-center" @click="refresh">
              <i-ri-refresh-line class="mr-2 text-xl" />
              <span class="text-xl">
                {{ t('settings.title') }}
              </span>
            </button>
          </div>
          <div class="bg-gray-300 dark:bg-gray-700 rounded-full px-4 py-1 m-2">
            <router-link to="settings" class="flex flex-row flex-nowrap items-center">
              <i-ri-settings-5-fill class="mr-2 text-xl" />
              <span class="text-xl">
                {{ t('settings.title') }}
              </span>
            </router-link>
          </div>
        </div>
      </header>
      <main id="grid" class="grid w-full relative">
        <Card v-for="card of cards" :card="card" :key="card.id" />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import Card from '@/components/game/Card.vue';
import { CreateGridRaster } from '@/core/business/helper/gridCalculator';
import { DisplayCard, useGame } from '@/core/adapters/game';
import { useConfig } from '@/core/adapters/config';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { CreatePairs } from '@/core/business/Scrambler';

const { t } = useI18n();

const game = useGame();
const config = useConfig();
const rows = ref(0);
const cols = ref(0);
const cards = computed(() => game.cards);

onMounted(() => {
  window.addEventListener('resize', sizeGrid);
  sizeGrid();
  game.startGame();
});

onUnmounted(() => {
  window.removeEventListener('resize', sizeGrid);
});

const sizeGrid = () => {
  const grid = CreateGridRaster(window.innerWidth, window.innerHeight, config.numberOfCards);
  rows.value = grid.rows;
  cols.value = grid.cols;
};

const refresh = () => {
  game.startGame();
};
</script>

<style>
main#grid {
  grid-template-columns: repeat(v-bind(cols), 1fr);
  grid-template-rows: repeat(v-bind(rows), minmax(auto, 1fr));
}

main#grid > div {
  @apply rounded-lg;
}

.wrapper {
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
}
</style>
