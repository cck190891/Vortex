import { signal, effect } from '@preact/signals'

const html_callback = signal();

(async () => {
    html_callback.value = localStorage.getItem('html-callback') ? JSON.parse(localStorage.getItem('html-callback')) : {};
    console.log('html_callback:', html_callback.value)
})();





export { html_callback };