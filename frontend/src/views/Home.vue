<template>
  <v-container>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        Mattweb
      </v-toolbar-title>
    </v-app-bar>
    <v-alert text v-model="alert.show" :type="alert.type" dismissible>{{
      alert.message
    }}</v-alert>
    <v-row justify="center">
      <v-col class="text-center" md="2" sm="2">
        <v-btn class="primary" @click="signupForm = true">sign up</v-btn>
      </v-col>
      <v-col class="text-center" md="2" sm="2">
        <v-btn class="success" @click="signupForm = false">sign in</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="6" sm="6">
        <v-card v-if="signupForm">
          <v-card-title>
            Sign Up
          </v-card-title>
          <v-card-text>
            <v-form class="ma-3" ref="signupForm" @submit.prevent="signUp()">
              <v-text-field
                label="Name"
                prepend-icon="mdi-account"
                :rules="nameRules"
                v-model="user.name"
              ></v-text-field>
              <v-text-field
                label="E-mail"
                prepend-icon="mdi-email"
                :rules="emailRules"
                v-model="user.email"
              ></v-text-field>
              <v-text-field
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                :rules="passwordRules"
                v-model="user.password"
              ></v-text-field>
              <v-radio-group
                row
                :rules="[(v) => !!v || 'Please choose one']"
                v-model="user.role"
              >
                <v-radio label="Professor" value="professor"> </v-radio>
                <v-radio label="Student" value="student"> </v-radio>
              </v-radio-group>
              <v-btn block class="primary mt-3" type="submit">sign up</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        <v-card v-else>
          <v-card-title>
            Sign In
          </v-card-title>
          <v-card-text>
            <v-form class="ma-3" ref="signinForm" @submit.prevent="signIn()">
              <v-text-field
                label="E-mail"
                prepend-icon="mdi-email"
                :rules="emailRules"
                v-model="user.email"
              ></v-text-field>
              <v-text-field
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                :rules="passwordRules"
                v-model="user.password"
              ></v-text-field>
              <v-radio-group
                row
                :rules="[(v) => !!v || 'Please choose one']"
                v-model="user.role"
              >
                <v-radio label="Professor" value="professor"> </v-radio>
                <v-radio label="Student" value="student"> </v-radio>
              </v-radio-group>
              <v-btn block class="success mt-3" type="submit">sign in</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Home",
  data: () => ({
    alert: { show: false, message: "", type: "info" },
    nameRules: [
      (value) => !!value || "Name is required",
      (value) =>
        (value && value.length >= 5) || "Name must be more than 5 characters",
    ],
    emailRules: [
      (value) => !!value || "E-mail is required",
      (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
    ],
    passwordRules: [
      (value) => !!value || "Password is required",
      (value) =>
        (value && value.length > 2) || "Name must be more than 2 characters",
    ],
    user: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    signupForm: true,
  }),
  methods: {
    async signUp() {
      let valid = this.$refs.signupForm.validate();
      if (!valid) {
        this.alert.show = true;
        this.alert.type = "error";
        this.alert.message = "Completa los campos invalidos";
        return;
      }
      try {
        const res = await this.axios.post("/signup", this.user);
        this.$refs.signupForm.reset();
        this.alert.show = true;
        this.alert.type = "success";
        this.alert.message = res.data.message;
      } catch (error) {
        this.alert.show = true;
        this.alert.type = "error";
        this.alert.message = error.response.data.message;
      }
    },
    async signIn() {
      let valid = this.$refs.signinForm.validate();
      if (!valid) {
        this.alert.show = true;
        this.alert.type = "error";
        this.alert.message = "Completa los campos invalidos";
        return;
      }

      try {
        const res = await this.axios.post("/signin", this.user);
        if (res.data.error) {
          this.alert.show = true;
          this.alert.type = "error";
          this.alert.message = res.data.message;
        } else {
          sessionStorage.setItem("session", JSON.stringify(res.data));
          this.$router.push("/profile");
        }
      } catch (error) {
        this.alert.show = true;
        this.alert.type = "error";
        this.alert.message = error.response.data.message;
      }
    },
  },
};
</script>
