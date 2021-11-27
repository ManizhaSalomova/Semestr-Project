<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
             <v-card elevation="0" align="center" justify="center">
              <v-img :src="require('@/assets/images/readfeed.png')" height="100%" width="50%"></v-img>
              <v-card-text>
                <v-form>
                  <v-text-field label="Enter username" name="name" prepend-inner-icon="mdi-account" type="text" class="rounded-0" outlined></v-text-field>
                  <v-text-field label="Enter your email" name="email" prepend-inner-icon="mdi-email" type="email" class="rounded-0" outlined></v-text-field>
                  <v-text-field label="Enter your password" name="password" prepend-inner-icon="mdi-lock" type="password" class="rounded-0" outlined></v-text-field>
                  <v-text-field label="Re-enter password" name="password" prepend-inner-icon="mdi-lock-outline" type="password" class="rounded-0" outlined></v-text-field>
                  <v-btn class="info" :disabled="!valid" @click="SignUp">Signup</v-btn>
                  <!--<v-btn class="rounded-0" color="" x-large block href="Auth">Let's Go</v-btn>-->
                  <v-card-actions class="text--secondary">
                    <v-spacer></v-spacer>
                    <!-- <router-link :to="{ name: 'SignUp' }">Sign Up</router-link> -->
                    Already have an account? <a href="Auth" class="pl-2" style="color: #000000">Sign In</a>
                  </v-card-actions>
                </v-form>
              </v-card-text>
              <v-card-actions class="ml-6 mr-6 text-center">
                <p>By continuing, you agree to this website's <a href="#" class="pl-2" style="color: #000000">Policy</a> and <a href="#" class="pl-2" style="color: #000000">Terms of Use</a></p>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();

  export default {
    name: 'Signup',

    data: () => ({
      credentials: {},
      valid: true,
      showMsg: '',
      loading: false,
      rules: {
        username: [
          v => !!v || "Username is required",
          v => (v && v.length > 3) || "A username must be more than 3 characters long",
          v => /^[a-z0-9_]+$/.test(v) || "A username can only contain letters and digits"
        ],
        password: [
          v => !!v || "Password is required",
          v => (v && v.length > 7) || "The password must be longer than 7 characters"
        ]
      },
      showPassword: false,
    }),
    methods: {
      Signup() {
        // checking if the input is valid
        if (this.$refs.form.validate()) {
          this.loading = true;
            apiService.authenticateSignup(this.credentials).then((res)=>{
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('isAuthenticates', JSON.stringify(true));
            localStorage.setItem('register_user', JSON.stringify(this.credentials.username));
            //router.push("/");
            //router.go(-1);
             window.location = "/"
          }).catch(e => {
            this.loading = false;
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('register_user');
            localStorage.removeItem('token');
           // router.go(-1);
            this.showMsg = 'error';
          })
        }
      }
    }
  }
</script>

<style lang="css" scoped>
</style>