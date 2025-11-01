// 1. Data Struktur (Objek Javascript)
// Kunci (key) adalah nilai Benua, dan isinya adalah array Negara.
const dataLokasi = {
    asia: ["Jepang", "Indonesia", "Korea Selatan", "India"],
    eropa: ["Jerman", "Prancis", "Italia", "Spanyol"],
    amerika: ["Amerika Serikat", "Kanada", "Brasil", "Meksiko"]
};

// 2. Fungsi untuk menginisialisasi Dropdown Benua saat halaman dimuat
function inisialisasiBenua() {
    const selectBenua = document.getElementById('benua');

    // Tambahkan opsi default
    let defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "-- Pilih Benua --";
    selectBenua.appendChild(defaultOption);

    // Iterasi melalui dataLokasi dan tambahkan opsi benua
    for (const benuaKey in dataLokasi) {
        let option = document.createElement('option');
        // Gunakan key sebagai value (misalnya:"asia")
        option.value = benuaKey;
        // Ubah key menjadi teks yang lebih rapi (misalnya:"Asia")
        option.textContent = benuaKey.charAt(0).toUpperCase() + benuaKey.slice(1);
        selectBenua.appendChild(option);
    }
}

// 3. Fungsi utama yang dipanggil saat pilihan Benua diubah
function updateNegara() {
    const selectBenua = document.getElementById('benua');
    const selectNegara = document.getElementById('negara');
    const hasilElement = document.getElementById('hasil');

    // Dapatkan nilai (value) benua yang dipilih
    const benuaTerpilih = selectBenua.value;

    // --- A. Reset DropDown Negara ---
    // Cara cepat untuk menghapus smeua opsi lama:
    selectNegara.innerHTML = '';
    hasilElement.textContent = ''; // Reset hasil

    // --- B. Tambahkan Opsi Negara yang Sesuai ---
    if (benua) {
        // 1. Tambahkan opsi default "Pilih Negara"
        let defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "-- Pilih Negara --";
        selectNegara.appendChild(defaultOption);

        // 2. Ambil array negara berdasarkan benuaTerpilih
        const negaraArray = dataLokasi[benuaTerpilih];

        // 3. Iterasi array dan tambahkan opsi baru
        negaraArray.forEach(negara => {
            let option = document.createElement('option');
            option.value = negara.tolowerCase().replace(/\s/g, ''); //Contoh value: "jepang"
            option.textContent = negara; // Contoh teks: "Jepang"
            selectNegara.appendChild(option);
        });

        // 4. Tambahkan event listener ke dropdown negara setelah di isi
        selectNegara.onchange = tampilkanHasil;
    } else {
        // Jika tidak adak benua dipilih (opsi default), tambahkan opsi non-aktif
        let defaultOption = document.createElement('Option');
        defaultOption.value = "";
        defaultOption.textContent = "-- Pilih Benua Dahulu --";
        selectNegara.appendChild(defaultOption);
    }
}

// 4. Fungsi untuk menapilkan hasil akhir 
function tampilkanHasil() {
    const selectBenua = document.getElementById('benua');
    const selectNegara = document.getElementById('negara');
    const hasilElement = document.getElementById('hasil');

    const benuaTeks = selectBenua.option[selectBenua.selectIndex].textContent;
    const negaraTeks = selectNegara.option[selectNegara.selectIndex].textContent;

    if (selectNegara.value) {
        hasilElement.textContent = 'Anda memilih: ${negaraTeks}, yang terletak di benua ${benuaTeks}.';
        hasilElement.style.color = 'green';
    } else {
        hasilElement.textContent = 'Silakan lengkapi pilihan anda.';
        hasilElement.style.color = 'orange';
    }
}

// Panggil fungsi inisialisasi saat halamn=an selesai dimuat
document.addEventListener('DOMContentLoaded', inisialisasiBenua);