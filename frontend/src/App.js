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
    axios.get('http://todo_backend_nginx/api/users/', {headers})
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

    axios.get('http://todo_backend_nginx/api/todo/projects/', {headers})
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

    axios.get('http://todo_backend_nginx/api/todo/notes/', {headers})
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
    axios.post('http://todo_backend_nginx/auth/api-token/ ', {'username': email, 'password': password})
    .then(response => {
      console.log(response)
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

  createProject(name, url, activeUsers) {
    const headers = this.getHeaders()
    axios.post('http://todo_backend_nginx/api/todo/projects/', {'name': name, 'url': url, 'users': activeUsers}, {headers})
    .then(response => {
      this.loadData()
      alert('Project created!')
    })
    .catch(error => alert("Error ;)"))
  }

  createNote(project, text) {
    const headers = this.getHeaders()

    let userCreated = this.state.users.find(item => item.email === this.state.email).id;

    axios.post('http://todo_backend_nginx/api/todo/notes/', {'text': text, 'project': parseInt(project), 'userCreated': userCreated}, {headers})
    .then(response => {
      this.loadData()
      alert('Note created!')
    })
    .catch(error => {
      console.log(error)
      alert("Error ;)")
    })
  }

  deleteProject(id) {
    const headers = this.getHeaders()
    axios.delete(`http://todo_backend_nginx/api/todo/projects/${id}`, {headers})
    .then(response => {
      this.loadData()
      alert('Project delete!')
    })
    .catch(error => alert("Error!"))
  }

  closeNote(id) {
    const headers = this.getHeaders()
    axios.delete(`http://todo_backend_nginx/api/todo/notes/${id}`, {headers})
    .then(response => {
      this.loadData()
      alert('TODO Closed!')
    })
    .catch(error => alert("Error!"))
  }

  componentDidMount() {
    this.setState({'token': localStorage.getItem('token'), 'email': localStorage.getItem('email')}, this.loadData)
  }


  render() {
    return (
      <>
        <h3>{this.getUserName()}</h3>
        <hr />
        {/* Убрал в меню всю логику по машрутам на странице, мне кажется это более логично чем в основном теле приложения держать */}        
        <Menu isAuthenticated={() => this.isAuthenticated()} logout={() => this.logout()} login={(email, password) => this.login(email, password)} createProject={(name, url, activeUsers) => this.createProject(name, url, activeUsers)} createNote={(project, text) => this.createNote(project, text)} closeNote={(id) => this.closeNote(id)} deleteProject={(id) => this.deleteProject(id)} state={this.state}/>
        <Footer />
      </>
    )
  }
}

export default App;
