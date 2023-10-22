function LoadData(saq) {
    document
        .getElementById("Searchdata")
        .innerHTML = `<span class="animate-spin border-4 border-success border-l-transparent rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"></span>`

    let data = Qs.stringify({ 'search': SearchKey });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/api/search/topic-search',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    axios
        .request(config)
        .then((response) => {
            location.reload()
        })
        .catch((error) => {
            console.log(error);
        });

}

axios
    .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `/api/search/topic-search?search=${SearchKey}`
    })
    .then((response) => {

        if (response.data.total_data == 0) {
            LoadData('')
        } else {
            FindQuery()

            document
                .getElementById("TotalData")
                .innerText = response.data.total_data

            document
                .getElementById("twitter")
                .innerText = response.data.detail.twitter + ' Data'
            document
                .getElementById("facebook")
                .innerText = response.data.detail.facebook + ' Data'
            document
                .getElementById("instagram")
                .innerText = response.data.detail.instagram + ' Data'
            document
                .getElementById("news")
                .innerText = response.data.detail.news + ' Data'
            document
                .getElementById("youtube")
                .innerText = response.data.detail.youtube + ' Data'

            //SENTIMENT

            document.getElementById('twpos').innerText = "Positif : " + response.data.sentiment_score.twitter[0]
            document.getElementById('twnet').innerText = "Netral : " + response.data.sentiment_score.twitter[1]
            document.getElementById('twneg').innerText = "Negative : " + response.data.sentiment_score.twitter[2]

            document.getElementById('fbpos').innerText = "Positif : " + response.data.sentiment_score.facebook[0]
            document.getElementById('fbnet').innerText = "Netral : " + response.data.sentiment_score.facebook[1]
            document.getElementById('fbneg').innerText = "Negative : " + response.data.sentiment_score.facebook[2]

            document.getElementById('igpos').innerText = "Positif : " + response.data.sentiment_score.instagram[0]
            document.getElementById('ignet').innerText = "Netral : " + response.data.sentiment_score.instagram[1]
            document.getElementById('igneg').innerText = "Negative : " + response.data.sentiment_score.instagram[2]

            document.getElementById('nypos').innerText = "Positif : " + response.data.sentiment_score.news[0]
            document.getElementById('nynet').innerText = "Netral : " + response.data.sentiment_score.news[1]
            document.getElementById('nyneg').innerText = "Negative : " + response.data.sentiment_score.news[2]

            document.getElementById('ytpos').innerText = "Positif : " + response.data.sentiment_score.youtube[0]
            document.getElementById('ytnet').innerText = "Netral : " + response.data.sentiment_score.youtube[1]
            document.getElementById('ytneg').innerText = "Negative : " + response.data.sentiment_score.youtube[2]

        }
        asesmentRender(response.data.data)

    })
    .catch((error) => {
        console.log(error);
    });

function SentimenLabel(label) {

    if (label == 'pos') {
        ColorLabel = `badge bg-primary rounded-full`
    } else if (label == 'neg') {
        ColorLabel = `badge bg-danger rounded-full`

    } else {
        ColorLabel = `badge bg-info rounded-full`

    }

    return ColorLabel
}

function asesmentRender(q) {

    q.forEach(async function (data) {

        document
            .getElementById("Searchdata")
            .innerHTML += `<div
            class="h-screen max-h-[30rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
            <div class="p-5 flex items-center flex-col sm:flex-row">
                <div class="mb-5 w-20 h-20 rounded-full overflow-hidden">
                    <img
                        src="${data.thumbnail_user}"
                        alt="${data.screen_name}"
                        class="w-full h-full object-cover"/>
                </div>
                <div class="flex-1 ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                    <h5 class="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">${data.name}</h5>
                    <p class="mb-2 text-white-dark">@${data.screen_name}</p>
                    <span class="${SentimenLabel(
                data.sentiment
            )}">${data.sentiment}</span>
                    <p class="font-semibold text-white-dark mt-4 sm:mt-8">${(data.tweet).replaceAll(`${SearchKey}`, `<mark class="undefined " highlightindex="1">${SearchKey}</mark>`)}</p>
                </div>
            </div>
        </div>`
    });
}

function SaveTopic() {

    let data = Qs.stringify({
        'query': SearchKey
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/api/search/topic-save',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {


            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Berhasil menyimpan topik",
                timer: 1700
            });

            setTimeout(function () {
                    location.reload();  // window.location.href = "/admin"; //will redirect to your blog page (an ex: blog.html)
                }, 1900); //will call the function after 2 secs.

        })
        .catch((error) => {

            Swal.fire({
                icon: "error", title: "Oops...", text: error.response.data.message,
                // footer: '<a href="">Why do I have this issue?</a>',
                timer: 5000
            });

        });

}

function FindQuery() {

let dataFindQuery = Qs.stringify({
'query': SearchKey
});

let configFindQuery = {
method: 'post',
url: '/api/search/userquery',
headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
},
data: dataFindQuery
};

axios.request(configFindQuery)
.then((response) => { 
    
    if(response.data.message !=='query avaliable'){
        window.location = `/admin/dashboard-data/${response.data.id}`;
        document
        .getElementById("Savequery")
        .innerHTML =`<div class="panel"><div class="mb-0"><div class="flex flex-col gap-4"><a href="/admin/dashboard-data/${response.data.id}" type="button" class="btn btn-success w-full">Ke Dashboard</a></div></div></div>`
    }else{
        document
        .getElementById("Savequery")
        .innerHTML =`<div class="panel"><div class="mb-0"><div class="flex flex-col gap-4"><button type="button" onclick="SaveTopic()" class="btn btn-success w-full">Simpan Query</button></div></div></div>`
    } 
})
.catch((error) => {

    document
        .getElementById("Savequery")
        .innerHTML =`<div class="panel"><div class="mb-0"><div class="flex flex-col gap-4"><button type="button" onclick="SaveTopic()" class="btn btn-success w-full">Simpan Query</button></div></div></div>`

});

}