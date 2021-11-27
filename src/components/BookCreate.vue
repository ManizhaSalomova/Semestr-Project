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
              Please verify Book information.
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
            :src="require('@/assets/images/atlas.jpeg')">
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
                    v-model="book.user"
                    label="User ID"
                    :items="list"
                    item-value='pk'
                    item-text='user_id'
                    ></v-select>

                    <v-select
                    v-model="book.author"
                    label="Author Name"
                    :items="list"
                    item-value='pk'
                    item-text='name'
                    ></v-select>

                    <v-text-field
                    v-model="book.title"
                    label="Title"
                    required
                    />
                    <v-text-field
                    v-model="book.description"
                    label="Description"
                    required
                    />

                    <v-text-field
                    v-model="book.isbn"
                    label="ISBN"
                    required
                    type="number"
                    />

                    <v-text-field
                    v-model="book.year"
                    label="Year"
                    required
                    type="number"
                    />


                </v-container>
                <v-btn v-if="!isUpdate"  @click="createBook">Save</v-btn>
                <v-btn v-if="isUpdate" @click="updateBook">Update</v-btn>
                <v-btn @click="cancelOperation">Cancel</v-btn>

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
    name: 'BookCreate',
    components: {},
    data() {
      return {
        users: [],
        authors: [],
        showError: false,
        book: {},
        pageTitle: "Add New Book",
        isUpdate: false,
        showMsg: '',
      };
    },
    computed:{
      list:{
      get () {
            return this.users   
        },
          set (newValue) {
            this.users = newValue
      },
      get () {
            return this.authors   
        },
          set (newValue) {
            this.authors = newValue
            
          },
      },
    },

    methods: {
      getUsers() {
        apiService.getUserList().then(response => {
          this.users = response.data.data;
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
      getAuthors() {
        apiService.getAuthorList().then(response => {
          this.authors = response.data.data;
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

      createBook() {
        apiService.addNewBook(this.book).then(response => {
          if (response.status === 201) {
            this.book = response.data;
             this.showMsg = "";
            router.push('/book-list/new');
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
         router.push("/book-list");
      },
      updateBook() {
        apiService.updateBook(this.book).then(response => {
          if (response.status === 200) {
            this.book = response.data;
            router.push('/book-list/update');
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
      this.getUsers();
      this.getAuthors();
      if (this.$route.params.pk) {
        this.pageTitle = "Edit Book";
        this.isUpdate = true;
        apiService.getBook(this.$route.params.pk).then(response => {
          this.book = response.data;
        }).catch(error => {
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
