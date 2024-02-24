<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/Menu/Menu.vue'
import MenuView  from './views/MenuView.vue';
</script>

<template>
  <header>
    <nav>
      <MenuView></MenuView>
    </nav>
  </header>
</template>

<style scoped>
</style>
