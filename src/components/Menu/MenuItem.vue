<template>
<div>
    <<router-link :to="data.path">{{ data.name }}</router-link>
</div>

</template>
<script lang="ts" setup>
import type IMenuItem from '@/interface/IMenuItem'
const data = defineProps<IMenuItem>();

</script>