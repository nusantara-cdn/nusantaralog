
// function getRandomColor() {
//     const random = () => Math.floor(Math.random() * 256);
//     return `rgba(${random()}, ${random()}, ${random()}, 1)`;
// }

// function getRandomColorArray(count) {
//     const colors = [];
//     for (let i = 0; i < count; i++) {
//         colors.push(getRandomColor());
//     }
//     return colors;
// }


function SendUrl(s,d) {
    var u = '/product-reseach/find-brand'
    if(d=='desc'){
        var v = `/trade/find-hs/desc/${s}`

        window.open(`${v}`, "_blank")
    }else{
        var v = `${u}/find-query/`
    } 
    // window.open(`${v+CryptoJS.AES.encrypt(s, SesToken).toString().replaceAll('/', '--')}`, "_blank");
  }

  
// Contoh penggunaan
const decryptedText = JSON.parse(CryptoJS.AES.decrypt(Datanya, SesToken).toString(CryptoJS.enc.Utf8))
console.log(decryptedText.kodehs)
// Data dari JSON yang Anda berikan
const data = decryptedText.data;

const arrayLength = data.length;

// Mengelompokkan dan menjumlahkan nilai berdasarkan pod
const groupedDataPod = data.reduce((acc, item) => {
    const existingItem = acc.find(group => group.pod === item.pod);
    if (existingItem) {
        existingItem.value += item.value;
        existingItem.netweight += item.netweight;
        
    } else {
        acc.push({ pod: item.pod, value: item.value, netweight:item.netweight });
    }
    return acc;
}, []);

// Mengelompokkan dan menjumlahkan nilai berdasarkan CTR
const groupedDataCtr = data.reduce((acc, item) => {
    const existingItem = acc.find(group => group.ctr === item.ctr);
    if (existingItem) {
        existingItem.value += item.value;
        existingItem.netweight += item.netweight;
    } else {
        acc.push({ ctr: item.ctr, value: item.value, netweight:item.netweight });
    }
    return acc;
}, []);

const groupedDataBulanans = data.reduce((acc, item) => {
    const existingItem = acc.find(group => group.bulan === item.bulan);
    if (existingItem) {
        existingItem.value += item.value;
        existingItem.netweight += item.netweight;
    } else {
        acc.push({ bulan: item.bulan, value: item.value, netweight:item.netweight ,kd_bulan: item.bulan.split('[')[1].split(']')[0]});
    }
    return acc;
}, []);

const groupedDataBulanan = groupedDataBulanans.sort((a, b) => a.kd_bulan - b.kd_bulan);

// Menyusun data untuk diagram lingkaran
const pieChartData = groupedDataPod.map(item => ({
    x: item.pod,
    y: item.value
})).sort((a, b) => b.y - a.y);

// Menyusun data untuk diagram lingkaran
const pieChartDataCTR = groupedDataCtr.map(item => ({
    x: item.ctr,
    y: item.value
})).sort((a, b) => b.y - a.y);

 
const sumTotal = arr => arr.reduce((sum, { y }) => sum + y, 0)
const sumTotalWeight = arr => arr.reduce((sum, { netweight }) => sum + netweight, 0)

const totalValue = sumTotal(pieChartData)
const totalWeight = sumTotalWeight(groupedDataCtr)


