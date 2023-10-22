// Inisialisasi peta dengan koordinat awal
var d = GetData;
const BrandList = d.brand_names.map(d=>{
    return [d.nama,d.nama,d.nama,d.nama]
})
 
 
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


// Array untuk menyimpan gabungan data
const combinedData = [];
const MyKeyword = d.keyword.replace('+',' ').split(" ")[0]
// Menggabungkan data brand_names, product, dan keyword
for (const brand of d.brand_names) {
    for (const product of d.product) {
        const ProductName = product.nama.toLowerCase()
        const BrandName = brand.nama.toLowerCase()
        const combinedItem = `${ProductName.includes(MyKeyword) ? ProductName + ' ' : MyKeyword + ' ' + ProductName} ${BrandName}`;
        const ItemComFinal = combinedItem.replace('  ', ' ')
        if (!ItemComFinal.includes('harga') && !ItemComFinal.includes('toko')) {
            combinedData.push([ItemComFinal,ItemComFinal,ItemComFinal,ItemComFinal,ItemComFinal]);
        }
    }
}

const columnsData = [
    {
        select: 1,
        render: (data, cell, row) => {
            return `<img src="https://tse3.mm.bing.net/th?q=${encodeURIComponent(data)}" alt="${data}"  width="150" height="150" loading="lazy">`;
        },
    },
    {
        select: 2,
        render: (data, cell, row) => {
            return `<a class="mb-2 mr-2 btn-icon btn-square btn btn-primary"  onclick="SendImage('${data}')"><i class="lnr lnr-select btn-icon-wrapper"> </i>Produk Serupa</a>`;
        },
    },
    {
        select: 3,
        render: (data, cell, row) => {
            return `<a class="mb-2 mr-2 btn-icon btn-square btn btn-primary" onclick="SendUrl('${data}','trend')"><i class="lnr lnr-select btn-icon-wrapper"> </i>Trend Search</a>`;
        },
    },
    {
        select: 4,
        render: (data, cell, row) => {
            return `<a class="mb-2 mr-2 btn-icon btn-square btn btn-primary" onclick="SendUrl('${data}','')"><i class="lnr lnr-select btn-icon-wrapper"> </i>Keyword Search</a>`;
        },
    }, 
]

function TrendQueryData(id, JsonData,columns) {

    new simpleDatatables.DataTable(id, {
        perPageSelect: [2, 5, 10, 15, 20],
        perPage: 2,
        data: { data: JsonData },
        columns: columns
    })
}

TrendQueryData('#IDBrandList', BrandList,[
    {
        select: 1,
        render: (data, cell, row) => {
            return `<img src="https://tse3.mm.bing.net/th?q=${encodeURIComponent(data)}%20logo" alt="${data}"  width="150" height="150" loading="lazy">`;
        },
    },
    {
        select: 2,
        render: (data, cell, row) => {
            return `<a class="mb-2 mr-2 btn-icon btn-square btn btn-primary" onclick="SendUrl('${d.keyword+' '+data}','trend')"><i class="lnr lnr-select btn-icon-wrapper"> </i>Trend Search</a>`;
        },
    },
    {
        select: 3,
        render: (data, cell, row) => {
            return `<a class="mb-2 mr-2 btn-icon btn-square btn btn-primary" onclick="SendUrl('${d.keyword+' '+data}','')"><i class="lnr lnr-select btn-icon-wrapper"> </i>Keyword Search</a>`;
        },
    } 
])

TrendQueryData('#IDProductList', combinedData,columnsData)