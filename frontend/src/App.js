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
      'notes': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8005/api/users/')
    .then(response => {
      const users = response.data
      this.setState({
        'users': users.results
      })
    })
    .catch(error => console.log(error))
    axios.get('http://127.0.0.1:8005/api/todo/projects/')
    .then(response => {
      const projects = response.data
      this.setState({
        'projects': projects.results
      })
    })
    .catch(error => console.log(error))
    axios.get('http://127.0.0.1:8005/api/todo/notes/')
    .then(response => {
      const notes = response.data
      this.setState({
        'notes': notes.results
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <>
        {/* Убрал в меню всю логику по машрутам на странице, мне кажется это более логично чем в основном теле приложения держать */}
        <Menu state = {this.state} />
        <Footer />
      </>
    )
  }
}

export default App;
