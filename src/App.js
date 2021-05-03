import React from 'react';
import './App.css';
import ChalangeBooks from './ChalangeBooks';
import DataParser from './DataParser';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      settings: {
        header: '',
        headerImg: '',
        prizePool: ''
      },
      sheets: []
    };
  }
  componentDidMount() {
    DataParser
      .fetchTablesAsync('1rysFoH2wGvRTXOcq0kty6dNOmTY8ZEj71AgQOaXxcwk')
      .then(tbls => this.setState({
        settings: this.convertTableToObject(tbls[0]),
        sheets: this.convertTableToObjectArray(tbls[1])
      }));
  }
  render() {
    return (<div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col">
            <h1 className="m-4">{this.state.settings.header}</h1>
          </div>
          <div className="col-auto">
            <div className='prize-pool text-center'>
              <div className='hl'>Prize Pool</div>
              <div style={{ fontSize: '1.6em', fontFamily: 'Verdana,sans-serif' }}>{this.state.settings.prizePool}</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxHeight: 350 }} className="h-25 overflow-hidden">
        <img src={this.state.settings.headerImg} className="w-100" alt='' />
      </div>
      <div className="container mt-4">
        <ChalangeBooks documentId='1rysFoH2wGvRTXOcq0kty6dNOmTY8ZEj71AgQOaXxcwk' sheets={this.state.sheets} />
      </div>
    </div>);
  }

  convertTableToObject(tbl) {
    if (!tbl)
      return {};
    
    var obj = {};
    for(let i = 0; i < tbl.length; i++)
    {
      obj[tbl[i][0].trim()] = tbl[i][1].trim(); 
    }

    return obj;
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

export default App;
