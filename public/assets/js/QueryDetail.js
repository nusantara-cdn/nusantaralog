
function SendUrl(d,s) {
    var u = '/product-reseach/find-brand'
    if(s=='trend'){
        var v = `${u}/trend/`
    }else{
        var v = `${u}/find-query/`
    }
    // alert(`${v+CryptoJS.AES.encrypt(d, SesToken).toString().replaceAll('/', '--')}`)
    window.open(`${v+CryptoJS.AES.encrypt(d, SesToken).toString().replaceAll('/', '--')}`, "_blank");
}


 
function SendImage(d) {
    window.open(
    `https://lens.google.com/uploadbyurl?url=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fq%3D${encodeURIComponent(d)}`, "_blank");
}

// Inisialisasi peta dengan koordinat awal
var dataAwal = GetData;
// console.log(JSON.stringify(dataAwal))

const columnsData = [
 
    {
        select: 4,
        render: (data, cell, row) => {
            return `<img src="https://tse3.mm.bing.net/th?q=${data}" alt="${data}"  width="150" height="150" loading="lazy">`;
        },
    },
    {
        select: 5,
        render: (data, cell, row) => {
            return `<a class="mb-2 mr-2 btn-icon btn-square btn btn-primary" onclick="SendImage('${data}')"><i class="lnr lnr-select btn-icon-wrapper"> </i>Produk Serupa</a>`;
        }
    },
    {
        select: 6,
        render: (data, cell, row) => {
            return `<a class="mb-2 mr-2 btn-icon btn-square btn btn-primary" onclick="SendUrl('${data}','trend')"><i class="lnr lnr-select btn-icon-wrapper"> </i>Trend Search</a>`;
        },
    },
]

// const columnsPage = [2,5, 10, 15 , 20]



function TrendQueryData(id,JsonData){

    new simpleDatatables.DataTable(id, {
        perPageSelect:[2,5, 10, 15 , 20],
        perPage:2,
        data: {data: JsonData},
        columns: columnsData
    })

}

function ArrReverse(d){

    return d.map(d=>{ return [d[0],d[1],d[2],d[3],d[0],d[0],d[0]]})
}

TrendQueryData('#IDTrendTable',ArrReverse(dataAwal.top))
TrendQueryData('#IDBestProduct',ArrReverse(dataAwal.best))
TrendQueryData('#IDTrendTableMonthDecrease',ArrReverse(dataAwal.menurun_triulan))
TrendQueryData('#IDTrendTableMonthIncrease',ArrReverse(dataAwal.menaik_triulan))
TrendQueryData('#IDTrendTableYearIncrease',ArrReverse(dataAwal.menaik_tahunan))
TrendQueryData('#IDTrendTableYearDecrease',ArrReverse(dataAwal.menurun_tahunan))
