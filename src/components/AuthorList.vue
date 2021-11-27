<template>
  <v-main>
    <!-- Welcome title -->
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" align="center" justify="center">
          <blockquote>
            Welcome {{validUserName}}!
            <footer>
              <small>
                <em>&mdash;Author's List</em>
              </small>
            </footer>
          </blockquote>
        </v-col>
        <v-col  cols="12" md="10" lg="10" align="center" justify="center">
          <v-alert v-if="showMsg === 'new'"
                   dismissible
                   :value="true"
                   type="success"
          >
            New Author has been added.
          </v-alert>
          <v-alert v-if="showMsg === 'update'" dismissible
                   :value="true"
                   type="success"
          >
           Author information has been updated.
          </v-alert>
          <v-alert v-if="showMsg === 'deleted'" dismissible
                   :value="true"
                   type="success"
          >
            Selected Author has been deleted.
          </v-alert>
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

      <!-- Data table -->
      <v-row align="center" justify="center">
        <v-col cols="12" md="5" v-resize="onResize">
               <v-card-title>
          Search Author
          <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              
            >
            </v-text-field>
         </v-card-title>
            <v-data-table
              :search="search"
              :headers="headers"
              :items="authors"
              class="elevation-1"
              style="max-height: 300px; overflow-y: auto"
              v-if="!isMobile"
            >
                    <template v-slot:item="props">
                      <tr>
                        <td align="left">{{ props.item.name }}</td>
                        <td aling="left"> {{ props.item.date_of_birth }}</td>
                        <td nowrap="true" align="left">{{ props.item.date_of_death }}</td>
                        <td align="center"><v-icon @click="updateAuthor(props.item)">mdi-pencil</v-icon></td>
                        <td align="center"><v-icon @click="deleteAuthor(props.item)">mdi-delete</v-icon></td>
                      </tr>  
                    </template>
              </v-data-table>
              <v-data-iterator 
                :items="authors"
                hide-default-footer
                v-else
              >
                <template v-slot:default="{ items, isExpanded, expand }">
                  <v-row>
                    <v-col
                      v-for="item in items"
                      :key="item.name"
                      cols="12"
                    >
                      <v-card>
                        <v-card-title class="pb-0 pt-0 pl-0">
                          <v-col cols="9" class="text-left body-2 text-truncate">{{item.name}}</v-col>
                          <v-col cols="3" class="text-center">
                            <v-card-actions>
                              <v-icon @click="updateAuthor(item)" class="small">mdi-pencil</v-icon>
                              <v-icon @click="deleteAuthor(item)" class="small">mdi-delete</v-icon>
                              <v-icon @click.native="expand(item, !isExpanded(item))" class="small">mdi-dots-horizontal</v-icon>
                            </v-card-actions>
                          </v-col>
                        </v-card-title>
                        <v-divider></v-divider>

                        <v-list v-show="isExpanded(item)" dense>
                          <v-list-item>
                            <v-list-item-content>Name:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.name }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Date Of Birth:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.date_of_birth }}</v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Date Of Death:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.date_of_death }}</v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>     
              </v-data-iterator>  
              <v-btn class="mt-4 " @click="addNewAuthor">Add Author</v-btn>  
        </v-col>  
      </v-row>
    </v-container>  
  </v-main>
</template>


<script>

  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();

  export default {
    name: "AuthorList",
    data: () => ({
      search: '',
      authors: [],
      validUserName: "Guest",
      authorSize: 0,
      showMsg: '',
      isMobile: false,
      headers: [
         {
            text: 'Author Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
        {text: 'Date Of Birth', sortable: false, align: 'left',},
        {text: 'Date Of Death', sortable: false, align: 'left',},
        {text: 'Update', sortable: false, align: 'left',},
        {text: 'Delete', sortable: false, align: 'left',}
      ],

    }),
    mounted() {
      this.getAuthors();
      this.showMessages();
    },
    methods: {
      onResize() {
          if (window.innerWidth > 600)
            this.isMobile = false;
          else  
            this.isMobile = true;
        },
      showMessages(){
        console.log(this.$route.params.msg)
        if (this.$route.params.msg) {
          this.showMsg = this.$route.params.msg;
        }
      },
      getAuthors() {
        apiService.getAuthorList().then(response => {
          this.authors = response.data.data;
          this.authorSize = this.authors.length;
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
      addNewAuthor() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          router.push('/author-create');
        } else {
          router.push("/auth");
        }
      },
      updateAuthor(author) {
        router.push('/author-create/' + author.pk);
      },
      deleteAuthor(author) {
        apiService.deleteAuthor(author.pk).then(response => {
          if (response.status === 204) {
            router.push('/author-list/deleted/')
            this.getAuthors()
          }
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
            router.push("/auth");
          }
        });
      }
    }
  };
</script>
