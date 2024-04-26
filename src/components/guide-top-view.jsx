
import Guide_title from './guide-title';
import Guide_top_control from './guide-top-control-section';
import Guide_top_search from './guide-top-search-section';


const Guide_top = () => {
    const view = (
        <>
            <div className='top-guide-layout'>
                <Guide_title />
                <Guide_top_search />
                <Guide_top_control />
            </div>
        </>
    )


    return view
};



export default Guide_top