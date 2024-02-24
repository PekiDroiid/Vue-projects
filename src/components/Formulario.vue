<template>
    <div style="box-shadow: 10px 5px 5px black;  padding: 20px;">
        <h2>Agregar Usuario</h2>
        <form @submit.prevent="enviar()" style="padding: 10px;">
            <div :class="[error ? 'errorClass' : '']">
                <label for="nombre">Nombre:</label>
                <input v-model="formData.nombre" autocomplete="off" id="nombre" maxlength="18" v-on:input="verificar()" />
                <span class="error-message">{{ errorMessages.nombre }}</span>
            </div>
            <div :class="[error ? 'errorClass' : '']">
                <label for="apellido">Apellido:</label>
                <input v-model="formData.apellido" autocomplete="off" id="apellido" maxlength="18"
                    v-on:input="verificar()" />
                <span class="error-message">{{ errorMessages.nombre }}</span>
            </div>
            <div :class="[errorEdad ? 'errorClass' : '']">
                <label for="edad">Edad:</label>
                <input v-model="formData.edad" id="edad" type="number" :min="0" :max="60" v-on:input="verificar()" />
                <span class="error-message">{{ errorMessages.edad }}</span>
            </div>
            <div>
                <label for="genero">Género:</label>
                <select v-model="formData.genero" id="genero">
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>
            <div :class="[errorTel ? 'errorClass' : '']">
                <label for="telefono">Teléfono:</label>
                <input v-model="formData.telefono" id="telefono" :maxlength="10" :minlength="10" v-on:input="verificar()" />
                <span class="error-message">{{ errorMessages.telefono }}</span>
            </div>
            <button type="submit">Enviar</button>
        </form>
    </div>
    <div style="margin: 10px;">
        <h2>Registros</h2>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                    <th>Género</th>
                    <th>Teléfono</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(registro, index) in registros" :key="index">
                    <td>{{ registro.nombre }}</td>
                    <td>{{ registro.apellido }}</td>
                    <td>{{ registro.edad }}</td>
                    <td>{{ registro.genero }}</td>
                    <td>{{ registro.telefono }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
let error: boolean = false;
let errorTel: boolean = false;
let errorEdad: boolean = false;

const formData = ref({
    nombre: '',
    apellido: '',
    edad: 0,
    genero: 'Masculino',
    telefono: '',
});

const errorMessages = ref({
    nombre: '',
    telefono: '',
    edad: '',
});

const registros = ref([]) as any;

const verificar = () => {
    const nombre = formatearCadena(formData.value.nombre);
    const apellido = formatearCadena(formData.value.apellido);
    const telefono = formData.value.telefono;
    const edad = formData.value.edad;
    let errores: string = '';

    if (verificarNombreApellido(nombre, apellido) == true) {
        error = true;
        errores = 'El nombre y apellido no pueden ser iguales y de max 18 caracteres  ';
        errorMessages.value.nombre = 'El nombre y apellido no pueden ser iguales y de max 18 caracteres';
    }
    if (verificarTelefono(telefono) == true) {
        errorTel = true;
        errores = errores.concat('El telefono deber contener solo números y de max 10 digitos. ');
        errorMessages.value.telefono = 'El telefono deber contener solo números y de max 10 digitos.';
    }
    if (verificarEdad(edad) == true) {
        errorEdad = true;
        errores = errores.concat('la edad deber ser solo números en un rango de 0 a 60. ');
        errorMessages.value.edad = 'la edad deber ser solo números en un rango de 0 a 60.';
    }

    if (errores != '') {
        return errores;
    }
    error = false;
    errorTel = false;
    errorEdad = false;
    errorMessages.value['nombre'] = '';
    errorMessages.value['telefono'] = '';
    errorMessages.value['edad'] = '';
    return null;

}

const verificarNombreApellido = (nombre: string, apellido: string) => {
    if (nombre === apellido && (nombre != '' || apellido != '') || (nombre.length > 18 || apellido.length > 18)) {
        return true;
    }
    error = false;
    errorMessages.value['nombre'] = '';
    return false;
}
const verificarTelefono = (telefono: string) => {
    if (!/^\d+$/.test(telefono) && telefono != '' || (telefono.length < 10 && telefono != '')) {
        return true;
    }
    errorTel = false;
    errorMessages.value['telefono'] = '';
    return false;
}

const verificarEdad = (edad: number) => {
    if (edad.toString() === "" || (edad > 60 && edad < 0)) {
        return true;
    }
    errorEdad = false;
    errorMessages.value['edad'] = '';
    return false;
}

const formatearCadena = (texto: string) => {
    let texto_procesado = texto.trim();
    texto_procesado = texto_procesado.replace(/[^\w\s]/gi, '');
    texto_procesado = texto_procesado.toLowerCase();
    return texto_procesado;
}

const enviar = () => {
    // Validaciones
    const mensajeError = verificar();
    if (mensajeError != null) {
        alert(mensajeError);
        return;
    }

    if (Object.values(formData.value).some(value => value === '')) {
        alert('Todos los campos deben ser completados.');
        return;
    }

    alert(`Datos enviados al servidor.`);
    registros.value.push({ ...formData.value });
};
</script>

<style>
form {
    max-width: 400px;
    margin: auto;
    display: grid;
}

label {
    display: block;
    margin-bottom: 8px;
}

input,
select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
}

button {
    padding: 10px;
    background-color: #698a15;
    color: white;
    border: none;
    cursor: pointer;
    width: 20%;
    margin: 0 auto;
}

button:hover {
    background-color: #698a15;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #698a15;
    color: white;
}

.errorClass label {
    color: #ff3c32;
}

.errorClass input {
    border: 1px solid red;
}

.error-message {
    color: red;
    font-size: 14px;
    margin: 4px;
    display: block;
}
</style>  