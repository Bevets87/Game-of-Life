import React from 'react';
import ReactDOM from 'react-dom';
import App from './statelessComponents/App';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('root'));
