<template>
  <li :class="{ completed: task.completed }">
    <input type="checkbox" v-model="task.completed" @change="completeTask">
    <span>{{ task.title }}</span>
    <button @click="deleteTask">Eliminar</button>
  </li>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    completeTask() {
      this.$emit('tarea completada', this.task.id);
    },
    deleteTask() {
      this.$emit('tarea eliminada', this.task.id);
    },
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
