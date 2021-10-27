import React from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import UserList from "./Users";
import ProjectList from "./Projects";
import HomePage from "./Home";
import ProjectNoteList from "./Notes";
import LoginForm from "./LoginForm";
import ProjectForm from "./ProjectForm";
import NoteForm from "./NoteForm";
import SearchProject from "./Search";

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
                            <li><Link to='/projects/add'>Add Project</Link></li>
                            <li><Link to='/projects/search'>Search project</Link></li>
                            <li><Link to='/projects/note/add'>Add Note</Link></li>
                            <li>
                                { this.props.isAuthenticated() ?
                                    <button onClick={() => this.props.logout()}>Logout</button>:<Link to='/login'>Login</Link>
                                }
                            </li>
                        </ul>
                    </nav>
                    <hr />
                    <Switch>
                        <Route path='/login' component={()=> <LoginForm login={(email, password) => this.props.login(email, password)}/>} />
                        <Route path={["/home", "/"]} exact component={()=> <HomePage />} />
                        <Route path='/users' exact component={()=> <UserList users = {this.props.state.users}/>} />
                        <Route path='/projects' exact component={()=> <ProjectList projects = {this.props.state.projects} deleteProject={this.props.deleteProject}/>} />
                        <Route path='/projects/add' exact component={()=> <ProjectForm users = {this.props.state.users} createProject={this.props.createProject}/>} />
                        <Route path='/projects/search' exact component={()=> <SearchProject projects = {this.props.state.projects} deleteProject={this.props.deleteProject}/>} />
                        <Route path='/projects/note/add' exact component={()=> <NoteForm projects = {this.props.state.projects} createNote={this.props.createNote}/>} />
                        <Route path='/projects/note/:id' component={()=> <ProjectNoteList notes = {this.props.state.notes} closeNote={this.props.closeNote}/>} />
                        <Route component={NotFound} />
                    </Switch>
                    <hr />
                </BrowserRouter>
            </div>
        )
    }
}

export default Menu;