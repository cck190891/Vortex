
import { signal } from '@preact/signals'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { Window, CloseRequestedEvent } from '@tauri-apps/api/window'
import { Webview } from '@tauri-apps/api/webview'
import { TauriEvent } from '@tauri-apps/api/event'
import { cookie_window, refresh_cookie } from '../../dataloader/parameter-cookies'
import { do_eval } from './plugin-invokefn'

const label = signal(Math.floor(Math.random() * 1000))
console.log('label:', label)

const create_webviewwindow = (url) => {
    const htp = /^(http|https):\/\//;
    let url_open, domain;
    if (!htp.test(url)) {
        url_open = 'https://' + url;
        domain = url
    } else {
        url_open = url;
        domain = new URL(url).hostname
    }

    let new_label = `main-${label.value}`;
    while (Object.values(window.__TAURI_INTERNALS__.metadata.windows).some(window => window.label === new_label)) {
        label.value++;
        new_label = `main-${label.value}`;
    }

    const webview_window = new WebviewWindow(new_label, {
        url: url_open,
    });

    webview_window.once('tauri://created', async function (e) {

        window.__TAURI_INTERNALS__.metadata.webviews.push({ windowLabel: new_label, label: new_label })
        window.__TAURI_INTERNALS__.metadata.windows.push({ label: new_label })
        const this_window = Window.getByLabel(new_label)
        console.log('this_window:', new_label, this_window)

        this_window.listen(TauriEvent.WINDOW_CLOSE_REQUESTED, async (e) => {
            window.__TAURI_INTERNALS__.metadata.webviews.map((value) => {
                if (value.label == new_label) {
                    this_window.destroy();
                    Object.entries(cookie_window.value).forEach(async ([k, v]) => {
                        if (v == new_label) {

                            cookie_window.value[k] = '';
                            // delete cookie_window.value[k]
                            await refresh_cookie()
                        }
                    });
                }
                window.__TAURI_INTERNALS__.metadata.webviews = window.__TAURI_INTERNALS__.metadata.webviews.filter(item => item.label !== new_label);
                window.__TAURI_INTERNALS__.metadata.windows = window.__TAURI_INTERNALS__.metadata.windows.filter(item => item.label !== new_label);
            })
        })

        console.log('window.__TAURI_INTERNALS__.metadata.windows:', window.__TAURI_INTERNALS__.metadata.windows)
        console.log('window.__TAURI_INTERNALS__.metadata.webviews:', window.__TAURI_INTERNALS__.metadata.webviews)
        this_window.setTitle(domain);
        this_window.setFocus();

        console.log('this is from create')
        await refresh_cookie()
    });


    webview_window.once('tauri://error', function (e) {
        console.log('error requested:', e)
        console.log('window.__TAURI_INTERNALS__.metadata.windows:', window.__TAURI_INTERNALS__.metadata.windows)
        console.log('window.__TAURI_INTERNALS__.metadata.webviews:', window.__TAURI_INTERNALS__.metadata.webviews)
    });

    return new_label
}
const create_hidden_webviewwindow = (url) => {
    const htp = /^(http|https):\/\//;
    let url_open, domain;
    if (!htp.test(url)) {
        url_open = 'https://' + url;
        domain = url
    } else {
        url_open = url;
        domain = new URL(url).hostname
    }

    let new_label = `main-${label.value}`;
    while (Object.values(window.__TAURI_INTERNALS__.metadata.windows).some(window => window.label === new_label)) {
        label.value++;
        new_label = `main-${label.value}`;
    }

    const webview_window = new WebviewWindow(new_label, {
        url: url_open,
    });

    webview_window.once('tauri://created', async function (e) {

        window.__TAURI_INTERNALS__.metadata.webviews.push({ windowLabel: new_label, label: new_label })
        window.__TAURI_INTERNALS__.metadata.windows.push({ label: new_label })
        const this_window = Window.getByLabel(new_label)
        console.log('this_window:', new_label, this_window)

        this_window.listen(TauriEvent.WINDOW_CLOSE_REQUESTED, async (e) => {
            window.__TAURI_INTERNALS__.metadata.webviews.map((value) => {
                if (value.label == new_label) {
                    this_window.destroy();
                    Object.entries(cookie_window.value).forEach(async ([k, v]) => {
                        if (v == new_label) {

                            cookie_window.value[k] = '';
                            // delete cookie_window.value[k]
                            await refresh_cookie()
                        }
                    });
                }
                window.__TAURI_INTERNALS__.metadata.webviews = window.__TAURI_INTERNALS__.metadata.webviews.filter(item => item.label !== new_label);
                window.__TAURI_INTERNALS__.metadata.windows = window.__TAURI_INTERNALS__.metadata.windows.filter(item => item.label !== new_label);
            })
        })

        console.log('window.__TAURI_INTERNALS__.metadata.windows:', window.__TAURI_INTERNALS__.metadata.windows)
        console.log('window.__TAURI_INTERNALS__.metadata.webviews:', window.__TAURI_INTERNALS__.metadata.webviews)

        this_window.hide();
        setTimeout(() => {
            do_eval(new_label, 'tauri_html_emit_for_download')
        }, 3000);
        setTimeout(() => {
            this_window.close();
        }, 5000);
        console.log('this is from create')
        await refresh_cookie()
    });


    webview_window.once('tauri://error', function (e) {
        console.log('error requested:', e)
        console.log('window.__TAURI_INTERNALS__.metadata.windows:', window.__TAURI_INTERNALS__.metadata.windows)
        console.log('window.__TAURI_INTERNALS__.metadata.webviews:', window.__TAURI_INTERNALS__.metadata.webviews)
    });

    return new_label
}
export { create_webviewwindow, create_hidden_webviewwindow }