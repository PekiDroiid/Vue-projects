<template>
    <div class="register-container">
      <h2 class="register-title">Registrarse</h2>
      <form @submit.prevent="register" class="register-form">
        <div :class="{ 'error': hasError('email') }" class="form-group">
          <label for="email">Correo:</label>
          <input v-model="formData.email" type="email" id="email" placeholder="Correo electrónico" required />
          <span v-if="hasError('email')" class="error-message">{{ errorMessages.email }}</span>
        </div>
        <div :class="{ 'error': hasError('password') }" class="form-group">
          <label for="password">Contraseña:</label>
          <input v-model="formData.password" type="password" id="password" placeholder="Contraseña" required />
          <span v-if="hasError('password')" class="error-message">{{ errorMessages.password }}</span>
        </div>
        <div :class="{ 'error': hasError('name') }" class="form-group">
          <label for="name">Nombre:</label>
          <input v-model="formData.name" type="text" id="name" placeholder="Nombre completo" required />
          <span v-if="hasError('name')" class="error-message">{{ errorMessages.name }}</span>
        </div>
        <div :class="{ 'error': hasError('age') }" class="form-group">
          <label for="age">Edad:</label>
          <input v-model.number="formData.age" type="number" id="age" placeholder="Edad" required />
          <span v-if="hasError('age')" class="error-message">{{ errorMessages.age }}</span>
        </div>
        <button type="submit" class="submit-button">Registrarse</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import UsuariosData from '@/data/UsariosData';
  import { useRouter } from 'vue-router';
  
  const formData = ref({
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
    user: 'Este usuario ya existe.',
  });
  
  const hasError = (field) => {
    return field === 'email' ? errorMessages.value.email !== '' : errorMessages.value[field] !== '';
  };
  
  const register = () => {
    const isValidEmail = validarCampo('email');
    const isValidPassword = validarCampo('password');
    const isValidName = validarCampo('name');
    const isValidAge = validarCampo('age');
  
    if (!isValidEmail || !isValidPassword || !isValidName || !isValidAge) return;
  
    if (!verificarUsuario()) {
      alert(errorMessages.value.user);
      return;
    }
  
    agregarUsuario();
    router.push('/dashboard');
  };
  
  const validarCampo = (campo) => {
    const value = formData.value[campo];
  
    if (campo === 'email') {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        errorMessages.value.email = 'Correo electrónico inválido.';
        return false;
      }
    } else if (campo === 'password') {
      if (value.length < 8) {
        errorMessages.value.password = 'La contraseña debe tener al menos 8 caracteres.';
        return false;
      }
    } else if (campo === 'name') {
      if (value.length < 3 || value.length > 25) {
        errorMessages.value.name = 'El nombre debe tener entre 3 y 25 caracteres.';
        return false;
      }
    } else if (campo === 'age') {
      if (isNaN(value) || value < 18) {
        errorMessages.value.age = 'La edad debe ser un número mayor o igual a 18.';
        return false;
      }
    }
  
    errorMessages.value[campo] = '';
    return true;
  };
  
  const verificarUsuario = () => {
    return !usuariosData.value.some(user => user.email === formData.value.email);
  };
  
  const agregarUsuario = () => {
    const maxId = Math.max(...usuariosData.value.map(user => user.id));
    const newUser = {
      id: maxId + 1,
      email: formData.value.email,
      password: formData.value.password,
      name: formData.value.name,
      age: formData.value.age,
    };
    usuariosData.value.push(newUser);
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border-radius: 8px;
    background-color: #f5f5f5;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  }
  
  .register-title {
    text-align: center;
    color: #333;
  }
  
  .register-form {
    margin-top: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-size: 16px;
    color: #666;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .error {
    border-color: #ff6347;
  }
  
  .error-message {
    color: #ff6347;
    font-size: 14px;
    margin-top: 5px;
  }
  
  .submit-button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 5px;
    background-color: #4caf50;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #45a049;
  }
  </style>
  