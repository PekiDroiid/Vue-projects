<template>
    <div>
        <button @click="clicked($event)">boton</button>
        <PostItem 
        @say-hi="clicked($event)"
        v-bind="post"
        v-for="(post, index) in PostData" :key="index" />
    </div>
</template>

<script setup lang="ts">
import PostItem from './PostItem.vue';
import PostData from '@/data/PostData'

const clicked = (event: any) => 
{
    alert("Desde el padre: " + event);
}
</script>

<style scoped>

</style>