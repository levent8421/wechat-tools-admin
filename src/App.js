import React, {Component} from 'react';
import './App.less';
import {Provider} from 'react-redux'
import store from './store'

import {HashRouter as Router} from 'react-router-dom';
import history from './router/History';
import ContentLayout from './component/ContentLayout';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <Provider store={store}>
                        <ContentLayout/>
                    </Provider>
                </Router>
            </div>
        );
    }
}

export default App;
