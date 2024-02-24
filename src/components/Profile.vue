<template>
    <div>
        <h2>My name is:</h2>
        <input type="text" v-model="name">
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');


</script>

<style scoped>

</style>