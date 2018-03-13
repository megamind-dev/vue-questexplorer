<template>
  <div class="login">
    <div class="loginForm">
      <div class="title">
        <p>Quest</p>
      </div>
      <div class="card-content">
        <form @submit="handleLogin">
          <section>
            <b-input
              type="email"
              placeholder="Email"
              required
              v-model="loginEmail"
            >
            </b-input>
            <b-input
              type="password"
              placeholder="Password"
              required
              v-model="loginPassword"
              password-reveal
            >
            </b-input>
          </section>
          <button type="submit" class="button loginBtn">Login</button>
        </form>
        <button class="button forgotBtn">Forgot password?</button>
      </div>
    </div>
  </div>
</template>

<script>
import SlotMixin from "@/mixins/slot";
import { mapState } from "vuex";
import { loginUserMutation } from "../graphql/mutations/user";

export default {
  name: "card",
  mixins: [SlotMixin],
  computed: mapState({
    // arrow functions can make the code very succinct!
    count: state => state.count,

    // passing the string value 'count' is same as `state => state.count`
    countAlias: "count",

    // to access local state with `this`, a normal function must be used
    countPlusLocalState(state) {
      return state.count + this.localCount;
    }
  }),
  data() {
    return {
      loginEmail: "fabio.passos0203@gmail.com",
      loginPassword: "sheqjrh1991"
    };
  },
  methods: {
    handleLogin(event) {
      // this.formValidation(); // Todo: detailed form validation needed
      if (event) event.preventDefault();
      const { loginEmail, loginPassword } = this;
      this.$apollo
        .mutate({
          mutation: loginUserMutation,
          variables: {
            email: {
              email: loginEmail,
              password: loginPassword
            }
          }
        })
        .then(data => {
          // Result
          this.$toast.open({
            duration: 5000,
            message: "Login is success",
            position: "is-top",
            type: "is-success"
          });
          localStorage.setItem("token", data.data.signinUser.token);
          localStorage.setItem("userId", data.data.signinUser.user.id);
          this.$router.push("add-photo");
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
