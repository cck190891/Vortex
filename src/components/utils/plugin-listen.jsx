import { html_callback } from '../../dataloader/parameter-html';
import { cookie_window } from '../../dataloader/parameter-cookies';
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
    window.__TAURI__.event.listen('tauri://drag', event => {
        console.log('File drop event:', event);
        const filePaths = event.payload.paths;
        console.log('filePaths:', filePaths)
    });
}
const executejs_listen = () => {
    window.__TAURI__.event.listen('tauri://execute-js-result', (event) => {
        console.log('execute-js-result:', event)
    })
}

export { html_result_listen, drag_listen, executejs_listen }