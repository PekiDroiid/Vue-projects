<template>
    <nav class="navbar">
      <div>
        <RouterLink to="/" class="nav-link">Login</RouterLink>
      </div>
      <div>
        <RouterLink to="/register" class="nav-link">Register</RouterLink>
      </div>
    </nav>
    <RouterView></RouterView>
  </template>
  
  <script setup lang="ts">
  import { RouterLink } from 'vue-router';
  </script>
  
  <style scoped>
  .navbar {
    background-color: #333;
    padding: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .navbar > div {
    flex: 1;
  }
  
  .nav-link {
    color: #fff;
    text-decoration: none;
    padding: 10px;
  }
  
  .nav-link:hover {
    background-color: #444;
  }
  </style>
  