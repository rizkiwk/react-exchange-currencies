import React from 'react';

import { Provider } from 'react-redux';
import AppStore from './redux';

import MainPage from './pages/MainPage';

import CssBaseline from '@material-ui/core/CssBaseline';

// const App   = () => {
//     return(
//         <React.Fragment>
//             <CssBaseline />

//             <MainPage />
//         </React.Fragment>
//     );
// };

class App extends React.Component {

    constructor(props) {
        super(props);

        this.store  = AppStore();
    }

    render() {
        return(
            <Provider store={this.store}>
                <React.Fragment>
                    <CssBaseline />

                    <MainPage />
                </React.Fragment>
            </Provider>
        );
    }

}

export default App;