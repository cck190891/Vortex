
import { download_list, downloadfile_savepath } from "../dataloader/parameter-download";
import { create_hidden_webviewwindow } from "../components/utils/plugin-webview";
import '../css/page-download.css'
import { Command } from "@tauri-apps/plugin-shell";
import { cookies_info } from "../dataloader/parameter-cookies";
import { signal } from "@preact/signals";

const Default_page = () => {
    const view = (
        <>
            <div className='download-page'>
                <div className='page'>
                    <p className='page-title'>Download</p>

                    <div className='page-control'>

                    </div>
                </div>
            </div>
            {download_list.value && Object.keys(download_list.value).map((domain, id) => (
                (
                    <div className='download-card' key={id}>
                        <div className='download-title' style={'display:flex ;justify-content: space-between;'}>
                            <div className="download-domain-str">
                                {domain}
                            </div>
                            <div className="downloader-controller">
                                <button onClick={async () => {
                                    const userInput = prompt('Please enter url for download  :', '');
                                    const userInputLowerCase = (userInput !== null) ? userInput : null;

                                    if (userInputLowerCase) {
                                        let CString = ''
                                        domain in cookies_info.value['cookies'] && cookies_info.value['cookies'][domain].map((cookie, cid) => (
                                            CString += (`${cookie.Name}=${cookie.Value};`)
                                        ))
                                        // console.log(':', CString)
                                        console.log('python ', download_list.value[domain], "-u", userInputLowerCase, "-c", CString, "-p", downloadfile_savepath.value)
                                        const command = Command.create("python", [download_list.value[domain], "-u", userInputLowerCase, "-c", CString, "-p", downloadfile_savepath.value]);
                                        command.stdout.on('data', line => console.log(`command stdout: "${line}"`));
                                        command.stderr.on('data', line => console.log(`command stderr: "${line}"`));
                                        // command.on('close', data => {
                                        //     console.log(`command finished with code ${data.code} and signal ${data.signal}`)
                                        // });
                                        const child = await command.spawn();
                                        console.log('test:', child)
                                    } else {
                                        if (userInput === null) {
                                            console.log('cancel input');
                                        } else if (userInput.trim() === '') {
                                            console.log('input is empty');
                                        } else {
                                            console.log('This domain already exists (case-insensitive):', userInputLowerCase);
                                        }
                                    }
                                }}>Download</button>
                            </div>
                        </div>
                        <div className="download-info">
                            <div className="downloader-path-controller">
                                {download_list.value[domain]}
                            </div>
                            <div>{ }</div>
                        </div>
                    </div>
                )
            ))}

        </>

    )

    return view
};


export default Default_page