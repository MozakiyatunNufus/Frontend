// Data barang yang tersedia
const dataBarang = {
    pc: [
        { nama: 'PC IBM Core i7', harga: 5600000, pajak: 0.15 },
        { nama: 'Laptop ASUS ROG', harga: 12000000, pajak: 0.15 },
        { nama: 'PC HP Pavilion', harga: 7500000, pajak: 0.15 }
    ],
    aksesoris: [
        { nama: 'Mouse Logitech', harga: 250000, pajak: 0.10 },
        { nama: 'Keyboard Mechanical', harga: 850000, pajak: 0.10 },
        { nama: 'Webcam HD', harga: 450000, pajak: 0.10 }
    ]
};

// Variable untuk menyimpan barang yang dipilih
let barangTerpilih = null;

// Fungsi untuk membuka popup pilih barang
function openKategoriPopup() {
    const kategori = document.getElementById('kategori').value;
    if (!kategori) {
        alert('Pilih kategori terlebih dahulu!');
        return;
    }

    const listKategori = document.getElementById('listKategori');
    listKategori.innerHTML = '';

    dataBarang[kategori].forEach((barang, index) => {
        const div = document.createElement('div');
        div.textContent = barang.nama + ' - Rp. ' + barang.harga.toLocaleString();
        div.onclick = () => pilihBarang(kategori, index);
        listKategori.appendChild(div);
    });

    document.getElementById('popupKategori').style.display = 'flex';
}

// Fungsi untuk memilih barang
function pilihBarang(kategori, index) {
    barangTerpilih = dataBarang[kategori][index];
    document.getElementById('namaBarang').value = barangTerpilih.nama;
    document.getElementById('harga').value = barangTerpilih.harga;
    closePopup('popupKategori');
    hitungTotal();
}

// Fungsi untuk membuka popup jenis penjualan
function openJenisPopup() {
    document.getElementById('popupJenis').style.display = 'flex';
}

// Fungsi untuk menyimpan jenis penjualan
function simpanJenis() {
    const jenis = document.querySelector('input[name="jenis"]:checked');
    if (jenis) {
        document.getElementById('jenisPenjualan').value = jenis.value;
        closePopup('popupJenis');
        hitungTotal();
    } else {
        alert('Pilih jenis penjualan!');
    }
}

// Fungsi untuk menutup popup
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Fungsi untuk menghitung total penjualan
function hitungTotal() {
    const jumlah = parseInt(document.getElementById('jumlah').value) || 0;
    const jenis = document.getElementById('jenisPenjualan').value;

    if (!barangTerpilih || jumlah === 0) return;

    const totalPenjualan = barangTerpilih.harga * jumlah;
    const diskon = jenis === 'tunai' ? totalPenjualan * 0.10 : 0;
    const pajak = totalPenjualan * barangTerpilih.pajak;
    const totalAkhir = totalPenjualan - diskon + pajak;

    document.getElementById('total').textContent = totalPenjualan.toLocaleString();
    document.getElementById('diskon').textContent = diskon.toLocaleString();
    document.getElementById('pajak').textContent = pajak.toLocaleString();
    document.getElementById('totalAkhir').textContent = totalAkhir.toLocaleString();
}

// Event listener untuk input jumlah
document.getElementById('jumlah').addEventListener('input', hitungTotal);

// Event listener untuk perubahan kategori
document.getElementById('kategori').addEventListener('change', function () {
    document.getElementById('namaBarang').value = '';
    document.getElementById('harga').value = '';
    barangTerpilih = null;
    hitungTotal();
});