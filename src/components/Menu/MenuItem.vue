<template>
    <div>
        <RouterLink :to="data.path">{{ data.name }}</RouterLink>
    </div>
</template>

<script setup lang="ts">
import type IMenuItem from '@/interface/MenuItem';
const data = defineProps<IMenuItem>();
</script>
<style scoped>

</style>