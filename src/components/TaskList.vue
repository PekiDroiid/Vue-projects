<template>
  <div class="task-list">
    <slot name="header"></slot>
    <ul>
      <li v-if="tasks.length === 0" class="empty-message">No hay tareas por hacer.</li>
      <task-item
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @taskCompleted="handleTaskCompleted"
        @taskDeleted="handleTaskDeleted"
      ></task-item>
    </ul>
    <div class="task-form">
      <input type="text" v-model="newTaskTitle" placeholder="Agregar nueva tarea" @keyup.enter="addTask">
      <button @click="addTask">Agregar</button>
    </div>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue';

export default {
  components: {
    TaskItem,
  },
  props: {
    tasks: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newTaskTitle: '',
    };
  },
  methods: {
    addTask() {
      if (this.newTaskTitle.trim() !== '') {
        const newTask = {
          id: Date.now(),
          title: this.newTaskTitle,
          completed: false,
        };
        this.$emit('taskAdded', newTask);
        this.newTaskTitle = '';
      }
    },
    handleTaskCompleted(taskId) {
      this.$emit('taskCompleted', taskId);
    },
    handleTaskDeleted(taskId) {
      this.$emit('taskDeleted', taskId);
    },
  },
};
</script>

<style scoped>
.task-list {
  max-width: 400px;
  margin: auto;
}

.empty-message {
  color: #888;
}

.task-form {
  margin-top: 20px;
}

.task-form input {
  padding: 8px;
  width: 70%;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.task-form button {
  padding: 8px 16px;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}
</style>
