<template>
  <div>
    <div v-for="col in supportedColors" :key="col" class="flex flex-row items-center justify-start">
      <input
        type="checkbox"
        :checked="enabledMap[col]"
        @change="evt => clickHandler(col, evt.target as HTMLInputElement)"
      />
      <p>{{ t('color.' + col) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfig } from '@/core/adapters/config';
import { Color } from '@/core/use-cases/colors/Colors';
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const supportedColors = Object.values(Color);
const config = useConfig();
const enabledMap: Ref<Record<string, boolean>> = ref({});

onMounted(() => {
  for (const col of config.colors) {
    enabledMap.value[col] = true;
  }
});

const clickHandler = (color: Color, element: HTMLInputElement) => {
  enabledMap.value[color] = element.checked;
  config.setColor(color, element.checked);
};
</script>