document.addEventListener('alpine:init', () => {

    Alpine.data('sales', () => ({
        init() {
            isDark = this.$store.app.theme === 'dark' || this.$store.app.isDarkMode ? true : false;
            isRtl = this.$store.app.rtlClass === 'rtl' ? true : false;

            const revenueChart = null;
             const revenueChartCTR = null;
             const revenueChartBulanan = null;

             // revenue

            setTimeout(() => {
                this.revenueChart = new ApexCharts(this.$refs.revenueChart, this.revenueChartOptions);
                this.$refs.revenueChart.innerHTML = '';
                this.revenueChart.render(); 

                this.revenueChartCTR = new ApexCharts(this.$refs.revenueChartCTR, this.revenueChartCTROptions);
                this.$refs.revenueChartCTR.innerHTML = '';
                this.revenueChartCTR.render();

                
            if(decryptedText.timeframe =='month'){
                this.revenueChartBulanan = new ApexCharts(this.$refs.revenueChartBulanan, this.revenueChartBulananOptions);
                this.$refs.revenueChartBulanan.innerHTML = '';
                this.revenueChartBulanan.render();
            }

            }, 300);

            this.$watch('$store.app.theme', () => {
                isDark = this.$store.app.theme === 'dark' || this.$store.app.isDarkMode ? true : false;

                this.revenueChart.updateOptions(this.revenueChartOptions);
 
                this.revenueChartCTR.updateOptions(this.revenueChartCTROptions);

                this.revenueChartBulanan.updateOptions(this.revenueChartBulananOptions);

             });

            this.$watch('$store.app.rtlClass', () => {
                isRtl = this.$store.app.rtlClass === 'rtl' ? true : false;
                this.revenueChart.updateOptions(this.revenueChartOptions);
                this.revenueChartCTR.updateOptions(this.revenueChartCTROptions);
                this.revenueChartBulanan.updateOptions(this.revenueChartBulananOptions);
            });
        },
        // revenue    
        get revenueChartBulananOptions() {
                    return {
                        series: [
                            {
                                name: 'Nilai Transaksi ($ USD)',
                                data: groupedDataBulanan.map(item => ({  y: item.value })).map(item => item.y),
                            },
                        ],
                        chart: {
                            height: 325,
                            type: 'bar',
                            fontFamily: 'Nunito, sans-serif',
                            zoom: {
                                enabled: false,
                            },
                            toolbar: {
                                show: false,
                            },
                        },
                        plotOptions: {
                            bar: {
                              columnWidth: '45%',
                              distributed: true,
                            }
                          },
                        dataLabels: {
                            enabled: false,
                        },
                        stroke: {
                            show: true,
                            curve: 'smooth',
                            width: 2,
                            lineCap: 'square',
                        },
                        dropShadow: {
                            enabled: true,
                            opacity: 0.2,
                            blur: 10,
                            left: -7,
                            top: 22,
                        },
                        colors: isDark ? ['#2196f3', '#e7515a'] : ['#1b55e2', '#e7515a'],
                        markers: {
                            discrete: [
                                {
                                    seriesIndex: 0,
                                    dataPointIndex: 6,
                                    fillColor: '#1b55e2',
                                    strokeColor: 'transparent',
                                    size: 7,
                                },
                                {
                                    seriesIndex: 1,
                                    dataPointIndex: 5,
                                    fillColor: '#e7515a',
                                    strokeColor: 'transparent',
                                    size: 7,
                                },
                            ],
                        },
                        labels: groupedDataBulanan.map(item => ({ x: item.bulan })).map(item => item.x),
                        xaxis: {
                            axisBorder: {
                                show: false,
                            },
                            axisTicks: {
                                show: false,
                            },
                            crosshairs: {
                                show: true,
                            },
                            labels: {
                                offsetX: isRtl ? 2 : 0,
                                offsetY: 5,
                                style: {
                                    fontSize: '12px',
                                    cssClass: 'apexcharts-xaxis-title',
                                },
                            },
                        },
                        yaxis: {
                            tickAmount: 7,
                            labels: {
                                formatter: (value) => {
                                    return value / 1000 + 'K';
                                },
                                offsetX: isRtl ? -30 : -10,
                                offsetY: 0,
                                style: {
                                    fontSize: '12px',
                                    cssClass: 'apexcharts-yaxis-title',
                                },
                            },
                            opposite: isRtl ? true : false,
                        },
                        grid: {
                            borderColor: isDark ? '#191e3a' : '#e0e6ed',
                            strokeDashArray: 5,
                            xaxis: {
                                lines: {
                                    show: true,
                                },
                            },
                            yaxis: {
                                lines: {
                                    show: false,
                                },
                            },
                            padding: {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                            },
                        },
        
                        tooltip: {
                            marker: {
                                show: true,
                            },
                            x: {
                                show: false,
                            },
                        },
                        fill: {
                            type: 'gradient',
                            gradient: {
                                shadeIntensity: 1,
                                inverseColors: !1,
                                opacityFrom: isDark ? 0.19 : 0.28,
                                opacityTo: 0.05,
                                stops: isDark ? [100, 100] : [45, 100],
                            },
                        },
                    };
                },

        // revenue
        get revenueChartOptions() {
            return {
                series: [
                    {
                        name: 'Nilai Transaksi ($ USD)',
                        data: pieChartData.map(item => item.y),
                    },
                ],
                chart: {
                    height: 325,
                    type: 'bar',
                    fontFamily: 'Nunito, sans-serif',
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                plotOptions: {
                    bar: {
                      columnWidth: '45%',
                      distributed: true,
                    }
                  },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    curve: 'smooth',
                    width: 2,
                    lineCap: 'square',
                },
                dropShadow: {
                    enabled: true,
                    opacity: 0.2,
                    blur: 10,
                    left: -7,
                    top: 22,
                },
                colors: isDark ? ['#2196f3', '#e7515a'] : ['#1b55e2', '#e7515a'],
                markers: {
                    discrete: [
                        {
                            seriesIndex: 0,
                            dataPointIndex: 6,
                            fillColor: '#1b55e2',
                            strokeColor: 'transparent',
                            size: 7,
                        },
                        {
                            seriesIndex: 1,
                            dataPointIndex: 5,
                            fillColor: '#e7515a',
                            strokeColor: 'transparent',
                            size: 7,
                        },
                    ],
                },
                labels: pieChartData.map(item => item.x),
                xaxis: {
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    crosshairs: {
                        show: true,
                    },
                    labels: {
                        offsetX: isRtl ? 2 : 0,
                        offsetY: 5,
                        style: {
                            fontSize: '12px',
                            cssClass: 'apexcharts-xaxis-title',
                        },
                    },
                },
                yaxis: {
                    tickAmount: 7,
                    labels: {
                        formatter: (value) => {
                            return value / 1000 + 'K';
                        },
                        offsetX: isRtl ? -30 : -10,
                        offsetY: 0,
                        style: {
                            fontSize: '12px',
                            cssClass: 'apexcharts-yaxis-title',
                        },
                    },
                    opposite: isRtl ? true : false,
                },
                grid: {
                    borderColor: isDark ? '#191e3a' : '#e0e6ed',
                    strokeDashArray: 5,
                    xaxis: {
                        lines: {
                            show: true,
                        },
                    },
                    yaxis: {
                        lines: {
                            show: false,
                        },
                    },
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    },
                },

                tooltip: {
                    marker: {
                        show: true,
                    },
                    x: {
                        show: false,
                    },
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: !1,
                        opacityFrom: isDark ? 0.19 : 0.28,
                        opacityTo: 0.05,
                        stops: isDark ? [100, 100] : [45, 100],
                    },
                },
            };
        }, 
        // revenue

        get revenueChartCTROptions() {
            return {
                series: [
                    {
                        name: 'Nilai Transaksi ($ USD)',
                        data: pieChartDataCTR.map(item => item.y),
                    },
                ],
                chart: {
                    height: 325,
                    type: 'bar',
                    fontFamily: 'Nunito, sans-serif',
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                plotOptions: {
                    bar: {
                      columnWidth: '45%',
                      distributed: true,
                    }
                  },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    curve: 'smooth',
                    width: 2,
                    lineCap: 'square',
                },
                dropShadow: {
                    enabled: true,
                    opacity: 0.2,
                    blur: 10,
                    left: -7,
                    top: 22,
                },
                colors: isDark ? ['#2196f3', '#e7515a'] : ['#1b55e2', '#e7515a'],
                markers: {
                    discrete: [
                        {
                            seriesIndex: 0,
                            dataPointIndex: 6,
                            fillColor: '#1b55e2',
                            strokeColor: 'transparent',
                            size: 7,
                        },
                        {
                            seriesIndex: 1,
                            dataPointIndex: 5,
                            fillColor: '#e7515a',
                            strokeColor: 'transparent',
                            size: 7,
                        },
                    ],
                },
                labels: pieChartDataCTR.map(item => item.x),
                xaxis: {
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    crosshairs: {
                        show: true,
                    },
                    labels: {
                        offsetX: isRtl ? 2 : 0,
                        offsetY: 5,
                        style: {
                            fontSize: '12px',
                            cssClass: 'apexcharts-xaxis-title',
                        },
                    },
                },
                yaxis: {
                    tickAmount: 7,
                    labels: {
                        formatter: (value) => {
                            return value / 1000 + 'K';
                        },
                        offsetX: isRtl ? -30 : -10,
                        offsetY: 0,
                        style: {
                            fontSize: '12px',
                            cssClass: 'apexcharts-yaxis-title',
                        },
                    },
                    opposite: isRtl ? true : false,
                },
                grid: {
                    borderColor: isDark ? '#191e3a' : '#e0e6ed',
                    strokeDashArray: 15,
                    xaxis: {
                        lines: {
                            show: true,
                        },
                    },
                    yaxis: {
                        lines: {
                            show: false,
                        },
                    },
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    },
                },
                tooltip: {
                    marker: {
                        show: true,
                    },
                    x: {
                        show: false,
                    },
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: !1,
                        opacityFrom: isDark ? 0.19 : 0.28,
                        opacityTo: 0.05,
                        stops: isDark ? [100, 100] : [45, 100],
                    },
                },
            };
        }, 
        // total orders

    }));
});



