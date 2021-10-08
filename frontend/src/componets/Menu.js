import React from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import UserList from "./Users";
import ProjectList from "./Projects";
import HomePage from "./Home";
import ProjectNoteList from "./Notes";
import LoginForm from "./LoginForm";

const NotFound = ({location}) => {
    return (
      <div>
        Page not found: {location.pathname}
      </div>
    )
  }


class Menu extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li><Link to='/home'>Home</Link></li>
                            <li><Link to='/users'>Users</Link></li>
                            <li><Link to='/projects'>Projects</Link></li>
                            <li>
                                { this.props.isAuthenticated() ?
                                    <button onClick={() => this.props.logout()}>Logout</button>:<Link to='/login'>Login</Link>
                                }
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                    <Route path='/login' component={()=> <LoginForm login={(email, password) => this.props.login(email, password)}/>} />
                        {/* Редирект таки обновляет страницу, отказался в пользу multipath */}
                        <Route path={["/home", "/"]} exact component={()=> <HomePage />} />
                        <Route path='/users' exact component={()=> <UserList users = {this.props.state.users}/>} />
                        <Route path='/projects' exact component={()=> <ProjectList projects = {this.props.state.projects}/>} />
                        <Route path='/note/:id' component={()=> <ProjectNoteList notes = {this.props.state.notes}/>} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default Menu;