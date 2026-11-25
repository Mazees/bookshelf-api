# Bookshelf API

REST API sederhana untuk mengelola data buku menggunakan Node.js dan Express.

## Teknologi

- Node.js
- Express
- Nano ID
- In-memory storage menggunakan array JavaScript

Data akan hilang ketika server dihentikan atau direstart.

## Persyaratan

- Node.js LTS terbaru
- npm

## Instalasi

```bash
npm install
```

## Menjalankan Server

Mode production:

```bash
npm start
```

Mode development:

```bash
npm run start-dev
```

Server berjalan pada:

```text
http://localhost:9000
```

## Endpoint

### Menambahkan Buku

```http
POST /books
```

Request body:

```json
{
  "name": "Buku A",
  "year": 2010,
  "author": "John Doe",
  "summary": "Ringkasan buku",
  "publisher": "Dicoding Indonesia",
  "pageCount": 100,
  "readPage": 25,
  "reading": false
}
```

Response berhasil:

```json
{
  "status": "success",
  "message": "Buku berhasil ditambahkan",
  "data": {
    "bookId": "generated-book-id"
  }
}
```

### Mendapatkan Semua Buku

```http
GET /books
```

Response:

```json
{
  "status": "success",
  "data": {
    "books": [
      {
        "id": "generated-book-id",
        "name": "Buku A",
        "publisher": "Dicoding Indonesia"
      }
    ]
  }
}
```

### Filter Buku Berdasarkan Nama

```http
GET /books?name=buku
```

Pencarian nama tidak membedakan huruf besar dan kecil.

### Filter Berdasarkan Status Membaca

Buku yang sedang dibaca:

```http
GET /books?reading=1
```

Buku yang tidak sedang dibaca:

```http
GET /books?reading=0
```

### Filter Berdasarkan Status Selesai

Buku yang sudah selesai dibaca:

```http
GET /books?finished=1
```

Buku yang belum selesai dibaca:

```http
GET /books?finished=0
```

Filter dapat digabungkan:

```http
GET /books?name=buku&reading=1&finished=0
```

### Mendapatkan Buku Berdasarkan ID

```http
GET /books/{bookId}
```

Contoh:

```http
GET /books/generated-book-id
```

### Memperbarui Buku

```http
PUT /books/{bookId}
```

Request body:

```json
{
  "name": "Buku A Revisi",
  "year": 2011,
  "author": "Jane Doe",
  "summary": "Ringkasan terbaru",
  "publisher": "Dicoding Indonesia",
  "pageCount": 200,
  "readPage": 26,
  "reading": false
}
```

Nilai `finished` dihitung otomatis berdasarkan kondisi:

```js
finished = readPage === pageCount
```

### Menghapus Buku

```http
DELETE /books/{bookId}
```

Response berhasil:

```json
{
  "status": "success",
  "message": "Buku berhasil dihapus"
}
```

## Validasi

Penambahan dan pembaruan buku akan gagal jika:

- `name` kosong.
- `readPage` lebih besar daripada `pageCount`.
- ID buku tidak ditemukan saat mengambil, memperbarui, atau menghapus buku.

Contoh response gagal:

```json
{
  "status": "fail",
  "message": "Gagal menambahkan buku. Mohon isi nama buku"
}
```

## Struktur Proyek

```text
.
├── src/
│   ├── server.js       # entry point server
│   ├── exceptions/     # menyimpan class custom error
│   ├── middlewares/    # custom middlewares
│   ├── routes/         # kumpulan route
│   │   └── index.js
│   ├── server/
│   │   └── index.js    # konfigurasi utama Express
│   ├── services/       # logika bisnis / controller
│   │   ├── books.js
│   │   └── controller.js
│   └── utils/          # helper untuk format response
├── package.json
├── package-lock.json
└── README.md
```

## Catatan

- API menggunakan port `9000`.
- Data disimpan sementara di memory.
- Data akan terhapus setelah server restart.
- Script `start` menggunakan Node.js langsung dan tidak menggunakan `nodemon`.

## Lisensi

ISC
