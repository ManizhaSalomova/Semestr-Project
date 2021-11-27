<template>
  <v-container grid-list-md>
    <v-row align="center" justify="center">
      <v-col class="align-center">
        <v-row class="align-center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-alert
              v-if="showMsg === 'error'"
              dismissible
              :value="true"
              type="error"
            >
              Please verify Author information.
            </v-alert>
          </v-col>
        </v-row>
        <v-col cols="12" align="center" justify="center">
          <blockquote>
            Welcome {{validUserName}}!
            <footer>
              <small>
                <em class="blue--text text-h6">Author's Information</em>
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
            :src="require('@/assets/images/middle.jpeg')">
          </v-img>                   
         </v-card>
         </v-col>
      </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-card class="login-card">
              <v-card-title>
                <span class="headline">{{ pageTitle }}</span>
              </v-card-title>
              <v-spacer />

              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-container>

                    <v-text-field
                      v-model="author.name"
                      label="Author's name"
                      required
                    />

                    <v-text-field
                      v-model="author.date_of_birth"
                      label="Date of Birth"
                      required
                      type="date"
                    />

                    <v-text-field
                      v-model="author.date_of_death"
                      label="Date of Death "
                      required
                      type="date"
                    />
                  </v-container>
                  <v-btn
                    v-if="!isUpdate"
                    @click="createAuthor"
                    >Save
                  </v-btn
                  >
                  <v-btn
                    v-if="isUpdate"
                    @click="updateAuthor"
                    >Update
                  </v-btn
                  >
                  <v-btn 
                    class="white black--text" 
                    @click="cancelOperation"
                    >Cancel
                  </v-btn
                  >
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
import router from "../router";
import { APIService } from "../http/APIService";
const apiService = new APIService();

export default {
  name: "AuthorCreate",
  components: {},
  data() {
    return {
      showError: false,
      author: {},
      pageTitle: "Add New Author",
      isUpdate: false,
      showMsg: "",
    };
  },
  methods: {
    createAuthor() {
      apiService
        .addNewAuthor(this.author)
        .then((response) => {
          if (response.status === 201) {
            this.author = response.data;
            this.showMsg = "";
            router.push("/author-list/new");
          } else {
            this.showMsg = "error";
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            router.push("/auth");
          } else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
    },
    cancelOperation() {
      router.push("/author-list");
    },
    updateAuthor() {
      apiService
        .updateAuthor(this.author)
        .then((response) => {
          if (response.status === 200) {
            this.author = response.data;
            router.push("/author-list/update");
          } else {
            this.showMsg = "error";
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            router.push("/auth");
          } else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
    },
  },
  mounted() {
    this.getBooks();
    if (this.$route.params.pk) {
      this.pageTitle = "Edit Author";
      this.isUpdate = true;
      apiService
        .getAuthor(this.$route.params.pk)
        .then((response) => {
          this.author = response.data;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            router.push("/auth");
          }
        });
    }
  },
};
</script>
<style scoped>
.aform {
  margin-left: auto;
  width: 60%;
}
</style>
