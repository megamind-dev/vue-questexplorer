<template>
  <div class="login">
    <div class="loginForm">
      <div class="title">
        <p>Quest</p>
      </div>
      <div class="card-content">
        <div>
          <button class="button facebooBtn">
            <i class="fa fa-facebook-official fa-lg" aria-hidden="true"></i>
            Login with Facebook
          </button>
        </div>
        <div class="separator">
          <h2>OR</h2>
        </div>
        <form @submit="handleSignup">
          <section>
            <b-input
              type="email"
              name="email"
              placeholder="Email"
              required
              v-model="registerEmail"
            >
            </b-input>
            <b-input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              v-model="registerFullName"
            >
            </b-input>
            <b-input
              type="text"
              name="username"
              placeholder="username"
              required
              v-model="registerUsername"
            >
            </b-input>
            <b-input
              type="password"
              name="password"
              placeholder="Password"
              required
              v-model="registerPassword"
              password-reveal
            >
            </b-input>
          </section>
          <button type="submit" class="button loginBtn">Sign Up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SlotMixin from "@/mixins/slot";
import { createUserMutation } from "../graphql/mutations/user";

export default {
  name: "card",
  mixins: [SlotMixin],
  data() {
    return {
      registerEmail: "",
      registerFullName: "",
      registerUsername: "",
      registerPassword: ""
    };
  },
  methods: {
    handleSignup(event) {
      if (event) event.preventDefault();
      const {
        registerEmail,
        registerFullName,
        registerUsername,
        registerPassword
      } = this;
      this.$apollo
        .mutate({
          mutation: createUserMutation,
          variables: {
            fullName: registerFullName,
            username: registerUsername,
            authProvider: {
              email: {
                email: registerEmail,
                password: registerPassword
              }
            }
          }
        })
        .then(data => {
          // Result
          this.$toast.open({
            duration: 5000,
            message: "Registeration is success",
            position: "is-top",
            type: "is-success"
          });
          localStorage.setItem("token", data.data.createUser.id);
        })
        .catch(error => {
          // Error
          this.$toast.open({
            duration: 5000,
            message: error.message,
            position: "is-top",
            type: "is-danger"
          });
        });
    }
  }
};
</script>
