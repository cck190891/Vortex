
import Guide_aside from './views/guide-aside-view'
import Page_main_router from './views/page-main-view'
import { useEffect } from 'preact/hooks';
import { html_result_listen, drag_listen, executejs_listen } from './components/utils/plugin-listen';
const App = () => {
    const executeListen = async () => {
        console.log('executeListen')
        html_result_listen();
        drag_listen();
        executejs_listen();
    };
    useEffect(async () => {
        await executeListen();
    })

    const View = (
        <>
            <Guide_aside />
            <Page_main_router />
        </>
    )

    return View
}


export default App