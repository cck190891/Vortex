import { signal } from '@preact/signals'
import { select_single } from '../components/utils/plugin-dialog'
import { CopyButton, NumberInput, CheckboxInput } from '../components/utils/plugin-reuse-tools'
import { cookie_path, Local_state_path, cookie_page_setting } from './parameter-cookies'
import { appDataDirPath, localDataDirPath, dataDirPath } from '../components/utils/plugin-path'
import { get_ } from '../components/utils/plugin-invokefn'
import { del_cookies_by_domain } from '../components/utils/plugin-invokefn'

// 定義參數
const setting_table = []

// 選項輸出 [類型,名稱,解釋,功能]

// 建立每個選項
const cookie_file = signal(
    [
        'File ',
        'Cookies path ',
        '',
        <div className='setting-handle'>
            <div className='setting-show' >
                <CopyButton target={cookie_path} />
            </div >
            <div className='setting-control'>
                <button className='control-btn' id='path-selecter' onClick={async () => {
                    const selected = await select_single({ target_name: 'cookies' })
                    cookie_path.value = selected || cookie_path.value;
                }}>Select cookie path</button >
                <button className='control-btn' id='path-reset' onClick={async () => {
                    localStorage.removeItem('cookies-path');
                    cookie_path.value = await get_('cookie_path');
                }}>Reset cookie path</button >
            </div>
        </div>
    ])

// const local_state_file = signal(
//     [
//         'File ',
//         'Local state path ',
//         '',


//         <div className='setting-handle'>
//             <div className='setting-show' >
//                 <CopyButton target={Local_state_path} />
//             </div >
//             <div className='setting-control'>
//                 <button className='control-btn' id='path-selecter' onClick={async () => {
//                     const selected = await select_single({ target_name: 'Local State' })
//                     Local_state_path.value = selected || Local_state_path.value;
//                 }}>Select Local state path</button >
//                 <button className='control-btn' id='path-reset' onClick={async () => {
//                     localStorage.removeItem('local-state-path');
//                     Local_state_path.value = await get_('local_state_path');
//                 }}>Reset Local state path</button >
//             </div>
//         </div>
//     ])
// const appDataDir_Path = signal(
//     [
//         'Dir ',
//         'AppData path ',
//         '',
//         <div className='setting-handle'>
//             <div className='setting-show' >
//                 <CopyButton target={appDataDirPath} />
//             </div >
//             <div className='setting-control'>
//             </div>
//         </div>
//     ])
const localDataDir_Path = signal(
    [
        'Dir ',
        'LocalData path ',
        '',
        <div className='setting-handle'>
            <div className='setting-show' >
                <CopyButton target={localDataDirPath} />
            </div >
            <div className='setting-control'>
            </div>
        </div>
    ])
// const dataDir_Path = signal(
//     [
//         'Dir ',
//         'Data path ',
//         '',
//         <div className='setting-handle'>
//             <div className='setting-show' >
//                 <CopyButton target={dataDirPath} />
//             </div >
//             <div className='setting-control'>
//             </div>
//         </div>
//     ])

const cookie_remove_all = signal(
    [
        'Tool ',
        'Remove all cookies ',
        '',

        <div className='setting-handle'>
            <div className='setting-show' >
            </div >
            <div className='setting-control'>
                <button className='control-btn' id='romove-cookies' onClick={async () => {
                    del_cookies_by_domain('')
                }}>Remove All Cookies</button >

            </div>
        </div>
    ])



const html_shower_height_control = signal(
    [
        'Style ',
        'HTML shower height (px)',
        '',
        <div className='setting-handle'>
            <div className='setting-show' >
            </div >
            <div className='setting-control'>
                <NumberInput value_name={cookie_page_setting} target_var={'html_shower_height'} />
            </div>
        </div>
    ])

const cookie_filiter_strict = signal(
    [
        'Tool ',
        'Cookie filter strict mode',
        '(Experimental Tools)',
        <div className='setting-handle'>
            <div className='setting-show' >
            </div >
            <div className='setting-control'>
                <CheckboxInput value_name={cookie_page_setting} target_var={'cookie_filiter'} />
                <p className='explain-text' >If unchecked, the filtering condition will be relaxed and cookies that partially match the host filter will also be displayed. <br /></p>
            </div>
        </div>
    ])
const userAgent = signal(
    [
        'User Agent ',
        '',
        '',
        <div className='setting-handle'>
            <div className='setting-show' >
                <CopyButton target={'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0'} />
            </div >
            <div className='setting-control'>
            </div>
        </div>
    ])

setting_table.push(cookie_file.value);
// setting_table.push(local_state_file.value);
setting_table.push(localDataDir_Path.value);
setting_table.push(cookie_remove_all.value);
setting_table.push(html_shower_height_control.value);
setting_table.push(cookie_filiter_strict.value);
setting_table.push(userAgent.value);
// setting_table.push(appDataDir_Path.value);
// setting_table.push(dataDir_Path.value);
setting_table.sort();

export { setting_table }



