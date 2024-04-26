import { Router, Route } from 'preact-router';

import Default_page from './page-default';
import Setting_page from './page-setting';
import Cookies_page from './page-cookies';
import Download_page from './page-download';
const Page_main_router = () => {

    return (
        <main className='main'>
            <div className='router_layout' id='router_layout'>
                <Router>
                    {/* <Route path='/' component={Default_page} /> */}
                    <Route path='/' component={Cookies_page} />
                    <Route path='/setting' component={Setting_page} />
                    <Route path='/cookies' component={Cookies_page} />
                    <Route path='/download' component={Download_page} />
                </Router>
            </div>
        </main>

    );
}

export default Page_main_router;