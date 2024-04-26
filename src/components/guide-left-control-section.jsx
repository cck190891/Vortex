import { Link } from 'preact-router';
import { pages } from '../dataloader/parameter-guide-control'
const Guide_left_control = () => {
    return (
        <>

            <div className="left-guide-control-section">
                {pages.map((page, index) => (
                    <div class="item-background-container15" key={index}>
                        <Link href={page.router}>
                            <button type='button'>
                                {page.icon}
                                <p>{page.title}</p>
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Guide_left_control;
