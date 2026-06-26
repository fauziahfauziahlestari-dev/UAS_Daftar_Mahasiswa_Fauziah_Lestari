<?php

if($_SERVER["REQUEST_METHOD"]=="POST")
{
    $nim     = $_POST['nim'];
    $nama    = $_POST['nama'];
    $email   = $_POST['email'];
    $hp      = $_POST['hp'];
    $gender  = $_POST['gender'];
    $prodi   = $_POST['prodi'];
    $alamat  = $_POST['alamat'];

    // Folder upload
    $folder = "upload/";

    if(!is_dir($folder))
    {
        mkdir($folder, 0777, true);
    }

    // Data foto
    $namaFile = $_FILES['pas_foto']['name'];
    $tmpFile  = $_FILES['pas_foto']['tmp_name'];
    $ukuran   = $_FILES['pas_foto']['size'];

    $ext = strtolower(pathinfo($namaFile, PATHINFO_EXTENSION));

    $extValid = array("jpg","jpeg","png");

    if(!in_array($ext, $extValid))
    {
        die("Format file harus JPG, JPEG, atau PNG");
    }

    if($ukuran > 2*1024*1024)
    {
        die("Ukuran foto maksimal 2 MB");
    }

    // Nama file unik
    $namaBaru = time()."_".$namaFile;

    $tujuan = $folder.$namaBaru;

    if(move_uploaded_file($tmpFile, $tujuan))
    {
?>

<!DOCTYPE html>

<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kartu Ringkasan Mahasiswa</title>

<style>

body{
    background:#d8dde5;
    font-family:Arial, sans-serif;
    padding:20px;
}

.card{
    max-width:900px;
    margin:auto;
    background:#4f5f75;
    border-radius:18px;
    padding:25px;
    color:white;
    box-shadow:0 5px 15px rgba(0,0,0,0.2);
}

.card h2{
    margin-bottom:25px;
    text-transform:uppercase;
    font-size:20px;
}

.card-content{
    display:flex;
    gap:20px;
}

.card-photo img{
    width:130px;
    height:150px;
    object-fit:cover;
    border-radius:8px;
    border:3px solid white;
}

.card-details{
    flex:1;
}

.card-details p{
    margin:0;
    padding:10px 0;
    border-bottom:1px solid rgba(255,255,255,0.15);
}

.card-details strong{
    color:white;
}

hr{
    margin:25px 0 20px;
    border:none;
    border-top:1px solid rgba(255,255,255,0.15);
}

.btn-edit{
    width:100%;
    padding:14px;
    border:none;
    border-radius:8px;
    background:#f4a20b;
    color:#1f1f1f;
    font-weight:bold;
    font-size:16px;
    cursor:pointer;
}

.btn-edit:hover{
    background:#dc920a;
}

</style>

</head>
<body>

<div class="card">

<h2>Kartu Ringkasan Mahasiswa</h2>

<div class="card-content">

    <div class="card-photo">
        <img src="<?php echo $tujuan; ?>" alt="Foto Mahasiswa">
    </div>

    <div class="card-details">
        <p><strong>NIM:</strong> <?php echo $nim; ?></p>
        <p><strong>Nama Lengkap:</strong> <?php echo $nama; ?></p>
        <p><strong>Email:</strong> <?php echo $email; ?></p>
        <p><strong>Nomor HP:</strong> <?php echo $hp; ?></p>
        <p><strong>Jenis Kelamin:</strong> <?php echo $gender; ?></p>
        <p><strong>Program Studi:</strong> <?php echo $prodi; ?></p>
        <p><strong>Alamat:</strong> <?php echo $alamat; ?></p>
    </div>

</div>

<hr>

<button class="btn-edit"
        onclick="window.location.href='index.html'">
    Edit Data
</button>


</div>

</body>
</html>
<?php
}
else
{
    echo "Upload foto gagal.";
}
}
?>