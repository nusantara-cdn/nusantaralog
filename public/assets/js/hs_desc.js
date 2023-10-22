function asesmentRender(q) {

    q.forEach(async function (data) {

        document
            .getElementById("Uraian")
            .innerHTML += `
            <li class="mb-1">${data.label}</li>
            <li class="inline">
            <ul class="list-inside space-y-3 ltr:pl-5 rtl:pr-5">
                <li class="mb-1 mt-1">${data.value}</li>
            </ul>
        </li>
            `
    });
}


function GetFileHsDesc(d, a) {
    return d == '-' ? '-' : `<div class="mb-5"><a href="${d}" class="btn btn-primary btn-sm" target=_blank>Lihat Peraturan ${a}</a></div>`
}

function GetRegulationHsDesc(d) {
    return d == '' ? '-' : d
}

function CreateElementHsDesc(val, tax, regulation, file) {
    return `<li class="mb-1">${val} : ${tax}</li>
    <li class="inline">
    <ul class="list-inside space-y-3 ltr:pl-5 rtl:pr-5">
        <li class="mb-1 mt-1">Regulasi : ${GetRegulationHsDesc(regulation)}</li>
        <li class="mb-1 mt-1">File : ${GetFileHsDesc(file, val)}</li>
    </ul>
</li>`
}



function UraianTarif(data) {
    const
        bm = data.bm[0],
        ppn = data.ppn[0],
        ppnbm = data.ppnbm[0],
        cukai = data.cukai[0],
        ad = data.ad[0],
        tp = data.tp[0],
        im = data.im[0],
        pm = data.pm[0],
        pph = data.pph,
        ppnbk = data.ppnbk[0],
        sawit = data.tarif_dana_sawit[0]; 

    document
        .getElementById("UraianTarif")
        .innerHTML += `
    ${CreateElementHsDesc('BM MFN (Most Favored Nation)', bm.bm, bm.regulation, bm.file)}
    ${CreateElementHsDesc('PPN', ppn.ppn, ppn.regulation, ppn.file)}
    ${CreateElementHsDesc('PPnBM', ppnbm.ppnbm, ppnbm.regulation, ppnbm.file)}

    ${CreateElementHsDesc('CUKAI', cukai.cukai, cukai.regulation, cukai.file)}
    ${CreateElementHsDesc('BM AD', ad.ad, ad.regulation, ad.file)}
    ${CreateElementHsDesc('BM TP', tp.tp, tp.regulation, tp.file)}
    ${CreateElementHsDesc('PM', pm.im, pm.regulation, pm.file)}
    ${CreateElementHsDesc('BM IM', im.im, im.regulation, im.file)}
    ${pph[0] !== undefined ? pph.length == 1? CreateElementHsDesc('PPH', pph[0].pph, pph[0].regulation, pph[0].file):CreateElementHsDesc('PPH (API)', pph[0].pph, pph[0].regulation, pph[0].file)  + CreateElementHsDesc('PPH(NON-API)', pph[1].pph, pph[1].regulation, pph[1].file):''}
    
 
    ${CreateElementHsDesc('BK', ppnbk.ppnbk, ppnbk.regulation, ppnbk.file)}
    ${CreateElementHsDesc('Tarif Dana Sawit', sawit.sawit, sawit.regulation, sawit.file)}
    <li class="mb-1">Wajib Lapor DHE-SDA : ${data.flag_sda.flag_sda == 'Tidak' ? 'TIDAK' : 'YA. NO SKEP:' + data.flag_sda.no_skep}</li>
    <li class="mb-1">NOTE :  ${data.notes}</li>
    `

}

