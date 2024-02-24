<template>
    <div>
        <MenuItem v-for = "(routes, index) in routeViews" :name="routes.name" :path="routes.path"::key="index"></MenuItem>
    </div>
</template>

<script lang="ts" setup>
import type IMenuItem from '@/interface/IMenuItem'
const data = defineProps<IMenuItem>();

</script>