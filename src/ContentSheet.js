import React from 'react';
import DataParser from './DataParser';
import TemplateParser from './TemplateParser';

class ContentSheet extends React.Component {
    constructor(props) {
        super();

        this.state = {
            isActive: props.isActive,
            text: ''
        }
    }

    componentDidMount() {
        if (this.props.isActive === 'FALSE')
            return;

        this.load();
    }

    componentWillReceiveProps(nextProps) {
        //You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.isActive !== this.state.isActive) {
            this.setState({ isActive: nextProps.isActive });
            
            if (nextProps.isActive === 'TRUE')
                this.load();
        }
    }
    isLoadCalled = false;

    load() {
        if (this.isLoadCalled)
            return;
        
        this.isLoadCalled = true

        DataParser
            .fetchText(this.props.documentId, this.props.sheetId)
            .then(txt => this.setState({ text: txt }));
    }

    render() {
        var rows = this.state.text.split('\n');
        var withTemplates = rows.map(r => TemplateParser.parseTemplate(r));
        return withTemplates.map((tmp, i) => <div key={i}>{tmp}</div>);
    }
}

export default ContentSheet;