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
                <em>Book Title</em>
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
            New book has been added.
          </v-alert>
          <v-alert v-if="showMsg === 'update'" dismissible
                   :value="true"
                   type="success"
          >
           Book information has been updated.
          </v-alert>
          <v-alert v-if="showMsg === 'deleted'" dismissible
                   :value="true"
                   type="success"
          >
            Selected Book has been deleted.
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
          Search Book
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
              :items="books"
              class="elevation-1"
              style="max-height: 300px; overflow-y: auto"
              v-if="!isMobile"
            >
                    <template v-slot:item="props">
                      <tr>
                        <!--<td align="left">{{ props.item.user_id }}</td>-->
                        <td align="left">{{ props.item.name }}</td>
                        <td align="left">{{ props.item.title }}</td>
                        <td nowrap="true" align="left">{{ props.item.description }}</td>
                        <td nowrap="true" align="left">{{ props.item.isbn }}</td>
                        <td nowrap="true" align="left">{{ props.item.year }}</td>
                        <td align="center"><v-icon @click="updateBook(props.item)">mdi-pencil</v-icon></td>
                        <td align="center"><v-icon @click="deleteBook(props.item)">mdi-delete</v-icon></td>
                      </tr>  
                    </template>
              </v-data-table>
              <v-data-iterator 
                :items="books"
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
                          
                          <v-col cols="9" class="text-left body-2 text-truncate">{{ item.name }}</v-col>
                          <v-col cols="3" class="text-center">
                            <v-card-actions>
                              <v-icon @click="updateBook(item)" class="small">mdi-pencil</v-icon>
                              <v-icon @click="deleteBook(item)" class="small">mdi-delete</v-icon>
                              <v-icon @click.native="expand(item, !isExpanded(item))" class="small">mdi-dots-horizontal</v-icon>
                            </v-card-actions>
                          </v-col>
                        </v-card-title>
                        <v-divider></v-divider>

                        <v-list v-show="isExpanded(item)" dense>
                          <v-list-item>
                            <v-list-item-content>Tile:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.title }}</v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Description:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.description }}</v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>ISBN:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.isbn }}</v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Year:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.year }}</v-list-item-content>
                          </v-list-item>
                        </v-list>
                        
                      </v-card>
                    </v-col>
                  </v-row>
                </template>     
              </v-data-iterator>  
              <v-btn class="mt-4" @click="addNewBook">Add Book</v-btn>  
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
    name: "BookList",
    data: () => ({
      books: [],
      search: '',
      validUserName: "Guest",
      bookSize: 0,
      showMsg: '',
      isMobile: false,
      headers: [
        {
            text: 'Author',
            align: 'start',
            sortable: false,
            value: 'title',
          },
       
        {text: 'Title', sortable: false, align: 'left',},
        {text: 'Description', sortable: false, align: 'left',},
        {text: 'ISBN', sortable: false, align: 'left',},
        {text: 'Year', sortable: false, align: 'left',},
        {text: 'Update', sortable: false, align: 'left',},
        {text: 'Delete', sortable: false, align: 'left',}
      ],

    }),
    mounted() {
      this.getBooks();
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
      getBooks() {
        apiService.getBookList().then(response => {
          this.books = response.data.data;
          this.bookSize = this.books.length;
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
      addNewBook() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          router.push('/book-create');
        } else {
          router.push("/auth");
        }
      },
      updateBook(book) {
        router.push('/book-create/' + book.pk);
      },
      deleteBook(book) {
        apiService.deleteBook(book.pk).then(response => {
          if (response.status === 204) {
            router.push('/book-list/deleted/')
            this.getBooks()
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
