<template>
  <div class="min-w-full overflow-x-hidden overflow-y-scroll bg-slate-100 dark:bg-slate-800 full-height">
    <div class="px-4 py-2">
      <header class="w-full my-6">
        <h1 class="text-5xl">{{ t('settings.title') }}</h1>
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
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LanguageSelection from '@/components/settings/LanguageSelection.vue';
import { useI18n } from 'vue-i18n';
import ThemeSwitch from '@/components/settings/ThemeSwitch.vue';
import ColorSelection from '@/components/settings/ColorSelection.vue';

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
