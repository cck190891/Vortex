import { html_callback } from '../../dataloader/parameter-html';
import { cookie_window } from '../../dataloader/parameter-cookies';

import { route } from 'preact-router';
import { copyFile } from '@tauri-apps/plugin-fs';
import { appCacheDir_path } from '../../dataloader/parameter-cookies';
import { download_list } from '../../dataloader/parameter-download';



const html_result_listen = () => {
    window.__TAURI__.event.listen('tauri://html-result', (event) => {
        console.log('listen -----------------------------------------------------------')

        const parser = new DOMParser();
        const parsedHtml = parser.parseFromString(event.payload.html, 'text/html');
        let origin_open_host = Object.keys(cookie_window.value).find(key => cookie_window.value[key] === event.payload.label);

        html_callback.value[origin_open_host] =
        {
            html: parsedHtml.documentElement.outerHTML,
            time: event.payload.time,
            location: event.payload.location,
            label: event.payload.label,
            dom: parsedHtml,
        };
        localStorage.setItem('html-callback', JSON.stringify(html_callback.value));

    })
}

const drag_listen = () => {
    window.__TAURI__.event.listen('tauri://drag', async event => {

        console.log('File drop event:', event.payload.paths);
        if (/\.py$/i.test(event.payload.paths[0])) {
            const filePaths = event.payload.paths[0];
            const fileName = filePaths.split(/\\|\//).pop();
            const userInput = prompt('Please enter the domain with ur downloader :', '');
            const userInputLowerCase = (userInput !== null) ? userInput.toLowerCase() : null;

            if (userInputLowerCase) {
                console.log('userInput:', userInputLowerCase);
                download_list.value = { ...download_list.value, [userInputLowerCase]: appCacheDir_path.value + '/' + fileName }; // 新增小寫用戶輸入到陣列中
                copyFile(filePaths, appCacheDir_path.value + '/' + fileName);
                route("/download")
            } else {
                if (userInput === null) {
                    console.log('cancel input');
                } else if (userInput.trim() === '') {
                    console.log('input is empty');
                } else {
                    console.log('This domain already exists (case-insensitive):', userInputLowerCase);
                }
            }
        }
    });
}
const executejs_listen = () => {
    window.__TAURI__.event.listen('tauri://execute-js-result', (event) => {
        console.log('execute-js-result:', event)
    })
}









export { html_result_listen, drag_listen, executejs_listen }