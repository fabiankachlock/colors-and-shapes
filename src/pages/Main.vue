<template>
  <div id="main" class="min-w-full overflow-x-hidden overflow-y-scroll bg-zinc-100 dark:bg-zinc-800 full-height">
    <div class="px-4 py-2 flex flex-col justify-start items-center">
      <header class="w-full flex flex-row justify-between items-start">
        <h1 class="text-3xl">{{ t('title') }}</h1>
        <div class="flex flex-row flex-wrap justify-end">
          <div class="bg-gray-300 dark:bg-gray-700 rounded-full px-4 py-1 m-2">
            <button class="flex flex-row flex-nowrap items-center">
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
      <main>Cards...</main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const refresh = () => {};
</script>
