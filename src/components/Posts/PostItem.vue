<template>
    <div class="card">
        <h4>{{ props.id }}</h4>
        <h4>{{ props.date }}</h4>
        <h4>{{ props.title }}</h4>
        <h4>{{ props.body }}</h4>
        <button @click="clicked()">boton</button>
        <button @click="clicked_2()">boton2</button>
    </div>
    <input type="number" n>
</template>

<script setup lang="ts">
import type { IPost } from '@/Interfaces/IPost';
import { ref } from 'vue';


const props = defineProps<IPost>();

const emits = defineEmits(['SayHi']);



//funciones
const clicked = () => 
{
    emits('SayHi', props.id);
}
const clicked_2 = () => 
{
    alert('Desde el hijo');
}

</script>

<style scoped>
.card {
    border: 1px solid brown;
    padding: 10px;
    margin: 5px;
}
</style>