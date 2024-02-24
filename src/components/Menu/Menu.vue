<template>
    <div>
        <MenuItem v-for="(routes, index) in routerViews" :name="routes.name" :path="routes.path" :key="index">
        </MenuItem>
    </div>
</template>
<script lang="ts" setup>
import MenuItem from './MenuItem.vue';
import router from '@/router';
import type IMenuItem from "@/interface/MenuItem"

const routerViews: IMenuItem[] = router.options.routes.filter((route) => {
    return route
}) as IMenuItem[]

</script>