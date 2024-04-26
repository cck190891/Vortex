import { createRef, Component } from 'preact';
import beautify from 'js-beautify';

const formatHTML = (html_code) => {
    return beautify.html(html_code, {
        indent_size: 2,
        space_in_empty_paren: true
    });
}

const formatTime = (time) => {
    const date = new Date(time);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, second: '2-digit' };
    return new Intl.DateTimeFormat('default', options).format(date);
};


const CopyButton = ({ target, style = {} }) => {
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(target);
        } catch (err) {
        }
    };
    return (
        <><button className='CopyButton' style={style} onClick={copyToClipboard}>{target}</button></>
    );
};

const NumberInput = ({ value_name, target_var = '' }) => {

    if (target_var === '') {
        return (
            <input
                type='text'
                className='number-input'
                id=''
                name=''
                value={String(value_name.value[target_var])}
                onInput={(event) => { (Number(event.target.value) && Number(event.target.value) != 0) ? value_name.value = Number(event.target.value) : null }}
            />
        );
    }
    else {
        return (
            <input
                type='text'
                className='number-input'
                id=''
                name=''
                value={String(value_name.value[target_var])}
                onInput={(event) => { (Number(event.target.value) && Number(event.target.value) != 0) ? value_name.value = { ...value_name.value, [target_var]: Number(event.target.value) } : null }}
            />
        );
    }
};
const CheckboxInput = ({ value_name, target_var = '' }) => {


    if (target_var === '') {
        return (
            <input
                type='checkbox'
                className='checkbox-input'
                id=''
                name=''
                checked={value_name.value}
                onInput={() => { value_name.value = !value_name.value }}
            />
        );
    } else {
        return (
            <input
                type='checkbox'
                className='checkbox-input'
                id=''
                name=''
                checked={value_name.value[target_var]}
                onInput={() => {
                    value_name.value = { ...value_name.value, [target_var]: !value_name.value[target_var] };
                }}
            />
        );
    }
};

class HTMLIframe extends Component {
    constructor(props) {
        super(props);
        this.iframeRef = createRef();
    }

    componentDidMount() {
        this.loadIframeContent();
    }

    componentDidUpdate(prevProps) {
        if (this.props.htmlContent !== prevProps.htmlContent || this.props.src !== prevProps.src) {
            this.loadIframeContent();
        }
    }

    loadIframeContent() {
        const iframe = this.iframeRef.current;
        if (iframe) {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            if (this.props.htmlContent) {
                doc.write(this.props.htmlContent);
            } else if (this.props.src) {
                iframe.src = this.props.src;
            }
            doc.close();
        }
    }

    render() {
        return (
            <iframe ref={this.iframeRef} style={this.props.style} id={this.props.id} ></iframe>
        );
    }
}


//Export function 
export { formatHTML, formatTime }
//Export component
export { CopyButton, NumberInput, CheckboxInput, HTMLIframe } 