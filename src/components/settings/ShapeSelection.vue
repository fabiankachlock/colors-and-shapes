<template>
  <div>
    <div v-for="shape in supportedShapes" :key="shape" class="flex flex-row items-center justify-start">
      <input
        type="checkbox"
        :checked="enabledMap[shape]"
        @change="evt => clickHandler(shape, evt.target as HTMLInputElement)"
      />
      <p>{{ t('shape.' + shape) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfig } from '@/core/adapters/config';
import { Shape } from '@/core/use-cases/colors/Shapes';
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const supportedShapes = Object.values(Shape);
const config = useConfig();
const enabledMap: Ref<Record<string, boolean>> = ref({});

onMounted(() => {
  for (const col of config.shapes) {
    enabledMap.value[col] = true;
  }
});

const clickHandler = (Shape: Shape, element: HTMLInputElement) => {
  enabledMap.value[Shape] = element.checked;
  config.setShape(Shape, element.checked);
};
</script>
