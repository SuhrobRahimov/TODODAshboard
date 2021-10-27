import React from 'react';


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        'name': '',
        'url': '',
        'activeUsers': []
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            return;
        }

        let activeUsers = []
        for(let i=0; i < event.target.selectedOptions.length; i++) {
            activeUsers.push(parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState({
            'activeUsers': activeUsers
        })
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.url, this.state.activeUsers)
        event.preventDefault()
    }


    render () {
        return(
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input type="text" name="name" placeholder="Project name" value={this.state.name} onChange={(event) => this.handleChange(event)} />
                    <input type="text" name="url" placeholder="Project url" value={this.state.url} onChange={(event) => this.handleChange(event)} />
                    <select multiple name='activeUsers' onChange={(event) => this.handleUsersChange(event)}>
                        {this.props.users.map((user) => <option value={user.id}>{user.email}</option>)}
                    </select>
                    <input type="submit" value="Create"/>
                </form>
            </div>
        )
    }
}

export default ProjectForm