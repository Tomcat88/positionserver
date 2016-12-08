import React from 'react'
import { Col, ControlLabel, FormControl, Button } from 'react-bootstrap'
class LoginControl extends React.Component {

    constructor() {
        super();
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.login = this.login.bind(this);
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeUser(e) {
        this.setState({
            user: e.target.value
        })
    }

    login() {
        this.props.login(this.state.user,this.state.password);
    }

    render() {
        return (
            <div className="row">
                <Col md={2}>
                    <ControlLabel>Utente</ControlLabel>
                    <FormControl
                        type="text"
                        onChange={this.onChangeUser}
                        />
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        onChange={this.onChangePassword}
                        />
                    <Button bsStyle="primary"
                            onClick={this.login}
                            style={{ marginTop: "10px" }}>
                    Login
                    </Button>
                </Col>
            </div>
        )
    }
}

export default LoginControl;