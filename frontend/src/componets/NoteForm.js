import React from 'react';


class NoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        'project': '',
        'text': '',
        }

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleUsersChange(event) {
        this.setState({
            'project': parseInt(event.target.selectedOptions.item(0).value)
        })
    }

    handleSubmit(event) {
        if (!this.state.project) {
            alert('Select a project')
        } else {
            this.props.createNote(this.state.project, this.state.text)
            event.preventDefault()
        }
       
    }


    render () {
        return(
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input type="text" name="text" placeholder="Note text" value={this.state.text} onChange={(event) => this.handleChange(event)} />
                    <select name='project' onChange={(event) => this.handleUsersChange(event)}>
                        {this.props.projects.map((project) => <option value={project.id}>{project.name}</option>)}
                    </select>
                    <input type="submit" value="Create"/>
                </form>
            </div>
        )
    }
}

export default NoteForm