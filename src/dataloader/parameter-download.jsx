import { signal, effect } from '@preact/signals'
const download_list = signal();
const downloadfile_savepath = signal();


(async () => {
    download_list.value = localStorage.getItem('download-list') ? JSON.parse(localStorage.getItem('download-list')) : {};
    downloadfile_savepath.value = localStorage.getItem('downloadfile-save-path') || await appCacheDir() || '未選擇檔案';
    console.log('downloadfile_savepath.value:', downloadfile_savepath.value)
})();


export { download_list, downloadfile_savepath }



effect(() => {
    if (download_list.value) {
        localStorage.setItem('download-list', JSON.stringify(download_list.value));
        console.log('updata : download-list', download_list.value)
    }
})

effect(() => {
    if (downloadfile_savepath.value) {
        localStorage.setItem('downloadfile-save-path', downloadfile_savepath.value);
        console.log('updata : downloadfile-save-path', downloadfile_savepath.value)
    }
})
