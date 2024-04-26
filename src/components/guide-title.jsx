
import Icon from '../assets/icon.png'

const guide_title = () => {

    const view = (
        <div className='left-guide-title'>
            <div class='item-background-container05'>
                <button type='button'>
                    <svg viewBox='0 0 24 24' preserveAspectRatio='xMidYMid meet' focusable='false' class='left-guide-title-icon' style='pointer-events: none; display: block;'>
                        <g class='left-guide-open-icon'>
                            <path d='M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z' class='left-guide-title-icon'></path>
                        </g>
                    </svg>
                </button>
            </div>
            <img src={Icon}></img>
            <p>Vortex</p>
        </div>

    )
    return view
};



export default guide_title