function CreateElementSatuanWajib(jenis,hs_code,no_skep,tgl_skep,file_path,kd_satuan,ur_satuan,tgl_berlaku){

    return `<li class="mb-1">${jenis}</li>
    <li class="inline">
    <ul class="list-inside space-y-3 ltr:pl-5 rtl:pr-5">
        <li class="mb-1 mt-1">Kode HS : ${hs_code}</li>
        <li class="mb-1 mt-1">Satuan : ${kd_satuan}(${ur_satuan})</li>
        <li class="mb-1 mt-1">No Skep : ${no_skep !== null?no_skep:'-'}</li>
        <li class="mb-1 mt-1">Tanggal Berlaku : ${tgl_berlaku}</li>
        <li class="mb-1 mt-1">Tanggal Skep : ${tgl_skep !== null?tgl_skep:'-'}</li>
        <li class="mb-1 mt-1">File : ${file_path !== null? GetFileHsDesc(file_path, jenis):'-'}</li>
    </ul>
</li>`

}

function SatuanWajib(data) {

    const
        I = data.impor[0], //Import
        E = data.ekspor[0]; //Export

        document
        .getElementById("SatuanWajib")
        .innerHTML += `
    ${I == undefined ? "":CreateElementSatuanWajib(I.jenis,I.hs_code,I.no_skep,I.tgl_skep,I.file_path,I.kd_satuan,I.ur_satuan,I.tgl_berlaku)}
    ${E == undefined ? "":CreateElementSatuanWajib(E.jenis,E.hs_code,E.no_skep,E.tgl_skep,E.fEle_path,E.kd_satuan,E.ur_satuan,E.tgl_berlaku)}
    `

}



function TarifPreferensi(q) {
    
    q.forEach(async function (data) {
 
        document
            .getElementById("TarifPreferensi")
            .innerHTML += `
            <li class="mb-1">${data.preference}</li>
            <li class="inline">
            <ul class="list-inside space-y-3 ltr:pl-5 rtl:pr-5">
                <li class="mb-1 mt-1">Regulasi : <a href="${data.file_path}">${data.no_skep}</a></li> 
                <li class="mb-1 mt-1">Berlaku mulai : ${data.berlaku}</li>
               ${data.years.map(d=>{
                    return `<li class="mb-1 mt-1">- Tahun : ${d.tahun}</li><li class="mb-1 mt-1"> Nilai : ${d.nilai}</li>`
                })}
                <li class="mb-1 mt-1">* Tarif tahun berikutnya sesuai PMK yang berlaku</li> 
            </ul>
        </li>
        <br>
            `
     });
}



function ImportRegulation(q) {
    
    q.forEach(async function (data) {
         document
            .getElementById("ImportRegulation")
            .innerHTML += `
            <li class="mb-1">Nama Izin : <a href="${data.id_dokumen == null ? '#': data.id_dokumen}">${data.name}</a></li>
            <li class="inline">
            <ul class="list-inside space-y-3 ltr:pl-5 rtl:pr-5">
                <li class="mb-1 mt-1">Kode Izin Kepabeanan : ${data.kd_ijin == null ? '-':data.kd_ijin}</li>
                <li class="mb-1 mt-1">Komoditi  : ${data.komoditi}</li>
                <li class="mb-1 mt-1">Regulasi  : ${data.legal}</li>
                <li class="mb-1 mt-1">Deskripsi : ${data.deskripsi}</li>
             </ul>
        </li>
        <br>
            `
     });
}



function Catatan(q) {
    
    q.forEach(async function (data) {
         document
            .getElementById("Catatan")
            .innerHTML += `
            <li class="mb-1">${data.bab_id}</li>
            <li class="inline">
            <ul class="list-inside space-y-3 ltr:pl-5 rtl:pr-5">
                <li class="mb-1 mt-1">Keterangan : ${data.desc_id}</li>
             </ul>
        </li>
        <br>
            `
     });
}

Catatan(GetData[0].catatan)
ImportRegulation(GetData[0].import_regulation)
TarifPreferensi(GetData[0].preferential_tariff_new)
SatuanWajib(GetData[0].refSatuan)
UraianTarif(GetData[0].new_mfn[0])
asesmentRender(GetData[0].uraian.id.content)