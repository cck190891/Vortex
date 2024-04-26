
import { download_list, add_download_list } from "../dataloader/parameter-download";
import { create_hidden_webviewwindow } from "../components/utils/plugin-webview";
import '../css/page-download.css'
const Default_page = () => {
    const view = (
        <>
            <div className='download-page'>
                <div className='page'>
                    <p className='page-title'>Download</p>

                    <div className='page-control'>
                        <button type='button' title='Add domain' onClick={add_download_list} >
                            <svg ><g id='SVGRepo_iconCarrier'> <path d='M5 12H19' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> <path d='M12 5L12 19' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g></svg>
                        </button>
                    </div>
                </div>
            </div>
            {download_list.value && Object.keys(download_list.value).map((url, id) => (
                (
                    <div className='download-card' key={id}>
                        <div className='download-title'>
                            <div className="download-title-str">
                                {url}
                            </div>
                            <div className="download-title-controller">

                            </div>
                        </div>
                        <div className="download-info">
                            <button className='host-open-butten' title={`Open this domain page`} onClick={async () => {
                                create_hidden_webviewwindow(url)
                            }}>
                                <svg><g><path style={{ width: '24px', height: '24px' }} d='M18.885 2a1 1 0 00-1-1h-6a1 1 0 100 2h3.586L9.178 9.293a1 1 0 101.414 1.414l6.293-6.293V8a1 1 0 102 0V2zM3.009 3a2.012 2.012 0 00-1.998 2.218c.148 1.453.374 3.978.374 5.782 0 1.746-.212 4.17-.36 5.642a2.028 2.028 0 002.218 2.218c1.473-.148 3.896-.36 5.642-.36 1.804 0 4.33.226 5.782.374a2.012 2.012 0 002.218-1.998V12a1 1 0 10-2 0v4.878l-.003.003a.018.018 0 01-.006.003h-.006c-1.451-.147-4.068-.384-5.985-.384-1.857 0-4.37.222-5.842.37h-.008a.034.034 0 01-.012-.008.033.033 0 01-.008-.012.01.01 0 010-.002v-.006c.148-1.473.37-3.985.37-5.842 0-1.917-.237-4.534-.385-5.985v-.006l.004-.006A.016.016 0 013.007 5h4.878a1 1 0 000-2H3.009z'></path> </g></svg>
                            </button>
                        </div>
                    </div>
                )
            ))}

        </>

    )

    return view
};



export default Default_page