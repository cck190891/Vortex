import { useEffect } from 'preact/hooks';
import { effect } from '@preact/signals'
import { add_focus_domain, cookie_host, refresh_cookie, toggleShowAll, cookie_window, cookies_info, cookie_page_setting } from '../dataloader/parameter-cookies';
import Host_card from '../components/page-cookies-host-card';

import { checkbox_dialog } from '../components/utils/plugin-dialog';
import { formatTime } from '../components/utils/plugin-reuse-tools';
import '../css/page-cookies.css'
const Cookies_page = () => {

    useEffect(async () => {
        await refresh_cookie();
    }, []);

    let content, head;
    if (cookie_page_setting.value['show_all']) {
        head =
            <div className='page'>
                <p className='page-title'>All Cookies</p>
                {/* android bug */}
                <div className='cookie-timestamp'>{formatTime(cookies_info.value['ts'])}</div>
                <div className='page-control'>
                    <button type='button' title='Refresh' onClick={async () => { await refresh_cookie() }} >
                        <svg fill='#000000' viewBox='-2.4 -2.4 28.80 28.80' ><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'><path d='M10.035,18.069a7.981,7.981,0,0,0,3.938-1.035l3.332,3.332a2.164,2.164,0,0,0,3.061-3.061l-3.332-3.332A8.032,8.032,0,0,0,4.354,4.354a8.034,8.034,0,0,0,5.681,13.715ZM5.768,5.768A6.033,6.033,0,1,1,4,10.035,5.989,5.989,0,0,1,5.768,5.768Z'></path></g></svg>
                    </button>
                    <button type='button' title='Target cookies' onClick={toggleShowAll} >
                        <svg className='switch'><path d='M18 10L21 7M21 7L18 4M21 7H7M6 14L3 17M3 17L6 20M3 17H17' stroke-width='2'></path> </svg>
                    </button>
                </div>
            </div >
        effect(() => {
            // android bug
            content = Object.keys(cookies_info.value['cookies']).map((host, id) => (
                (
                    <Host_card host={host} id={id} />
                )
            ));
        })

    } else {
        head =
            <div className='cookie-page'>
                <div className='page'>
                    <p className='page-title'>Foucs Cookies</p>
                    <div className='cookie-timestamp'>{formatTime(cookies_info.value['ts'])}</div>

                    <div className='page-control'>
                        <button type='button' title='Add domain' onClick={add_focus_domain} >
                            <svg ><g id='SVGRepo_iconCarrier'> <path d='M5 12H19' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> <path d='M12 5L12 19' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g></svg>
                        </button>
                        <button type='button' title='Remove domain' onClick={async () => {
                            let info = {
                                title: 'Remove domain',
                                text: 'Please select the domain you want to remove ',
                                inputOptions: cookie_host.value,
                            }
                            let choice = await checkbox_dialog(info)
                            cookie_host.value = cookie_host.value.filter((item) => !choice.includes(item));
                            console.log('cookie_host.value:', cookie_host.value)
                        }} >
                            <svg ><g id='SVGRepo_iconCarrier'> <path d='M5 12H19' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g></svg>
                        </button>

                        <button type='button' title='Refresh' onClick={async () => { await refresh_cookie() }} >
                            <svg fill='#000000' viewBox='-2.4 -2.4 28.80 28.80' ><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'><path d='M10.035,18.069a7.981,7.981,0,0,0,3.938-1.035l3.332,3.332a2.164,2.164,0,0,0,3.061-3.061l-3.332-3.332A8.032,8.032,0,0,0,4.354,4.354a8.034,8.034,0,0,0,5.681,13.715ZM5.768,5.768A6.033,6.033,0,1,1,4,10.035,5.989,5.989,0,0,1,5.768,5.768Z'></path></g></svg>
                        </button>
                        <button type='button' title='Full cookies' onClick={toggleShowAll} >
                            <svg className='switch'><path d='M18 10L21 7M21 7L18 4M21 7H7M6 14L3 17M3 17L6 20M3 17H17' stroke-width='2'></path> </svg>
                        </button>
                    </div>
                </div>
            </div>
        content = cookie_host.value.map((host, id) => (
            <Host_card host={host} id={id} />
        ));
    }

    const view = (
        <>
            {head}
            {content}
        </>
    )
    return view
};

export default Cookies_page