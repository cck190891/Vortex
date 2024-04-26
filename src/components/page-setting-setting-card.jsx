
const Setting_card = ({ single_card }) => {
    return (
        <div className='setting-card'>
            <div className='setting-title'>
                <p className='setting-category'>{single_card[0] + ':'}</p>
                <p className='setting-name'>{single_card[1]}</p>
            </div>
            <p className='setting-info' >{single_card[2]}</p>
            {single_card[3]}
        </div>
    )
}


export default Setting_card