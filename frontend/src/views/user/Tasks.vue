<template>
  <v-card>
    <div>Hola mundo</div>
    <ul v-for="task in tasksList" :key="task.id">
      <li>{{ task.title }}</li>
    </ul>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    tasksList: [],
  }),
  created: async function () {
    await this.listTasks();
  },
  methods: {
    async listTasks() {
      try {
        const res = await this.axios.get("/tasks");
        this.tasksList = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>