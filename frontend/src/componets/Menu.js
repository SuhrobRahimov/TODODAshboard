import React from "react";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import UserList from "./Users";
import ProjectList from "./Projects";
import HomePage from "./Home";
import ProjectNoteList from "./Notes";

const NotFound = ({location}) => {
    return (
      <div>
        Page not found: {location.pathname}
      </div>
    )
  }


const Menu = (state) => {
    return (
        <div>
            <BrowserRouter>
                <nav>
                    <ul>
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/users'>Users</Link></li>
                        <li><Link to='/projects'>Projects</Link></li>
                    </ul>
                </nav>

                <Switch>
                    {/* Редирект таки обновляет страницу, отказался в пользу multipath */}
                    <Route path={["/home", "/"]} exact component={()=> <HomePage />} />
                    <Route path='/users' exact component={()=> <UserList users = {state.state.users}/>} />
                    <Route path='/projects' exact component={()=> <ProjectList projects = {state.state.projects}/>} />
                    <Route path='/note/:id' component={()=> <ProjectNoteList notes = {state.state.notes}/>} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Menu;