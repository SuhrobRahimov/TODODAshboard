import React from 'react';


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        'email': '',
        'password': ''
        } 
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        this.props.login(this.state.email, this.state.password)
        event.preventDefault()
    }


    render () {
        return(
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input type="email" name="email" placeholder="email" value={this.state.email} onChange={(event) => this.handleChange(event)} />
                    <input type="password" name="password" placeholder="password" value={this.state.password} onChange={(event) => this.handleChange(event)} />
                    <input type="submit" value="Login"/>
                </form>
            </div>
        )
    }
}

export default LoginForm