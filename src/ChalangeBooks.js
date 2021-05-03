import React from 'react';
import ContentSheet from './ContentSheet';
import DataSheet from './DataSheet';

class ChallengeBooks extends React.Component {
    constructor(props) {
        super();
        this.state = {
            sheets: props.sheets
        };
    }
    
    componentWillReceiveProps(nextProps) {
        //You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.sheets !== this.state.sheets) {
          this.setState({ sheets: nextProps.sheets });
        }
      }

    render() {
        return (<div><ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            {this.state.sheets.map((st, i) => <li key={i} className="nav-item" role="presentation">
                <a className={`nav-link ${st.isActive === 'TRUE' ? 'active' : ''} ${st.isDisabled === 'TRUE' ? 'disabled' : ''}`} id={`link-${st.id}`} data-toggle="pill" href={`#pills-${st.id}`} role="tab"
                    onClick={()=>this.onSheetClicked(st)}>{st.name}</a>
            </li>)}
        </ul>
            <div className="tab-content" id="pills-tabContent">
                {this.state.sheets.map((st,i) => <div key={i} className={`tab-pane fade ${st.isActive === 'TRUE' ? 'show active' : ''} ${st.cssClass}`} id={`pills-${st.id}`} role="tabpanel">
                    {this.getTemplate(st)}
                </div>)}
            </div>
        </div>);
    }

    onSheetClicked(st)
    {
        var shts = [...this.state.sheets];

        for(let s of shts)
        {
            s.isActive = s.id === st.id ? 'TRUE' : 'FALSE'; 
        }


        this.setState({sheets:shts});
    }

    getTemplate(st)
    {
        if (st.sheetType.trim() === 'TableSet')
            return <DataSheet documentId={this.props.documentId} sheetId={st.tabId} isActive={st.isActive}/>;
        
        if (st.sheetType.trim() === 'Content')
            return <ContentSheet documentId={this.props.documentId} sheetId={st.tabId} isActive={st.isActive}/>;
            
        
        return <p>Unable to load....</p>;
    }

    buildSheets(tbls) {

        this.setState({ sheets: this.convertTableToObjectArray(tbls[1]) })
    }

    convertTableToObjectArray(tbl) {
        if (!tbl || tbl.length <= 1)
            return [];

        var retVal = [];
        var head = tbl[0];

        for (var ri = 1; ri < tbl.length; ri++) {
            var cv = {};
            for (var c = 0; c < head.length; c++) {
                cv[head[c].trim()] = tbl[ri][c];
            }
            retVal.push(cv);
        }

        return retVal;
    }
}

export default ChallengeBooks;