<template>
  <div>
    <div v-for="shape in supportedShapes" :key="shape" class="flex flex-row items-center justify-start">
      <input
        type="checkbox"
        :checked="enabledMap[shape]"
        class="rounded text-lime-500 dark:text-green-600 mx-2"
        @change="evt => clickHandler(shape, evt.target as HTMLInputElement)"
      />
      <p>{{ t('shape.' + shape) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfig } from '@/core/adapters/config';
import { Shape } from '@/core/business/Shapes';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const supportedShapes = Object.values(Shape);
const config = useConfig();
const enabledMap: Record<string, boolean> = {};

onMounted(() => {
  for (const col of config.shapes) {
    enabledMap[col] = true;
  }
});

const clickHandler = (Shape: Shape, element: HTMLInputElement) => {
  enabledMap[Shape] = element.checked;
  config.setShape(Shape, element.checked);
};
</script>
