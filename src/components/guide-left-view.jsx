
import Guide_left_control from './guide-left-control-section';
import Guide_title from './guide-title';
import ko_fi from '../assets/ko-fi.png'
import paypal_me from '../assets/paypal-me.png'

const Guide_left = () => {
    const view = (
        <div className='left-guide-layout'>
            <Guide_title />
            <Guide_left_control />
            <div className='divider'></div>
            <div className='left-guide-section' >
                <div className='filldiv'></div>
                <div className='support'>
                    <a href='https://ko-fi.com/cck190891' className='ko-fi' target='_blank'>
                        <img src={ko_fi} alt='support on Ko-fi' />
                    </a>
                    <a href='https://www.paypal.com/paypalme/cck19089' className='paypal-me' target='_blank'>
                        <img src={paypal_me} alt='support on Ko-fi' />
                    </a>
                </div>
            </div>
        </div>
    )

    return view
};



export default Guide_left