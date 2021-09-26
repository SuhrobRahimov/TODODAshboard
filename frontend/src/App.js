import React from 'react';
import UserList from './componets/Users';
import Menu from './componets/Menu';
import Footer from './componets/Footer';
import axios from 'axios';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8005/api/users/')
    .then(response => {
      const users = response.data
      this.setState({
        'users': users
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <div>
          <Menu/>
        </div>
        <div>
          <UserList users = {this.state.users}/>
        </div>
        <div>
          <Footer/>
        </div>
      </div>
    )
  }
}

export default App;
