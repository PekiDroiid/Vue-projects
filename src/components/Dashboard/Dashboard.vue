<template>
    <div class="crud-container">
      <h2 class="crud-title">CRUD de usuarios</h2>
      <form @submit.prevent="register" class="crud-form">
        <div class="input-container">
          <input type="text" id="disabledInput" v-model="idUser" disabled class="disabled-input" />
          <i @click="limpiarID" class="icon-cancel">X</i>
        </div>
        <div :class="{ 'error': errorMessages.email }" class="form-group">
          <label for="email">Correo:</label>
          <input v-model="formData.email" type="email" id="email" autocomplete="off" />
          <span v-if="errorMessages.email" class="error-message">{{ errorMessages.email }}</span>
        </div>
        <div :class="{ 'error': errorMessages.password }" class="form-group">
          <label for="password">Contraseña:</label>
          <input v-model="formData.password" type="password" id="password" autocomplete="off" />
          <span v-if="errorMessages.password" class="error-message">{{ errorMessages.password }}</span>
        </div>
        <div :class="{ 'error': errorMessages.name }" class="form-group">
          <label for="name">Nombre:</label>
          <input v-model="formData.name" type="text" id="name" autocomplete="off" />
          <span v-if="errorMessages.name" class="error-message">{{ errorMessages.name }}</span>
        </div>
        <div :class="{ 'error': errorMessages.age }" class="form-group">
          <label for="age">Edad:</label>
          <input v-model="formData.age" type="number" id="age" autocomplete="off" />
          <span v-if="errorMessages.age" class="error-message">{{ errorMessages.age }}</span>
        </div>
        <button type="submit">{{ buttonLogic }}</button>
      </form>
    </div>
    <div class="table-container">
      <h2>Registros</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Correo</th>
            <th>Contraseña</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <Records
          @delete="eliminarUsuario"
          @update="tomarDatosDelUsuario"
          :user="user"
          v-for="(user, i) in usuariosData"
          :key="i"
        ></Records>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import UsuariosData from '@/data/UsariosData';
  import { useRouter } from 'vue-router';
  import Records from '@/components/records/Records.vue';
  import type IUser from '@/interfaces/IUser';
  
  let error = ref(false);
  let errorEmail = ref(false);
  let errorPassword = ref(false);
  let errorName = ref(false);
  let errorAge = ref(false);
  let buttonLogic = ref<'Agregar' | 'Editar'>('Agregar');
  let idUser = ref<number>(0);
  
  const formData = ref({
    id: 0,
    email: '',
    password: '',
    name: '',
    age: 0,
  });
  
  const usuariosData = ref([...UsuariosData]);
  const router = useRouter();
  
  const errorMessages = ref({
    email: '',
    password: '',
    name: '',
    age: '',
    user: 'Ya existe este usuario.',
  });
  
  const register = () => {
    verificarCampoEmail();
    verificarCampoPassword();
    verificarCampoName();
    verificarCampoAge();
  
    if (errorEmail.value || errorPassword.value || errorName.value || errorAge.value) {
      return;
    }
  
    if (!verificarUsuario()) {
      alert(errorMessages.value.user);
      return;
    }
  
    if (idUser.value > 0) {
      editarUsuario(idUser.value);
      alert('Se ha editado el registro correctamente');
    } else {
      agregarID();
      usuariosData.value.push({ ...formData.value });
      alert('Se ha agregado un nuevo registro');
      limpiarID();
    }
  };
  
  const verificarCampoEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    errorEmail.value = !regex.test(formData.value.email);
    errorMessages.value.email = errorEmail.value ? 'Correo electrónico inválido.' : '';
  };
  
  const verificarCampoPassword = () => {
    errorPassword.value = formData.value.password.length < 8;
    errorMessages.value.password = errorPassword.value ? 'La contraseña debe tener al menos 8 caracteres.' : '';
  };
  
  const verificarCampoName = () => {
    const { name } = formData.value;
    errorName.value = name === '' || name.length > 25 || name.length < 3;
    errorMessages.value.name = errorName.value
      ? 'El nombre no puede estar vacío y debe tener entre 3 y 25 caracteres.'
      : '';
  };
  
  const verificarCampoAge = () => {
    const { age } = formData.value;
    errorAge.value = isNaN(age) || age < 18 || age > 100;
    errorMessages.value.age = errorAge.value
      ? 'Edad inválida. Debe ser un número entre 18 y 100.'
      : '';
  };
  
  const verificarUsuario = () => {
    const foundUser = usuariosData.value.find((user) => user.email === formData.value.email && user.id !== idUser.value);
    return !foundUser;
  };
  
  const agregarID = () => {
    const maxId = Math.max(...usuariosData.value.map((user) => user.id));
    formData.value.id = maxId + 1;
  };
  
  const eliminarUsuario = (userId: number) => {
    const filtrados = usuariosData.value.filter((user) => user.id !== userId);
    usuariosData.value = filtrados;
    limpiarID();
  };
  
  const tomarDatosDelUsuario = (editedUser: IUser) => {
    formData.value = { ...editedUser, id: 0 };
    idUser.value = editedUser.id;
    buttonLogic.value = 'Editar';
  };
  
  const limpiarID = () => {
    formData.value = {
      id: 0,
      email: '',
      password: '',
      name: '',
      age: 0,
    };
    idUser.value = 0;
    buttonLogic.value = 'Agregar';
  };
  
  const editarUsuario = (id: number) => {
    const index = usuariosData.value.findIndex((user) => user.id === id);
    usuariosData.value[index] = { ...formData.value, id: id };
  };
  </script>
  
  <style scoped>
  .crud-container {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    padding: 20px;
  }
  
  .crud-title {
    text-align: center;
  }
  
  .crud-form {
    padding: 10px;
    max-width: 400px;
    margin: auto;
    display: grid;
  }
  
  .input-container {
    position: relative;
  }
  
  .disabled-input {
    width: 93%;
    padding-right: 30px;
  }
  
  .icon-cancel {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    color: red;
  }
  
  .error {
    border-color: red;
  }
  
  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 4px;
    display: block;
  }
  
  .table-container {
    margin: 3rem;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
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
  </style>
  