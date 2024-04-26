
import Guide_left from '../components/guide-left-view'
import Guide_top from '../components/guide-top-view'
import '../css/guide.css'

const Guide_aside = () => {


    return (
        <aside className='aside'>
            <Guide_left />
            <Guide_top />
        </aside>
    );
}

export default Guide_aside