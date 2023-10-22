
function SendUrl(s) {
  var u = '/product-reseach/find-brand'
  if(s=='brand-reseach'){
      var v = `${u}/brand-reseach/`
  }else{
      var v = `${u}/find-query/`
  } 
  window.open(`${v+CryptoJS.AES.encrypt(QueryDataTimeframe, SesToken).toString().replaceAll('/', '--')}`, "_blank");
}


// Inisialisasi peta dengan koordinat awal
var dataAwal = GeomapJsonData;
// function GeoMapTableRender(q) {

//     q.forEach(async function (data) {

//         document
//             .getElementById("TrendTable")
//             .innerHTML += `<tr><td>${data.geoName}</td><td>${data.coordinates.lat + ',' + data.coordinates.lng}</td><td>${data.formattedValue[0]}%</td><td><a href="https://www.google.com/maps/search/?api=1&query=${data.coordinates.lat + ',' + data.coordinates.lng}" type="button" class="btn btn-primary w-full" target="_blank">Peta Lokasi</a></td></tr>`
//     });
// }
 


    // console.log(JSON.stringify(apaaja))


  new simpleDatatables.DataTable("#IDTrendTable", {
    perPageSelect:[2,5, 10, 15 , 20],
    perPage:5,
    data: {data: dataAwal.map(d=>{
      return [
          d.geoName,
          d.coordinates.lat + ',' + d.coordinates.lng,
          d.formattedValue[0],
          `<a href="https://www.google.com/maps/search/?api=1&query=${d.coordinates.lat + ',' + d.coordinates.lng}" type="button" class="btn btn-primary w-full" target="_blank">Peta Lokasi</a>`
      ]}) }
})

 

// GeoMapTableRender(dataAwal)

var totalLat = dataAwal.reduce(function (total, item) {
    if (item.coordinates && typeof item.coordinates.lat === 'number') {
        return total + item.coordinates.lat;
    }
    return total;
}, 0);

var totalLng = dataAwal.reduce(function (total, item) {
    if (item.coordinates && typeof item.coordinates.lng === 'number') {
        return total + item.coordinates.lng;
    }
    return total;
}, 0);



var nilaiLat = totalLat / dataAwal.length;

var nilaiLang = totalLng / dataAwal.length;
 
var map = L.map('map').setView([isNaN(nilaiLat)==true?0:nilaiLat, isNaN(nilaiLang)==true?0:nilaiLang], 9);

// Tambahkan tile layer (misalnya OpenStreetMap)
L.tileLayer('//images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&url=//i0.wp.com/{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?w=250', {
    maxZoom: 19,
}).addTo(map);

// Data JSON
var data = dataAwal;

// Loop melalui data JSON dan tambahkan marker ke peta
for (var i = 0; i < data.length; i++) {
    var marker = L.marker([data[i].coordinates.lat, data[i].coordinates.lng]).addTo(map);

    // Tambahkan detail yang muncul saat dihover
    marker.bindPopup(
        '<strong>' + data[i].geoName + '</strong><br>' +
        'Trending: ' + data[i].formattedValue[0] + '%'
    );
}

// console.log(TimeframeData)
// CHART DATA
var options = {
    series: [{
      name: "Percent Trending",
      data: TimeframeValue
    }
  ],
    chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: [3],
    curve: 'straight',
    dashArray: [0]
  },
  title: {
    text: 'Trending Data ( '+QueryDataTimeframe.toUpperCase()+' ) | From : '+StartDateTimeFrame+' - To : '+EndDateTimeFrame,
    align: 'left'
  },
  legend: {
    tooltipHoverFormatter: function(val, opts) {
      return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
    }
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 6
    }
  },
  xaxis: {
    categories: TimeframeData,
  },
  tooltip: {
    y: [
      {
        title: {
          formatter: function (val) {
            return val + " %"
          }
        }
      } 
    ]
  },
  grid: {
    borderColor: '#f1f1f1',
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();