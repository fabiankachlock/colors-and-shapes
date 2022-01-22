<template>
  <div class="min-w-full overflow-x-hidden overflow-y-scroll bg-zinc-100 dark:bg-zinc-800 full-height">
    <div class="px-4 py-2">
      <header class="w-full my-6">
        <div class="flex flex-eow flex-nowrap justify-between items-center">
          <h1 class="text-5xl">{{ t('settings.title') }}</h1>
          <div class="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full grid place-items-center">
            <router-link to="/" class="text-3xl transform mr-1 transition-transform hover:-translate-x-1">
              <i-ri-arrow-left-s-line />
            </router-link>
          </div>
        </div>
      </header>
      <main class="my-2 flex flex-col flex-nowrap">
        <div class="row row-flex">
          <p class="text-xl">{{ t('settings.language') }}</p>
          <LanguageSelection />
        </div>
        <div class="row row-flex">
          <p class="text-xl">{{ t('settings.darkmode') }}</p>
          <ThemeSwitch />
        </div>
        <div class="row">
          <p class="text-xl">{{ t('settings.colors') }}</p>
          <div class="ml-2">
            <ColorSelection />
          </div>
        </div>
        <div class="row">
          <p class="text-xl">{{ t('settings.shapes') }}</p>
          <div class="ml-2">
            <ShapeSelection />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LanguageSelection from '@/components/settings/LanguageSelection.vue';
import { useI18n } from 'vue-i18n';
import ThemeSwitch from '@/components/settings/ThemeSwitch.vue';
import ColorSelection from '@/components/settings/ColorSelection.vue';
import ShapeSelection from '@/components/settings/ShapeSelection.vue';

const { t } = useI18n();
</script>

<style>
.row {
  @apply border-gray-300 dark:border-gray-600 py-3 px-4 border-t border-b w-full;
  margin-top: -1px; /* border overlap */
}

.row-flex {
  @apply flex flex-row justify-between items-center;
}
</style>
