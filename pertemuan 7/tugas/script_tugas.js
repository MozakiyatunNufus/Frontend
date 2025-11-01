const barang = {
    pc: [
        { nama: "PC IBM Core i7", harga: 5600000 },
        { nama: "Laptop Asus Core i5", harga: 4500000 },
        { nama: "Laptop Lenovo AMD Ryzen 5", harga: 9500000 }
    ],
    aksesoris: [
        { nama: "Flasdisk 32GB", harga: 50000 },
        { nama: "Hardisk 256GB", harga: 1250000 },
        { nama: "Speaker Aktif", harga: 255000 }
    ]
};

function tampilPopup(type) {
    if (type === 'barang') {
        const kategori = document.getElementById("kategori").value;
        if (!kategori) return alert("Pilih kategori terlebih dahulu!");
        const list = barang[kategori];
        const container = document.getElementById("daftarBarang");
        container.innerHTML = "";
        list.forEach((b, i) => {
            container.innerHTML += `<input type='radio' name='barang' value='${i}'> ${b.nama} - Rp ${b.harga.toLocaleString()}<br>`;
        });
        container.innerHTML += `<br><button class='btn btn-success' onclick="simpanBarang('${kategori}')">Simpan</button>`;
        document.getElementById("popupBarang").style.display = "block";
    } else {
        document.getElementById("popupPenjualan").style.display = "block";
    }
}

function tutupPopup(type) {
    document.getElementById(type === 'barang' ? "popupBarang" : "popupPenjualan").style.display = "none";
}

function simpanBarang(kategori) {
    const pilihan = document.querySelector("input[name='barang']:checked");
    if (!pilihan) return alert("Pilih salah satu barang!");
    const data = barang[kategori][pilihan.value];
    document.getElementById("namaBarang").value = data.nama;
    document.getElementById("hargaSatuan").value = data.harga;
    tutupPopup('barang');
}

function simpanJenis() {
    const jenis = document.querySelector("input[name='jenis']:checked");
    if (!jenis) return alert("Pilih jenis penjualan!");
    document.getElementById("jenisPenjualan").value = jenis.value;
    tutupPopup('penjualan');
}

function hitung() {
    const harga = parseFloat(document.getElementById("hargaSatuan").value) || 0;
    const jumlah = parseInt(document.getElementById("jumlah").value) || 0;
    const jenis = document.getElementById("jenisPenjualan").value;
    const kategori = document.getElementById("kategori").value;

    const totalPenjualan = harga * jumlah;
    let diskon = 0, pajak = 0;

    if (jenis === "Tunai") diskon = totalPenjualan * 0.10;
    pajak = totalPenjualan * (kategori === "pc" ? 0.15 : 0.10);

    const hargaTotal = totalPenjualan - diskon + pajak;

    document.getElementById("totalPenjualan").value = totalPenjualan;
    document.getElementById("diskon").value = diskon;
    document.getElementById("pajak").value = pajak;
    document.getElementById("hargaTotal").value = hargaTotal;
}
