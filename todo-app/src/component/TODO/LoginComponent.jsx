import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService';



class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showLoginMessage: false
        }
        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event){
        console.log(this.state);
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    loginClicked(){
        // gehongsh, 20021020g
        // if (this.state.username === 'gehongsh' && this.state.password === '20021020g') {
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //     //this.props.history.push("/welcome");
        //     this.props.navigate(`/welcome/${this.state.username}`);
        //     //this.setState({showLoginMessage: true})
        //     //this.setState({hasLoginFailed: false});
        // } else {
        //     console.log('fail');
        //     this.setState({showLoginMessage: false});
        //     this.setState({hasLoginFailed: true});
        // }

        // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        // .then(
        //     () => {
        //         AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //         this.props.navigate(`/welcome/${this.state.username}`);
        //     }
        // ).catch(
        //     () => {
        //         this.setState({showLoginMessage: false});
        //         this.setState({hasLoginFailed: true});
        //     }
        // );
        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
        .then(
            (response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token);
                this.props.navigate(`/welcome/${this.state.username}`);
            }
        ).catch(
            () => {
                this.setState({showLoginMessage: false});
                this.setState({hasLoginFailed: true});
            }
        );

    }

    LoginFail() {
        if (this.state.hasLoginFailed) {
            return <div>Login Fail</div>
        } else {
            return null;
        }
    }

    LoginSuccess() {
        if (this.state.showLoginMessage) {
            return <div>Login Successful!</div>
        } else {
            return null;
        }
    }
    // handlePasswordChange(event) {
    //     console.log(event.target.value);
    //     this.setState({
    //         password: event.target.value
    //     });
    // }

    render() {
        return(
            <div>
                <h1>Login</h1>
                <div className="container ">
                    {/*<div>{this.LoginSuccess()}</div>*/}
                    {/* <div>{this.LoginFail()}</div> */}
                    {this.state.showLoginMessage && <div>Login Successful!</div>}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Login Failed</div>}
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
            
        );
    }
}

export default LoginComponent;