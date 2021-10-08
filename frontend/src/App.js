import React from 'react';
import Menu from './componets/Menu';
import Footer from './componets/Footer';
import axios from 'axios';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'notes': [],
      'token': false,
      'email': ''
    }
  }

  getHeaders() {
    if (this.isAuthenticated()) {
      return {'Authorization': `Token ${this.state.token}`}
    } else {
      return {}
    }
  }

  getUserName() {
    if (this.isAuthenticated()) {
      return `Добро пожаловать снова! ${this.state.email}`
    } else {
      return 'Пожалуйста авторизуйтесь!'
    }
  }

  isAuthenticated() {
    return !!this.state.token
  }

  loadData() {
    const headers = this.getHeaders()
    axios.get('http://127.0.0.1:8005/api/users/', {headers})
    .then(response => {
      const users = response.data
      this.setState({
        'users': users.results
      })
    })
    .catch(error => {
      // console.log(error)
      this.setState({
        'users': []
      })
    })

    axios.get('http://127.0.0.1:8005/api/todo/projects/', {headers})
    .then(response => {
      const projects = response.data
      this.setState({
        'projects': projects.results
      })
    })
    .catch(error => {
      // console.log(error)
      this.setState({
        'projects': []
      })
    })

    axios.get('http://127.0.0.1:8005/api/todo/notes/', {headers})
    .then(response => {
      const notes = response.data
      this.setState({
        'notes': notes.results
      })
    })
    .catch(error => {
      // console.log(error)
      this.setState({
        'notes': []
      })
    })
  }

  login(email, password) {
    axios.post('http://127.0.0.1:8005/auth/api-token/ ', {'username': email, 'password': password})
    .then(response => {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('email', email)
      this.setState({'token': response.data.token, 'email': email}, this.loadData)
    })
    .catch(error => alert("Error ;)"))
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    this.setState({'token': false, 'email': ''}, this.loadData)
  }

  componentDidMount() {
    this.setState({'token': localStorage.getItem('token'), 'email': localStorage.getItem('email')}, this.loadData)
  }



  render() {
    return (
      <>
        <h3>{this.getUserName()}</h3>
        {/* Убрал в меню всю логику по машрутам на странице, мне кажется это более логично чем в основном теле приложения держать */}
        <Menu isAuthenticated={() => this.isAuthenticated()} logout={() => this.logout()} login={(email, password) => this.login(email, password)} state={this.state} />
        <Footer />
      </>
    )
  }
}

export default App;
