import { setting_table } from '../dataloader/parameter-setting';
import Setting_card from '../components/page-setting-setting-card'
import '../css/page-setting.css'

const Setting_page = () => {
    const view = (
        <>
            <div className='setting-page'>
                <div className='page'>
                    <p className='page-title'>Config</p>
                </div>
                {setting_table.map((single) => (
                    <Setting_card single_card={single} />
                ))}
            </div>
        </>
    )

    return view
};



export default Setting_page

