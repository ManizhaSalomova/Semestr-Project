import axios from 'axios';
const API_URL = 'https://manizha83.pythonanywhere.com/'; /*'msalomova.pythonanywhere.com'; 'https://book-api2021.herokuapp.com' ; /*'https://books-groyce.pythonanywhere.com'; /* 'http://localhost:8000' http://127.0.0.1:8000/ or  'https://books-groyce.pythonanywhere.com'*/
 

export class APIService {
  constructor() {

  }

  getUser(param_pk) {
    const url = `${API_URL}/api/users/${param_pk}`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::"+jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
 }

  getUserList() {
   const url = `${API_URL}/api/users/`;
   let jwtToken = localStorage.getItem('token');
   console.log(":::jwtToken:::::"+jwtToken);
   const headers = {Authorization: `jwt ${jwtToken}`};
   return axios.get(url, {headers: headers});

 }

 addNewUser(user){
  const url = `${API_URL}/api/users/`;
  let jwtToken = localStorage.getItem('token');
  const headers = {Authorization: `jwt ${jwtToken}`};
  return axios.post(url, user, {headers: headers});
 }

 updateUser(user){
   const url = `${API_URL}/api/users/${user.pk}`;
   let jwtToken = localStorage.getItem('token');
   const headers = {Authorization: `jwt ${jwtToken}`};
   return axios.put(url, user, {headers: headers});
 }

 deleteUser(user_Pk){
    const url = `${API_URL}/api/users/${user_Pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.delete(url, {headers: headers});
 }

 getAuthor(param_pk) {
  const url = `${API_URL}/api/authors/${param_pk}`;
  let jwtToken = localStorage.getItem('token');
  console.log(":::jwtToken:::::"+jwtToken);
  const headers = {Authorization: `jwt ${jwtToken}`};
  return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
}


getAuthorList() {
    const url = `${API_URL}/api/authors`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});

}

addNewAuthor(author){
  const url = `${API_URL}/api/authors/`;
  let jwtToken = localStorage.getItem('token');
  const headers = {Authorization: `jwt ${jwtToken}`};
  return axios.post(url, author, {headers: headers});
}

updateAuthor(author){
 const url = `${API_URL}/api/authors/${author.pk}`;
 let jwtToken = localStorage.getItem('token');
 const headers = {Authorization: `jwt ${jwtToken}`};
 return axios.put(url, author, {headers: headers});
}

deleteAuthor(author_Pk){
  const url = `${API_URL}/api/authors/${author_Pk}`;
  let jwtToken = localStorage.getItem('token');
  const headers = {Authorization: `jwt ${jwtToken}`};
  return axios.delete(url, {headers: headers});
}


getBook(param_pk) {
  const url = `${API_URL}/api/books/${param_pk}`;
  let jwtToken = localStorage.getItem('token');
  console.log(":::jwtToken:::::"+jwtToken);
  const headers = {Authorization: `jwt ${jwtToken}`};
  return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
}

getBookList() {
    const url = `${API_URL}/api/books`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});

}

addNewBook(book){
const url = `${API_URL}/api/books/`;
let jwtToken = localStorage.getItem('token');
const headers = {Authorization: `jwt ${jwtToken}`};
return axios.post(url, book, {headers: headers});
}

updateBook(book){
 const url = `${API_URL}/api/books/${book.pk}`;
 let jwtToken = localStorage.getItem('token');
 const headers = {Authorization: `jwt ${jwtToken}`};
 return axios.put(url, book, {headers: headers});
}

deleteBook(book_Pk){
  const url = `${API_URL}/api/books/${book_Pk}`;
  let jwtToken = localStorage.getItem('token');
  const headers = {Authorization: `jwt ${jwtToken}`};
  return axios.delete(url, {headers: headers});
}

getUserBook(param_pk) {
  const url = `${API_URL}/api/userbooks/${param_pk}`;
  let jwtToken = localStorage.getItem('token');
  console.log(":::jwtToken:::::"+jwtToken);
  const headers = {Authorization: `jwt ${jwtToken}`};
  return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
}

getUserBookList() {
 const url = `${API_URL}/api/userbooks/`;
 let jwtToken = localStorage.getItem('token');
 console.log(":::jwtToken:::::"+jwtToken);
 const headers = {Authorization: `jwt ${jwtToken}`};
 return axios.get(url, {headers: headers});

}

addNewUserBook(userbook){
const url = `${API_URL}/api/userbooks/`;
let jwtToken = localStorage.getItem('token');
const headers = {Authorization: `jwt ${jwtToken}`};
return axios.post(url, userbook, {headers: headers});
}

updateUserBook(userbook){
 const url = `${API_URL}/api/userbooks/${userbook.pk}`;
 let jwtToken = localStorage.getItem('token');
 const headers = {Authorization: `jwt ${jwtToken}`};
 return axios.put(url, userbook, {headers: headers});
}

deleteUserBook(userbook_Pk){
  const url = `${API_URL}/api/userbooks/${userbook_Pk}`;
  let jwtToken = localStorage.getItem('token');
  const headers = {Authorization: `jwt ${jwtToken}`};
  return axios.delete(url, {headers: headers});
}


authenticateLogin(credentials) {
    const url = `${API_URL}/auth/`;
    return axios.post(url, credentials);
  }
}
