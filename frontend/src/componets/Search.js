import React from 'react';
import ProjectList from './Projects';

class SearchProject extends React.Component {
    // А мне начинает нарвиться фронт..
    constructor(props) {
        super(props)
        this.state = {
        'name': '',
        'projects': null,
        }

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        let projects = this.props.projects.filter(item => {
            if (item.name.toLowerCase().search(this.state.name.toLowerCase()) != -1) {
                return true
            }
        })

        if (projects.length === 0) {
            this.setState({'projects': null})
            alert('Nothing :(')
        } else {
            this.setState({'projects': projects})
        }

    }

    render () {
        return(
            <div>
                <label>Search project:</label><br />
                <input type='search' name='name' placeholder='Enter project name' onChange={(event) => this.handleChange(event)}/>
                <input type="submit" value="Search" onClick={(event) => this.handleSubmit(event)}/>
                { !this.state.projects ?
                    null:<ProjectList projects = {this.state.projects} deleteProject={this.props.deleteProject}/>
                }
                
            </div>
        )
    }
}

export default SearchProject