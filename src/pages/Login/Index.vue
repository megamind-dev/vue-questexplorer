<template>
  <div>
    <v-navigationbar></v-navigationbar>
    <div>
      <div class="columns margin-t-60">
        <div class="column has-text-right">
          <div class="column is-6 is-offset-6">
            <img src="../../assets/images/mobile.png">
          </div>
        </div>
        <div class="column">
          <div class="column is-half">
            <div class="login" v-if="!loginEnabled">
              <form-login></form-login>
              <div class="btnForm">
                <span>
                  Don’t have an account?
                </span>
                <span class="signup" @click="goSignup">
                  Sign up
                </span>
              </div>
            </div>
            <div class="login" v-if="loginEnabled">
              <form-signup></form-signup>
              <div class="btnForm">
                <span>
                  Have an account?
                </span>
                <span class="signup" @click="goLogin">
                  Login
                </span>
              </div>
            </div>
            <form-store></form-store>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VNavigationbar from '@/layouts/NavigationBar';
  import FormLogin from '@/components/FormLogin';
  import FormSignup from '@/components/FormSignup';
  import FormStore from '@/components/FormStore';

  export default {
    name: 'login-index',
    components: {
      VNavigationbar,
      FormLogin,
      FormSignup,
      FormStore,
    },
    data() {
      return {
        loginEnabled: false,
      };
    },
    methods: {
      goLogin() {
        this.loginEnabled = false;
      },
      goSignup() {
        this.loginEnabled = true;
      },
    },
  };
</script>
