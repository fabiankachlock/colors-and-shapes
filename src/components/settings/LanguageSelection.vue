<template>
  <div>
    <select
      :ref="
        r => {
          selection = r as HTMLSelectElement;
        }
      "
      :value="selectedLng"
      class="bg-gray-200 dark:bg-gray-700 p-1 rounded text-gray-800 dark:text-gray-200 pr-8"
    >
      <option v-for="lng in supportedLanguages" :key="lng" :value="lng">{{ t('lng.' + lng) }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { supportedLanguages } from '@/core/frameworks/i18n';
import { useConfig } from '@/core/adapters/config';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const config = useConfig();
const selection = ref<HTMLSelectElement>();
const selectedLng = computed(() => config.language);

onMounted(() => {
  selection.value?.addEventListener('change', () => {
    const lng = selection.value?.value || 'en';
    config.setLanguage(lng);
  });
});
</script>
