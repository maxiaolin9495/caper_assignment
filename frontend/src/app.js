"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchPageView } from "./ViewController/SearchPageView";
import { SearchResultView } from "./ViewController/SearchResultView";
import { LoginView } from "./ViewController/LoginView";
import { RegisterView } from "./ViewController/RegisterView";
import { EditProfileView } from "./ViewController/EditProfileView";
import { BookTableView } from "./ViewController/BookTableView";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Mock Web',
            routes: [
                { component: SearchPageView, path: '/', exact: true },
                { component: SearchResultView, path: '/searchResult', exact: true },
                { component: LoginView, path: '/login', exact: true },
                { component: RegisterView, path: '/register', exact: true },
                { component: EditProfileView, path: '/me', exact: true },
                { component: BookTableView, path: '/books', exact: true },
            ]
        };
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route} />))}
                    </Switch>
                </Router>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        );
    }
}
