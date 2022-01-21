<template>
  <main id="main">
    <header>
      <div>
        <h1>{{ t('title') }}</h1>
        <div>
          <router-link to="settings"> Settings </router-link>
        </div>
      </div>
    </header>
    <main>Cards...</main>
  </main>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
