<template>
    <div>
        <div class="">
            <label for="email">Email:</label>
            <input @input="verificar()" v-model="email" type="email" />
        </div>
        <div class="">
            <label for="password">Password:</label>
            <input @change="verificar()" v-model="password" type="password" />
        </div>
        <button :disabled="!(email.length > 0 && password.length > 8)">Login</button>
        <hr>
        {{ email }}
        {{ password }}
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue'
import type { Ref } from 'vue'

onBeforeMount(() => {
    console.log('Antes de crear')
});

onMounted(() => {
    console.log('Montado')

});

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const error: Ref<boolean> = ref(true);

const verificar = () => {
    error.value = true;
    if (email.value.length != 0 && password.value.length != 0) {
        error.value = false;
        return
    }
    error.value = true;
    return
}

</script>

<style scoped></style>