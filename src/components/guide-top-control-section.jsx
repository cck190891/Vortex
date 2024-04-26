import { theme, theme_svg } from './utils/plugin-theme'


const Guide_top_control = () => {

    const view = (

        <div className='top-guide-control-section'>
            <div className='top-guide-control-section-inside'>


                <div className='theme'>
                    <button type='button' title='switch theme' onClick={() => { theme.value = theme.value === 'light' ? 'dark' : 'light'; }}>
                        {theme_svg.value}
                    </button>
                </div>

            </div>
        </div>
    )
    return view
};



export default Guide_top_control