// =============================
// FUNGSI PERHITUNGAN BIAYA KIRIM PAKET
// =============================

// Fungsi untuk menentukan biaya berat
function biayaBerat(berat) {
    if (berat <= 1) return 1500;
    else if (berat <= 5) return 2500;
    else if (berat <= 10) return 3500;
    else return 4500;
}

// Tabel biaya jarak antar kota
const biayaJarak = {
    "Banyuwangi": { "Banyuwangi": 5000, "Jember": 7500, "Probolinggo": 10000, "Surabaya": 15000 },
    "Jember": { "Banyuwangi": 7500, "Jember": 5000, "Probolinggo": 8500, "Surabaya": 12500 },
    "Probolinggo": { "Banyuwangi": 10000, "Jember": 8500, "Probolinggo": 5000, "Surabaya": 6500 },
    "Surabaya": { "Banyuwangi": 15000, "Jember": 12500, "Probolinggo": 6500, "Surabaya": 5000 }
};

// Fungsi utama untuk menghitung total biaya pengiriman
function hitungTotal() {
    const berat = parseFloat(document.getElementById("berat").value);
    const asal = document.getElementById("asal").value;
    const tujuan = document.getElementById("tujuan").value;

    // Validasi input
    if (!asal || !tujuan || isNaN(berat)) {
        document.getElementById("total").innerText = "Total Biaya Pengiriman : Rp -";
        return;
    }

    // Hitung total biaya
    const total = biayaBerat(berat) + biayaJarak[asal][tujuan];

    // Tampilkan hasil
    document.getElementById("total").innerText =
        "Total Biaya Pengiriman : Rp " + total.toLocaleString("id-ID");
}

// Tambahkan event listener agar otomatis menghitung
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("#berat, #asal, #tujuan").forEach(el => {
        el.addEventListener("change", hitungTotal);
    });
});
