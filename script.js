// Menjalankan script setelah seluruh halaman HTML selesai dimuat
$(document).ready(function () {

    // Variabel global untuk menyimpan data foto dalam format Base64
    let globalFotoData = "";
    

    // ==========================
    // PREVIEW FOTO
    // ==========================

    // Event ketika user memilih file foto
    $("#pas-foto").on("change", function () {

        // Mengambil file yang dipilih
        const file = this.files[0];

        // Menghapus pesan error sebelumnya
        $("#error-foto").text("");

        // Jika ada file yang dipilih
        if (file) {

            // Mengambil tipe file
            const fileType = file.type;

            // Mengambil ukuran file (dalam byte)
            const fileSize = file.size;

            // Daftar format file yang diperbolehkan
            const validTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png"
            ];

            // Mengecek apakah format file valid
            if ($.inArray(fileType, validTypes) === -1) {

                // Menampilkan pesan error
                $("#error-foto").text(
                    "Format file salah! Harus JPG/JPEG/PNG."
                );

                // Menghapus preview foto
                clearPreview();

                // Menghentikan proses
                return;
            }

            // Mengecek ukuran file maksimal 2 MB
            if (fileSize > 2 * 1024 * 1024) {

                // Menampilkan pesan error
                $("#error-foto").text(
                    "Ukuran maksimal 2 MB."
                );

                // Menghapus preview foto
                clearPreview();

                // Menghentikan proses
                return;
            }

            // Membuat objek FileReader untuk membaca file
            const reader = new FileReader();

            // Event saat file berhasil dibaca
            reader.onload = function (e) {

                // Menyimpan data gambar dalam format Base64
                globalFotoData = e.target.result;

                // Menampilkan preview gambar
                $("#photo-preview").html(
                    `<img src="${globalFotoData}"
                          style="width:100%;
                                 height:100%;
                                 object-fit:cover;">`

                );

                // Efek animasi jQuery slideDown
                $("#photo-preview").hide().slideDown(500);
            };

            // Membaca file sebagai Data URL (Base64)
            reader.readAsDataURL(file);
        }
    });

    // ==========================
    // FUNGSI MENGHAPUS PREVIEW
    // ==========================
    function clearPreview() {

        // Mengosongkan input file
        $("#pas-foto").val("");

        // Mengembalikan tampilan preview ke icon default
        $("#photo-preview").html(`
            <svg width="60" height="60" viewBox="0 0 24 24" fill="#b0b0b0">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
        `);

        // Menghapus data foto yang tersimpan
        globalFotoData = "";
    }

    // ==========================
    // VALIDASI FORM SAAT SUBMIT
    // ==========================
    $("#registration-form").on("submit", function (e) {

        // Status validasi awal
        let isValid = true;

        // Menghapus semua pesan error lama
        $(".error-message").text("");

        // Validasi NIM
        if ($("#nim").val().trim() === "") {
            $("#error-nim").text("NIM wajib diisi.");
            isValid = false;
        }

        // Validasi Nama
        if ($("#nama").val().trim() === "") {
            $("#error-nama").text("Nama wajib diisi.");
            isValid = false;
        }

        // Validasi Email
        if ($("#email").val().trim() === "") {
            $("#error-email").text("Email wajib diisi.");
            isValid = false;
        }

        // Validasi Nomor HP
        if ($("#hp").val().trim() === "") {
            $("#error-hp").text("Nomor HP wajib diisi.");
            isValid = false;
        }

        // Validasi Jenis Kelamin
        if (!$("input[name='gender']:checked").length) {
            $("#error-gender").text("Pilih jenis kelamin.");
            isValid = false;
        }

        // Validasi Program Studi
        if ($("#prodi").val() === "") {
            $("#error-prodi").text("Pilih program studi.");
            isValid = false;
        }

        // Validasi Alamat
        if ($("#alamat").val().trim() === "") {
            $("#error-alamat").text("Alamat wajib diisi.");
            isValid = false;
        }

        // Validasi Pas Foto
        if (globalFotoData === "") {
            $("#error-foto").text("Pas Foto wajib diunggah.");
            isValid = false;
        }

        // Jika ada data yang tidak valid
        if (!isValid) {

            // Mencegah form dikirim ke PHP
            e.preventDefault();
        }

        // Jika valid, form akan otomatis dikirim ke tampilan.php
    });

    // ==========================
    // TOMBOL RESET
    // ==========================
    $("#btn-reset").on("click", function () {

        // Mengosongkan seluruh input form
        $("#registration-form")[0].reset();

        // Menghapus semua pesan error
        $(".error-message").text("");

        // Menghapus preview foto dan data foto
        clearPreview();
    });

});