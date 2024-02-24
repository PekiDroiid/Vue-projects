<template>
    <tbody>
      <tr>
        <td>{{ user.id }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.password }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.age }}</td>
        <td>
          <div class="action-buttons">
            <div>
              <a @click="editUser(user)" class="edit-button">Editar</a>
            </div>
            <div>
              <a @click="deleteUser(user.id)" class="delete-button">Eliminar</a>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </template>
  
  <script setup lang="ts">
  import type IUser from '@/interfaces/IUser.ts';
  import { defineProps, defineEmits } from 'vue';
  
  const user = defineProps<IUser>();
  const emits = defineEmits(['delete', 'update']);
  
  const deleteUser = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      emits("delete", id);
    }
  };
  
  const editUser = (usuario: IUsuario) => {
    emits("update", usuario);
  };
  </script>
  
  <style scoped>
  .action-buttons {
    display: flex;
    justify-content: space-between;
  }
  
  .edit-button,
  .delete-button {
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .edit-button:hover,
  .delete-button:hover {
    background-color: #f0f0f0;
  }
  </style>
  