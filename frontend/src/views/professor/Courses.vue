<template>
  <v-container>
    <v-alert text v-model="alert.show" :type="alert.type" dismissible>{{
      alert.message
    }}</v-alert>
    <h1 class="font-weight-light">My courses</h1>
    <v-row justify="center">
      <v-card
        class="ma-3"
        max-width="344"
        v-for="course in coursesList"
        :key="course.id"
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        ></v-img>
        <v-card-title>{{ course.name }}</v-card-title>
        <v-card-subtitle>{{ course.description }}</v-card-subtitle>
        <v-card-actions>
          <v-btn color="blue" small dark fab @click="readCourse(course.id)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn color="red" small dark fab @click="deleteCourse(course.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="purple" text> assignments </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-dialog v-model="addCourseDialog" max-width="450"
      ><v-card>
        <v-card-title>Create a course</v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="addCourse()"
            ref="addCourseForm"
            class="ma-3"
          >
            <v-text-field
              v-model="newCourse.name"
              prepend-icon="mdi-biohazard"
              label="Name"
              :rules="[(v) => !!v || 'Name is required']"
            ></v-text-field>
            <v-textarea
              v-model="newCourse.description"
              prepend-icon="mdi-bike"
              label="Description"
              :rules="[(v) => !!v || 'Description is required']"
            ></v-textarea>
            <v-btn block class="success mt-3" type="submit">Add</v-btn>
          </v-form>
        </v-card-text>
      </v-card></v-dialog
    >
    <v-dialog v-model="edit" max-width="450"
      ><v-card>
        <v-card-title>Update a course</v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="editCourse()"
            ref="editCourseForm"
            class="ma-3"
          >
            <v-text-field
              v-model="selectedCourse.name"
              prepend-icon="mdi-biohazard"
              label="Name"
              :rules="[(v) => !!v || 'Name is required']"
            ></v-text-field>
            <v-textarea
              v-model="selectedCourse.description"
              prepend-icon="mdi-bike"
              label="Description"
              :rules="[(v) => !!v || 'Description is required']"
            ></v-textarea>
            <v-btn block class="info mt-3" type="submit">UPDATE</v-btn>
          </v-form>
        </v-card-text>
      </v-card></v-dialog
    >
    <v-btn
      @click="addCourseDialog = true"
      color="red"
      large
      right
      fixed
      bottom
      fab
      dark
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    professor: {},
    coursesList: [],
    newCourse: {
      name: "",
      description: "",
    },
    addCourseDialog: false,
    edit: false,
    alert: {
      show: false,
      message: "",
    },
    selectedCourse: {},
  }),
  created: async function () {
    this.professor = JSON.parse(sessionStorage.getItem("session"));
    console.log(this.professor);
    if (this.professor == null) {
      this.$router.push("/");
    } else if (this.professor.role != "professor") {
      this.$router.push("/profile");
    } else {
      this.listCourses();
    }
  },
  methods: {
    async listCourses() {
      try {
        const res = await this.axios.post("/professor/course/list", {
          professor_id: this.professor.id,
        });
        this.coursesList = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addCourse() {
      let valid = this.$refs.addCourseForm.validate();
      if (!valid) {
        return;
      }

      this.newCourse.professor_id = this.professor.id;
      try {
        const res = await this.axios.post("/professor/course", this.newCourse);

        if (res.data.error) {
          alert("error!");
        } else {
          this.coursesList.push(res.data.course);
          this.$refs.addCourseForm.reset();
          this.addCourseDialog = false;
          this.alert = {
            show: true,
            type: "success",
            message: res.data.message,
          };
        }
      } catch (error) {
        console.log(error);
      }
    },
    async readCourse(course_id) {
      try {
        const res = await this.axios.get(`/professor/course/${course_id}`);
        this.selectedCourse = res.data.course;
        this.edit = true;
      } catch (error) {
        console.log(error);
      }
    },
    async editCourse() {
      let valid = this.$refs.editCourseForm.validate();
      if (!valid) {
        return;
      }

      try {
        const res = await this.axios.put(
          `/professor/course/${this.selectedCourse.id}`,
          this.selectedCourse
        );
        const index = this.coursesList.findIndex(
          (c) => c.id == this.selectedCourse.id
        );
        this.coursesList[index].name = res.data.course.name;
        this.coursesList[index].description = res.data.course.description;
        this.edit = false;
        this.$refs.editCourseForm.reset();
        this.alert = {
          show: true,
          type: "success",
          message: res.data.message,
        };
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCourse(course_id) {
      try {
        const res = await this.axios.delete(`/professor/course/${course_id}`);
        const index = this.coursesList.findIndex((c) => c.id == course_id);
        this.coursesList.splice(index, 1);
        this.alert = {
          show: true,
          type: "info",
          message: res.data.message,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
