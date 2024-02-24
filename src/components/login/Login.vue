<template>
    <div class="login-container">
      <h2 class="login-title">Bienvenido</h2>
      <form @submit.prevent="login" class="login-form">
        <div :class="{ 'error': hasError('email') }" class="form-group">
          <label for="email">Correo electrónico:</label>
          <input v-model="formData.email" type="email" id="email" placeholder="Correo electrónico" required />
          <span v-if="hasError('email')" class="error-message">{{ errorMessages.email }}</span>
        </div>
        <div :class="{ 'error': hasError('password') }" class="form-group">
          <label for="password">Contraseña:</label>
          <input v-model="formData.password" type="password" id="password" placeholder="Contraseña" required />
          <span v-if="hasError('password')" class="error-message">{{ errorMessages.password }}</span>
        </div>
        <button type="submit" class="submit-button">Iniciar Sesión</button>
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
  });
  
  const usuariosData = ref([...UsuariosData]);
  const router = useRouter();
  
  const errorMessages = ref({
    email: '',
    password: '',
    user: 'El correo o la contraseña son inválidos.',
  });
  
  const hasError = (field) => {
    return field === 'email' ? errorMessages.value.email !== '' : errorMessages.value.password !== '';
  };
  
  const login = () => {
    const isValidEmail = validarCampo('email');
    const isValidPassword = validarCampo('password');
  
    if (!isValidEmail || !isValidPassword) return;
  
    if (!verificarUsuario()) {
      alert(errorMessages.value.user);
      return;
    }
  
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
    }
  
    errorMessages.value[campo] = '';
    return true;
  };
  
  const verificarUsuario = () => {
    const foundUser = usuariosData.value.find(
      user => user.email === formData.value.email && user.password === formData.value.password
    );
    return !!foundUser;
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border-radius: 10px;
    background-color: #f0f0f0;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  }
  
  .login-title {
    text-align: center;
    color: #333;
  }
  
  .login-form {
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
  