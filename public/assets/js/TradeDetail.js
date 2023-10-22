
function TrendQueryData(id,JsonData,columnsData){

    new simpleDatatables.DataTable(id, {
        perPageSelect:[2,5, 10, 15 , 20],
        perPage:10,
        data: {data: JsonData},
        columns: columnsData
    })

}

function HsDesc(d) {
    window.open(`/trade/find-hs/desc/${d}`, "_blank");
}

function HSDetail(){

// Inisialisasi peta dengan koordinat awal
var dataAwal = GetData;
// console.log(JSON.stringify(dataAwal))

const columnsData = [
 
    {
        select: 2,
        render: (data, cell, row) => {
            return `<a class="mb-2 mr-2 btn-icon btn-square btn btn-primary" onclick="HsDesc('${data}')"><i class="lnr lnr-select btn-icon-wrapper"> </i>HS Detail</a>`;
        },
    },
    {
        select: 3,
        render: (data, cell, row) => {
            return `<a class="mb-2 mr-2 btn-icon btn-square btn btn-primary" href="/trade/export-import?hscode=${data}" target="_blank"><i class="lnr lnr-select btn-icon-wrapper"> </i>TRADE DATA</a>`;
        },
    }
]


TrendQueryData('#IDHsDetail',dataAwal,columnsData) 
}