const asd = [
    {
        select: 0,
        render: (data, cell, row) => {
            return `<img src="https://tse3.mm.bing.net/th?q=${encodeURIComponent(data)}" alt="${data}"  width="150" height="150" loading="lazy">`;
        },
    },
    {
        select: 1,
        render: (data, cell, row) => {
            return `<a class="mb-2 mr-2 btn-icon btn-square btn btn-primary"  onclick="SendImage('${data}','')"><i class="lnr lnr-select btn-icon-wrapper"> </i>Produk Serupa</a>`;
        },
    },
    {
        select: 2,
        render: (data, cell, row) => {
            return `<a class="mb-2 mr-2 btn-icon btn-square btn btn-primary" onclick="SendUrl('${data}','trend')"><i class="lnr lnr-select btn-icon-wrapper"> </i>Trend Search</a>`;
        },
    },
    {
        select: 3,
        render: (data, cell, row) => {
            return `<a class="mb-2 mr-2 btn-icon btn-square btn btn-primary" onclick="SendUrl('${data}','desc')"><i class="lnr lnr-select btn-icon-wrapper"> </i>Deskripsi Produk</a>`;
        },
    }

    
]

function TrendQueryData(id,JsonData ,columnsData){

    new simpleDatatables.DataTable(id, {
        perPageSelect:[2,5, 10, 15 , 20],
        perPage:5,
        data: {data: JsonData},
        columns: columnsData
    })

}
const KwHs = decryptedText.hs_detail.split('] ')[1]
TrendQueryData('#IDTradePOD',groupedDataPod.map(d=>{  return [d.pod,d.value,d.netweight] }),[])
TrendQueryData('#IDTradeCTR',groupedDataCtr.map(d=>{  return [d.ctr,d.value,d.netweight] }),[])
TrendQueryData('#IDProductReseach',[[KwHs,KwHs,KwHs,decryptedText.kodehs]],asd)

decryptedText.timeframe =='year'? '':TrendQueryData('#IDTradeBulanan',groupedDataBulanan.map(d=>{  return [d.bulan,d.value,d.netweight] }))
document.getElementById("SummaryryHS").innerText = `Detail Transaksi Dari ( ${decryptedText.hs_detail} ) Periode ${decryptedText.timeframe == 'month' ?'Bulanan':'Tahunan'} Tahun ${decryptedText.tahun}`;

document.getElementById("SummaryryHSTrans").innerText ='Total Nilai Transaksi ($ USD) : ' + totalValue
document.getElementById("SummaryryHSWright").innerText = 'Total Jumlah Berat (Kilogram) : ' + totalWeight