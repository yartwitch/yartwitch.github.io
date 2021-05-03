import React from 'react';
import DataParser from './DataParser';

class DataTable extends React.Component {

    constructor(props) {
        super();
        this.state = {
            isLoaded: false
        };
    }
    render() {
        return <table className='table table-sm table-dark table-bordered'>
            <thead>
                <tr>
                    {this.props.data[0].map((c, i) => <th key={i}>{c}</th>)}
                </tr>
            </thead>
            <tbody>
                {this.props.data.slice(1).map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}
            </tbody>
        </table>
    }
}

class DataSheet extends React.Component {
    constructor(props) {
        super();

        this.state = {
            isActive: props.isActive,
            tables: []
        };
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
            .fetchTablesAsync(this.props.documentId, this.props.sheetId)
            .then(tbls => this.setState({
                tables: tbls
            }));
    }

    render() {
        return this.state.tables.map((tbl, i) => <div key={i}><DataTable data={tbl}></DataTable><hr /></div>)
    }
}

export default DataSheet;