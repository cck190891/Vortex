import { signal, effect } from '@preact/signals'
const download_list = signal({});

(async () => {
    download_list.value = localStorage.getItem('download-list') ? JSON.parse(localStorage.getItem('download-list')) : {};
})();

const add_download_list = async () => {
    const userInput = prompt('Please enter the URL :', '');
    const htp = /^(http|https):\/\//;
    if (htp.test(userInput)) {
        download_list.value = { ...download_list.value, [userInput]: '' };
    }
};
export { download_list }
export { add_download_list }

effect(() => {
    if (download_list.value) {
        localStorage.setItem('download-list', JSON.stringify(download_list.value));
        console.log('updata : download-list', download_list.value)
    }
})
