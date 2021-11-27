<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col align="center" justify="center" cols="12">
          <blockquote>
            &#8220;Welcome {{validUserName}}!&#8221;
            <footer>
              <small>
                <em>Book Library</em>
              </small>
            </footer>
          </blockquote>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" dense>
        <v-col 
          cols="12" 
          sm="8" 
          md="4" 
          lg="4">
         <v-card elevation="0" align="center" >
          <v-img
            :src="require('@/assets/images/readfeed.png')" height="100%" width="50%">
          </v-img>                   
         </v-card>
         </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row
        align="center"
        justify="center"
      >
        <v-col 
          cols="12"
          sm="8" 
          md="4" 
          lg="4"
        >
          <v-card class="elevation-0">
            <v-container
              fluid
              grid-list-md
            >
              <v-row>
                <v-col>
                  <v-card class="elevation-0"> 
                      <v-btn block  @click="viewUsers">User</v-btn>                    
                  </v-card>
                </v-col>
                <v-col>
                  <v-card class="elevation-0">               
                      <v-btn block  @click="viewBooks">Books</v-btn>         
                  </v-card>
                </v-col>
                <v-col>
                  <v-card class="elevation-0">                                      
                      <v-btn block  @click="viewAuthors">Authors</v-btn>         
                  </v-card>
                </v-col>
                <v-col>
                  <v-card class="elevation-0">                                     
                      <v-btn block  @click="viewUserBooks">User Book</v-btn>                 
                  </v-card> 
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
  import router from '../router';

  export default {
    name: 'Home',
    data: () => ({
      validUserName: "Guest"
    }),
    mounted() {
      this.getUser();
    },
    methods: {
      viewUsers() {
        router.push('/user-list');
      },
      viewBooks() {
        router.push('/book-list');
      },
      viewAuthors() {
        router.push('/author-list');
      },
      viewUserBooks() {
        router.push('/userbook-list');
      },
      getUser() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          this.validUserName = JSON.parse(localStorage.getItem("log_user"));
        }
      }
    }
  }
</script>



<!--<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0" align="center" justify="center">
              
              <v-img :src="require('@/assets/images/readfeed.png')" height="100%" width="50%"></v-img>
             
              <v-card-text>
                <v-col>   
                  <v-btn class="rounded-0" color="" x-large block href="Signup">Create Account</v-btn>
                </v-col>  
                <v-col> 
                    
                  <v-btn class="rounded-0" color="" x-large block href="Auth">Login</v-btn>  
                </v-col>
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
  export default {
    name: 'Home',
    data: () => ({
      validUserName: "Guest"
    }),
    mounted() {
      this.getUser();
    },
    methods: {
      viewUsers() {
        router.push('/user-list');
      },
       viewAuthorss() {
        router.push('/author-list');
      },

      viewBooks() {
        router.push('/book-list');
      },
      
       viewUserBooks() {
        router.push('/userBook-list');
      },


      getUser() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          this.validUserName = JSON.parse(localStorage.getItem("log_user"));
        }
      }
    }
  }
</script>-->