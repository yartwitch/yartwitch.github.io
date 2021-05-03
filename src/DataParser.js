class DataParser
{
    static *splitTableArray(tables)
    {
        var rows = tables.split('\n');
        var tbl = [];
        var ri = 0;
        while (ri < rows.length)
        {
            if (rows[ri].trim())
            {
                tbl.push(rows[ri].split('\t'));
            }
            else
            {
                if (tbl.length > 0)
                    yield tbl;
                
                tbl = [];
            }
            ri++;
        }

        if (tbl.length > 0)
            yield tbl;
    }

    static async fetchText(documentId, grdId=0)
    {
        var url = `https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=${documentId}&single=true&gid=${grdId}&output=txt&_ts=${new Date().getTime()}`;
        const response = await fetch(`${url}&_ts=${new Date().getTime()}`);
        return await response.text();
    }
    
    static async fetchTablesAsync(documentId, grdId=0)
    {
        var txt = await DataParser.fetchText(documentId, grdId);
        return Array.from(DataParser.splitTableArray(txt));
    }
}

export default DataParser;