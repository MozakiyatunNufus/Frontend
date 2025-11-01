const biayaJarak = {
    "Banyuwangi": { "Banyuwangi": 5000, "Jember": 7500, "Probolinggo": 10000, "Surabaya": 15000 },
    "Jember": { "Banyuwangi": 7500, "Jember": 5000, "Probolinggo": 8500, "Surabaya": 12500 },
    "Probolinggo": { "Banyuwangi": 10000, "Jember": 8500, "Probolinggo": 5000, "Surabaya": 6500 },
    "Surabaya": { "Banyuwangi": 15000, "Jember": 12500, "Probolinggo": 6500, "Surabaya": 5000 }
};

function hitungBiayaBerat(berat) {
    if (berat <= 1) return 1500;
    if (berat <= 5) return 2500;
    if (berat <= 10) return 3500;
    return 4500;
}

function hitungTotal() {
    const asal = document.getElementById("asal").value;
    const tujuan = document.getElementById("tujuan").value;
    const berat = parseFloat(document.getElementById("berat").value);
    const biayaInput = document.getElementById("biaya");

    if (asal && tujuan && berat > 0) {
        const jarak = biayaJarak[asal][tujuan];
        const beratBiaya = hitungBiayaBerat(berat);
        const total = jarak + beratBiaya;
        biayaInput.value = total.toLocaleString("id-ID");
    } else {
        biayaInput.value = "";
    }
}

document.getElementById("tujuan").addEventListener("change", hitungTotal);
document.getElementById("berat").addEventListener("input", hitungTotal);
document.getElementById("asal").addEventListener("change", hitungTotal);
