import { render } from 'preact';
import App from './app';

import './css/styles.css'
import './css/guide.css'

// import './components/utils/plugin-tray'
// import './components/utils/plugin-notification'
// import './components/utils/plugin-webview'
// import './components/utils/plugin-path'
// import './components/utils/plugin-fs'
// import './components/utils/plugin-window'
// import './components/utils/plugin-fetch'
render(<App />, document.getElementById('root'));


