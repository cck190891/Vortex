import { invoke } from '@tauri-apps/api/core';



async function get_(target = 'cookie_path') {
    //cookie_path ,local_state_path 
    const path = await invoke('get_' + target);
    console.log('invoke cookie_path:', path)
    if (path) {
        console.log('invoke cookie_path:', path)
        return path;
    }
    return null;
}






async function show_(target = 'webview') {
    //windows , webviews, webviewwindows
    const window_hash = await invoke('show_' + target);

    try {
        console.log('show_' + target, JSON.parse(window_hash))
    }
    catch (e) {
        console.log('show_' + target + ' : ', window_hash)
    }
}


async function do_eval(label, js_mode) {

    const js_map = {
        'tauri_html_listen': [`window.__TAURI__.event.listen('tauri://html-result', (event)=>{console.log(event.payload)})`],
        'tauri_html_emit': [`window.__TAURI__.event.emit('tauri://html-result',{html:document.documentElement.outerHTML,label:'${label}',time: Date().toLocaleString().replace(',', ''),location:window.location})`],
        'tauri_html_emit_for_download': [`window.__TAURI__.event.emit('tauri://html-download',{html:document.documentElement.outerHTML,label:'${label}',time: Date().toLocaleString().replace(',', ''),location:window.location})`],
        'js_button_find1': [`let buttons = document.querySelectorAll('button');`, `buttons.forEach(button => {button.click();});`],
        'js_button_find2': [`let checkboxes = document.querySelectorAll('input[type='checkbox']');`, `checkboxes.forEach(button => {button.click();});`],
        'js_button_find': [`let checkboxes = document.querySelectorAll('input');`, `checkboxes.forEach(button => {button.click();});`],
    };

    let js_list = js_map[js_mode] || js_mode;

    for (const single_line of js_list) {
        invoke('do_eval', { label, jscode: single_line });
    }
}

async function do_(target = 'restart') {
    // await invoke('do_' + target);
    await invoke('do_' + target)
}

async function del_cookies_by_domain(domain) {
    // domain = '' => delete all
    // domain = need to pass uri => need to add 'https://' or 'http://'
    if (domain == '') {
        await invoke('del_cookies_by_domain', { name: '', domain: domain });
    } else {
        await invoke('del_cookies_by_domain', { name: '', domain: 'https://' + domain });
        await invoke('del_cookies_by_domain', { name: '', domain: 'http://' + domain });
    }
}

async function cookies_Serialize() {
    // cookies obj define
    // pub struct Cookie {
    //     pub name: String,
    //     pub value: String,
    //     pub domain: String,
    //     pub path: String,
    // }
    // pub struct Cookies {
    //     pub cookies: Vec<Cookie>,
    //     pub total: u32,
    // }

    const cookies_obj = await invoke('get_cookies_serialize');
    console.log('origin cookies data:', cookies_obj)

    const cookies_by_domain = {}

    cookies_obj.cookies.forEach((cookie) => {
        let domain = cookie.domain.replace(/^\./, '');
        if (!cookies_by_domain[domain]) {
            cookies_by_domain[domain] = [];
        }
        cookies_by_domain[domain].push({
            Name: cookie.name,
            Value: cookie.value,
            Path: cookie.path,
        });
    });
    const cookies_count = cookies_obj.total;
    return {
        cookies: cookies_by_domain,
        total: cookies_count
    };
}

export { get_, do_, show_, do_eval, del_cookies_by_domain, cookies_Serialize }
