import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import withNavigation from './WithNavigation';
import withParams from './withParams';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';
import LoginComponent from './LoginComponent.jsx';
import ListTodosComponent from './ListTodosComponent.jsx';
import HeaderComponent from './HeaderComponent.jsx';
import ErrorComponent from './ErrorComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import LogoutComponent from './LogoutComponent.jsx';
import WelcomeComponent from './WelcomeComponent.jsx';
import TodoComponent from './TodoComponent.jsx'

class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);

        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const ListTodosComponentWithNavigation = withNavigation(ListTodosComponent) 
        const TodoComponentWithParamsAndNavigation = withParams(withNavigation(TodoComponent));
        return (
            <div className="TodoApp">
            <Router>
                <HeaderComponentWithNavigation/>
                <Routes>
                    <Route path="/" element={<LoginComponentWithNavigation />} />
                    <Route path="/login" element={<LoginComponentWithNavigation />} />
                    <Route path="/welcome/:name" element={
                        <AuthenticatedRoute>
                            <WelcomeComponentWithParams />
                        </AuthenticatedRoute>
                    } />
                    
                    //REACT-6
                    <Route path="/todos/:id" element={ 
                        <AuthenticatedRoute>
                            <TodoComponentWithParamsAndNavigation />
                        </AuthenticatedRoute>
                    } />

                    //REACT-6
                    <Route path="/todos" element={
                        <AuthenticatedRoute>
                            <ListTodosComponentWithNavigation /> 
                        </AuthenticatedRoute>
                    } />
                    
              <Route path="/logout" element={
                        <AuthenticatedRoute>
                            <LogoutComponent />
                        </AuthenticatedRoute>
                    } />
                    <Route path="*" element={<ErrorComponent />} />
                </Routes>
                <FooterComponent/>
            </Router>
        </div>
    )
        
    }
}














// function LoginFail(props) {
//     if (props.hasLoginFailed) {
//         return <div>Login Fail</div>
//     } else {
//         return null;
//     }
// }

export default TodoApp;