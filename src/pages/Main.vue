<template>
  <Copyright />
  <div id="main" class="min-w-full overflow-hidden overflow bg-zinc-100 dark:bg-zinc-800 full-height p-4">
    <div class="relative grid wrapper w-full h-full max-h-full">
      <header class="my-2 w-full grid">
        <h1 class="text-3xl my-1">{{ t('title') }}</h1>
        <div id="header-row-2">
          <MessageBar />
        </div>
        <div class="flex flex-row flex-wrap justify-end">
          <div
            class="bg-gray-300 dark:bg-gray-700 rounded-full px-4 py-1 m-1 transform transition-transform hover:scale-95"
          >
            <button class="flex flex-row flex-nowrap items-center" @click="refresh">
              <div
                class="mr-2 text-xl transform transition-transform duration-500"
                :class="{ 'rotate-180': isRefreshing }"
              >
                <i-ri-refresh-line />
              </div>
              <span class="text-xl">
                {{ t('refresh') }}
              </span>
            </button>
          </div>
          <div
            class="bg-gray-300 dark:bg-gray-700 rounded-full px-4 py-1 m-1 transform transition-transform hover:scale-95"
          >
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
        <Card
          v-for="(card, index) of cards"
          :card="card"
          :order="index + 1"
          :key="card.id"
          @click="game.clickedCard(card)"
        />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import Card from '@/components/game/Card.vue';
import { createGridRaster } from '@/core/business/helper/gridCalculator';
import { useGame } from '@/core/adapters/game';
import { useConfig } from '@/core/adapters/config';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Copyright from '@/components/Copyright.vue';
import MessageBar from '@/components/game/MessageBar.vue';

const { t } = useI18n();

const game = useGame();
const config = useConfig();
const rows = ref(0);
const cols = ref(0);
const cards = computed(() => game.cards);
const isRefreshing = ref(false);

onMounted(() => {
  window.addEventListener('resize', sizeGrid);
  sizeGrid();
  game.startGameIfNeeded();
});

onUnmounted(() => {
  window.removeEventListener('resize', sizeGrid);
});

const sizeGrid = () => {
  const grid = createGridRaster(window.innerWidth, window.innerHeight, config.numberOfCards);
  rows.value = grid.rows;
  cols.value = grid.cols;
};

const refresh = () => {
  if (!isRefreshing.value) {
    game.startGame();
    isRefreshing.value = true;
    setTimeout(() => {
      isRefreshing.value = false;
    }, 500);
  }
};
</script>

<style>
header.grid {
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, auto);
}

#header-row-2 {
  grid-row: 2;
  grid-column: 1 / span 2;
}

@media only screen and (min-width: 640px) {
  header.grid {
    grid-template-columns: repeat(3, auto);
    grid-template-rows: repeat(1, auto);
  }

  #header-row-2 {
    grid-row: auto;
    grid-column: auto;
  }
}

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
