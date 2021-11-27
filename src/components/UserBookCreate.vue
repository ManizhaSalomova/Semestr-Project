<template>
  <v-container grid-list-md>
    <v-row align="center" justify="center">
      <v-col class="align-center">
        <v-row class="align-center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-alert v-if="showMsg === 'error'"
                     dismissible
                     :value="true"
                     type="error"
            >
              Please verify UserBook information.
            </v-alert>
          </v-col>
        </v-row>
        <v-col cols="12" align="center" justify="center">
          <blockquote>
            Welcome {{validUserName}}!
            <footer>
              <small>
                <em class="blue--text text-h6">Book Title</em>
              </small>
            </footer>
          </blockquote>
        </v-col>
        <v-row align="center" justify="center" dense>
        <v-col 
          cols="12" 
          sm="8" 
          md="4" 
          lg="4">
         <v-card elevation="0" align="center" >
          <v-img
            :src="require('@/assets/images/review.jpeg')">
          </v-img>                   
         </v-card>
         </v-col>
      </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-card class="login-card">
              <v-card-title>
                <span class="headline">{{pageTitle}}</span>
              </v-card-title>
              <v-spacer/>

              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-container>

                    <v-select
                    v-model="userBook.book"
                    label="Book Title"
                    :items="list"
                    item-value='pk'
                    item-text='title'
                    ></v-select>


                    <v-text-field
                    v-model="userBook.status"
                    label="Status"
                    required
                    />

                    <v-text-field
                    v-model="userBook.rating"
                    label="Rating"
                    required
                    type="number"
                    />

                </v-container>
                <v-btn v-if="!isUpdate" class="blue white--text" @click="createUserBook">Save</v-btn>
                <v-btn v-if="isUpdate" class="blue white--text" @click="updateUserBook">Update</v-btn>
                <v-btn class="white black--text" @click="cancelOperation">Cancel</v-btn>

                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>  
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();

  export default {
    name: 'UserBookCreate',
    components: {},
    data() {
      return {
        books: [],
        showError: false,
        userBook: {},
        pageTitle: "Rate thevBook",
        isUpdate: false,
        showMsg: '',
      };
    },
     computed:{
      list:{
      get () {
            return this.books
        },
          set (newValue) {
            this.books = newValue
          }
      }
    },
    methods: {
      getBooks() {
        apiService.getBookList().then(response => {
          this.books = response.data.data;
          if (localStorage.getItem("isAuthenticates")
            && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
            this.validUserName = JSON.parse(localStorage.getItem("log_user"));
          }
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
            router.push("/auth");
          }
        });
      },  
      createUserBook() {
        apiService.addNewUserBook(this.userBook).then(response => {
          if (response.status === 201) {
            this.userBook = response.data;
             this.showMsg = "";
            router.push('/userbook-list/new');
          }else{
              this.showMsg = "error";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
      },
      cancelOperation(){
         router.push("/userBook-list");
      },
      updateUserBook() {
        apiService.updateUserBook(this.userBook).then(response => {
          if (response.status === 200) {
            this.userBook = response.data;
            router.push('/userBook-list/update');
          }else{
              this.showMsg = "error";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
      }
    },
    mounted() {
      this.getBooks();
      if (this.$route.params.pk) {
        this.pageTitle = "Edit UserBook";
        this.isUpdate = true;
        apiService
          .getUserBook(this.$route.params.pk)
          .then(response => {
          this.userBook = response.data;
        })
        .catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }
        });
      }
    },
  }
</script>
<style scoped>
  .aform {
    margin-left: auto;
    width: 60%;
  }
</style>
