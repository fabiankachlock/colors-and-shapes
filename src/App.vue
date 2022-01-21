<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useConfig } from './core/adapters/config';

const config = useConfig();
config.configure();
</script>
