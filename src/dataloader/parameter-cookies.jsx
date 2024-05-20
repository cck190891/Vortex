import { signal, effect } from '@preact/signals'
import { get_, cookies_Serialize } from '../components/utils/plugin-invokefn';
import { appCacheDir } from '@tauri-apps/api/path';
const appCacheDir_path = signal()
const cookie_path = signal();

const Local_state_path = signal();
const cookie_window = signal({});
// Save sturcture
// cookies_info={
//   cookies : cookies already sorted and grouped by domain
//   total : total cookies count
//   ts : last update time
// }
const cookies_info = signal({ cookies: { 'Nothing': [{ 'Name': 'Nothing', 'Path': '/', 'Value': 'Nothing' }] }, total: 0, ts: 0 });
// cookie_host=[] : focus domain list
const cookie_host = signal(JSON.parse(localStorage.getItem('cookies-host')) || []);
// cookie_page_setting={
//   show_all : show all cookies or focus cookies
//   cookie_filiter : show cookie filiter or not
//   html_shower_height : html shower height
// }
const cookie_page_setting = signal({ show_all: false, cookie_filiter: true, html_shower_height: 300 });

(async () => {
    appCacheDir_path.value = localStorage.getItem('appcache-path') || await appCacheDir() || '未選擇檔案';
    cookie_path.value = localStorage.getItem('cookies-path') || await get_('cookie_path') || '未選擇檔案';
    // Local_state_path.value = localStorage.getItem('local-state-path') || await get_('local_state_path') || '未選擇檔案';
    // cookie_host.value = JSON.parse(localStorage.getItem('cookies-host')) || [];
    // cookies_info.value = JSON.parse(localStorage.getItem('cookies-info')) || { cookies: { 'key': 'value' }, total: 0, ts: null };
    cookie_page_setting.value = JSON.parse(localStorage.getItem('cookie-page-setting')) || { show_all: false, cookie_filiter: true, html_shower_height: 300 };
})();

const toggleShowAll = async () => {
    cookie_page_setting.value = {
        ...cookie_page_setting.value,
        show_all: !cookie_page_setting.value.show_all
    };
    await refresh_cookie();
};

const add_focus_domain = async () => {
    const userInput = prompt('Please enter the domain you want to focus :', '');
    console.log('userInput:', userInput)
    const userInputLowerCase = (userInput !== null) ? userInput.toLowerCase() : null;

    if (userInputLowerCase && !cookie_host.value.some(domain => domain.toLowerCase() === userInputLowerCase)) {
        console.log('userInput:', userInputLowerCase);
        cookie_host.value = [...cookie_host.value, userInputLowerCase]; // 新增小寫用戶輸入到陣列中
    } else {
        if (userInput === null) {
            console.log('cancel input');
        } else if (userInput.trim() === '') {
            console.log('input is empty');
        } else {
            console.log('This domain already exists (case-insensitive):', userInputLowerCase);
        }
    }
};

async function refresh_cookie() {
    const { cookies, total } = await cookies_Serialize();
    cookies_info.value = {
        ...cookies_info.value,
        'ts': new Date().toISOString(),
        'cookies': cookies,
        'total': total,
    };

}



export { cookie_path, Local_state_path, cookie_host, cookie_window, cookies_info, cookie_page_setting, appCacheDir_path }
export { add_focus_domain, refresh_cookie, toggleShowAll }




effect(() => {
    if (cookie_path.value) {
        localStorage.setItem('cookies-path', cookie_path.value);
        console.log('updata : cookie_path', cookie_path.value)
    }
})
effect(() => {
    if (Local_state_path.value) {
        localStorage.setItem('local-state-path', Local_state_path.value);
        console.log('updata : Local_state_path', Local_state_path.value)
    }
})




effect(() => {
    if (appCacheDir_path.value) {
        localStorage.setItem('appcache-path', appCacheDir_path.value);
        console.log('updata : appcache-path', appCacheDir_path.value)
    }
})






// Fixed structure

// effect(() => {
//     localStorage.setItem('cookies-info', JSON.stringify(cookies_info.value));
//     console.log('updata : cookies-info:', cookies_info.value)
// })

effect(() => {
    localStorage.setItem('cookie-page-setting', JSON.stringify(cookie_page_setting.value));
    console.log('updata : cookie-page-setting:', cookie_page_setting.value)
})

effect(() => {
    if (cookie_host.value) {
        localStorage.setItem('cookies-host', JSON.stringify(cookie_host.value));
        console.log('updata : cookies-host', cookie_host.value)
    }
})
