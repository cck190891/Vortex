
import { HTMLIframe, formatHTML } from './utils/plugin-reuse-tools';
import { create_webviewwindow } from './utils/plugin-webview';
import { do_eval, del_cookies_by_domain } from './utils/plugin-invokefn';
import { refresh_cookie, cookie_window, cookies_info, cookie_page_setting } from '../dataloader/parameter-cookies';
import { html_callback } from '../dataloader/parameter-html';
import { CopyButton } from './utils/plugin-reuse-tools';

const Host_card = ({ host, id }) => {
    const isHttpProtocol = /^(http|https):\/\//;
    const domain = !isHttpProtocol.test(host) ? host : new URL(host).hostname.replace(/^www\./, '');
    const url_open = !isHttpProtocol.test(host) ? 'https://' + host : host;

    return (
        <div key={`host-${id}`} className='host-card'>
            <div className='host-title'>
                <div className='host-title-str'>
                    {domain === host ? (<div className='host-title-type'>Domain :&nbsp; </div>) : (<div className='host-title-type'>URL :&nbsp; </div>)}
                    <div className='host-index'>{host}</div>
                </div>
                <div className='host-title-controller'>

                    <button className='host-open-butten' id={'OpenButton-' + host} title={`Copy all cookies`} onClick={async () => {
                        let CopyString = ''
                        domain in cookies_info.value['cookies'] && cookies_info.value['cookies'][domain].map((cookie, cid) => (
                            CopyString += (`${cookie.Name}=${cookie.Value};`)
                        ))
                        await navigator.clipboard.writeText(CopyString);

                    }}>
                        <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <path d='M19.53 8L14 2.47C13.8595 2.32931 13.6688 2.25018 13.47 2.25H11C10.2707 2.25 9.57118 2.53973 9.05546 3.05546C8.53973 3.57118 8.25 4.27065 8.25 5V6.25H7C6.27065 6.25 5.57118 6.53973 5.05546 7.05546C4.53973 7.57118 4.25 8.27065 4.25 9V19C4.25 19.7293 4.53973 20.4288 5.05546 20.9445C5.57118 21.4603 6.27065 21.75 7 21.75H14C14.7293 21.75 15.4288 21.4603 15.9445 20.9445C16.4603 20.4288 16.75 19.7293 16.75 19V17.75H17C17.7293 17.75 18.4288 17.4603 18.9445 16.9445C19.4603 16.4288 19.75 15.7293 19.75 15V8.5C19.7421 8.3116 19.6636 8.13309 19.53 8ZM14.25 4.81L17.19 7.75H14.25V4.81ZM15.25 19C15.25 19.3315 15.1183 19.6495 14.8839 19.8839C14.6495 20.1183 14.3315 20.25 14 20.25H7C6.66848 20.25 6.35054 20.1183 6.11612 19.8839C5.8817 19.6495 5.75 19.3315 5.75 19V9C5.75 8.66848 5.8817 8.35054 6.11612 8.11612C6.35054 7.8817 6.66848 7.75 7 7.75H8.25V15C8.25 15.7293 8.53973 16.4288 9.05546 16.9445C9.57118 17.4603 10.2707 17.75 11 17.75H15.25V19ZM17 16.25H11C10.6685 16.25 10.3505 16.1183 10.1161 15.8839C9.8817 15.6495 9.75 15.3315 9.75 15V5C9.75 4.66848 9.8817 4.35054 10.1161 4.11612C10.3505 3.8817 10.6685 3.75 11 3.75H12.75V8.5C12.7526 8.69811 12.8324 8.88737 12.9725 9.02747C13.1126 9.16756 13.3019 9.24741 13.5 9.25H18.25V15C18.25 15.3315 18.1183 15.6495 17.8839 15.8839C17.6495 16.1183 17.3315 16.25 17 16.25Z' fill='#000000'></path> </g></svg>
                    </button>
                    <button className='host-open-butten' id={'OpenButton-' + host} title={`Open this domain page`} onClick={async () => {
                        cookie_window.value[host] = create_webviewwindow(url_open)
                        console.log('windows_label:', cookie_window)
                        setTimeout(async () => {
                            await refresh_cookie();
                        }, 5000);
                    }}>
                        <svg><g><path style={{ width: '24px', height: '24px' }} d='M18.885 2a1 1 0 00-1-1h-6a1 1 0 100 2h3.586L9.178 9.293a1 1 0 101.414 1.414l6.293-6.293V8a1 1 0 102 0V2zM3.009 3a2.012 2.012 0 00-1.998 2.218c.148 1.453.374 3.978.374 5.782 0 1.746-.212 4.17-.36 5.642a2.028 2.028 0 002.218 2.218c1.473-.148 3.896-.36 5.642-.36 1.804 0 4.33.226 5.782.374a2.012 2.012 0 002.218-1.998V12a1 1 0 10-2 0v4.878l-.003.003a.018.018 0 01-.006.003h-.006c-1.451-.147-4.068-.384-5.985-.384-1.857 0-4.37.222-5.842.37h-.008a.034.034 0 01-.012-.008.033.033 0 01-.008-.012.01.01 0 010-.002v-.006c.148-1.473.37-3.985.37-5.842 0-1.917-.237-4.534-.385-5.985v-.006l.004-.006A.016.016 0 013.007 5h4.878a1 1 0 000-2H3.009z'></path> </g></svg>
                    </button>
                </div>
            </div>
            {cookie_page_setting.value['cookie_filiter']
                ? <div className='cookie-card' id={`cookie-card-${domain}`} >


                    {domain in cookies_info.value['cookies'] && cookies_info.value['cookies'][domain].map((cookie, cid) => (
                        <div className='cookie-index' id={`cookie-${cid}`}>
                            <CopyButton target={`${cookie.Name}=${cookie.Value}`} />
                        </div>
                    ))}
                </div>
                : <div className='cookie-card' id={`cookie-card-${domain}`} >
                    {Object.keys(cookies_info.value['cookies']).filter(key => key.includes(domain)).map((key, cid) => (
                        cookies_info.value['cookies'][key].map((cookie, index) => (
                            <div className='cookie-index' id={`cookie-${cid}-${index}`}>
                                <CopyButton target={`${cookie.Name}=${cookie.Value}`} />
                            </div>
                        ))
                    ))}
                </div>}


            <div className='cookie-controller' style={{ margin: '5px 0 0 0' }} >
                {
                    (<>
                        <div className='host-str'>
                            <div className='host-window-str'>
                                <div>Focus windows label :&nbsp; </div>
                                <div className='host-windows'>{cookie_window.value[host] ? cookie_window.value[host] : 'None'}</div>
                            </div>
                            <div className='host-windows-html-msg' id={`msg-box-` + host}>
                            </div>

                            <div className='host-windows-html'>
                                <button className='host-windows-html-emit' title={`Emit html from window`} onClick={async () => {

                                    if (window.__TAURI_INTERNALS__.metadata.webviews.some(window => window.label === cookie_window.value[host])) {
                                        do_eval(cookie_window.value[host], 'tauri_html_emit')
                                        if (!(document.getElementById(`html-shower-${host}`).classList.contains('show'))) {
                                            document.getElementById(`html-shower-${host}`).classList.add('show');
                                        }
                                    } else {
                                        document.getElementById(`msg-box-${host}`).innerText = 'window label not found';
                                        setTimeout(() => {
                                            document.getElementById(`msg-box-${host}`).innerText = '';
                                        }, 3000);
                                    }
                                }}>Send back html</button>
                                <button className='host-html-switch' title={`Open html shower`} onClick={async () => {
                                    if (!(host in html_callback.value)) {
                                        document.getElementById(`msg-box-${host}`).innerText = `Did not get the ${host} html yet`;
                                        setTimeout(() => {
                                            document.getElementById(`msg-box-${host}`).innerText = '';
                                        }, 3000);
                                    }
                                    if (document.getElementById(`html-shower-${host}`).classList.contains('show')) {
                                        document.getElementById(`html-shower-${host}`).classList.remove('show');
                                    } else {
                                        document.getElementById(`html-shower-${host}`).classList.add('show');
                                    }
                                }}>Html shower</button>
                                <button className='host-delete' title={`Delete this domain all cookies`} onClick={async () => {
                                    console.log('del domain:', domain)
                                    await del_cookies_by_domain(domain)
                                    await refresh_cookie()
                                }}>
                                    <svg viewBox='0 0 24 24' fill='none' ><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <path fill-rule='evenodd' clip-rule='evenodd' d='M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z' fill='#000000'></path> <path fill-rule='evenodd' clip-rule='evenodd' d='M18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L6.53035 18.5303C6.23745 18.8232 5.76258 18.8232 5.46969 18.5303C5.17679 18.2374 5.17679 17.7626 5.46968 17.4697L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967Z' fill='#000000'></path> </g></svg>
                                </button>
                            </div>
                        </div>
                    </>)
                }
            </div>
            {/* <div className={`html-shower`} id={`html-shower-${host}`} style={{ maxHeight: html_shower_height.value.toString() + 'px' }}> */}
            <div className={`html-shower`} id={`html-shower-${host}`} style={{ maxHeight: cookie_page_setting.value['html_shower_height'].toString() + 'px' }}>
                <div className='html-str'>
                    {host in html_callback.value &&
                        (<pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }} >
                            <code>
                                HTML info : <br />
                                {'\t'}Update time : {html_callback.value[host].time} <br />
                                {'\t'}Location from : {html_callback.value[host].location.href} <br />
                                <hr></hr>
                                {/* <HTMLIframe id={`iframe-${host}`} htmlContent={html_callback.value[host].html} style={{ width: '99%', height: html_shower_height.value.toString() + 'px' }} /> */}
                                {formatHTML(html_callback.value[host].html)}
                            </code>
                        </pre>)}
                </div>
            </div>
        </div>
    )
}
export default Host_card