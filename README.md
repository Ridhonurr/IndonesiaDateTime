# 🇮🇩 Indonesia DateTime

[![npm version](https://img.shields.io/npm/v/indonesia-datetime)](https://www.npmjs.com/package/indonesia-datetime)
[![npm downloads](https://img.shields.io/npm/dm/indonesia-datetime)](https://www.npmjs.com/package/indonesia-datetime)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![GitHub](https://img.shields.io/github/stars/Ridhonurr/IndonesiaDateTime?style=social)](https://github.com/Ridhonurr/IndonesiaDateTime)

**Indonesia DateTime** adalah library Node.js ringan (zero dependencies) untuk mempermudah manipulasi tanggal dan waktu dengan **timezone Asia/Jakarta (UTC+7)**.

Dibangun di atas native `Date` object, library ini menyediakan API yang bersih dan intuitif untuk membuat, memformat, dan memanipulasi datetime tanpa perlu library berat seperti Moment.js atau Day.js.

---

## ✨ Fitur

- 🕐 **Timezone Asia/Jakarta (UTC+7)** — otomatis, tidak perlu konfigurasi
- ⚡ **Zero dependencies** — ringan dan cepat
- 📅 **Format tanggal kustom** — gunakan pola seperti `yyyy-MM-dd HH:mm:ss`
- ➕ **Aritmatika datetime** — tambah/kurang tahun, bulan, hari, jam, menit, detik
- 🔄 **Konversi format** — ISO 8601, SQL date, SQL datetime
- 🧩 **Parsing dari berbagai format** — ISO string, SQL string, format kustom
- 🪶 **Ringan** — hanya ~3 KB, tanpa dependensi eksternal

---

## 📦 Instalasi

```bash
npm install indonesia-datetime
```

Atau via yarn:

```bash
yarn add indonesia-datetime
```

---

## 🚀 Penggunaan Dasar

### ES Module

```javascript
import { IDT } from 'indonesia-datetime'
```

### CommonJS

```javascript
const { IDT } = require('indonesia-datetime')
```

---

## 📖 Dokumentasi API

### 📌 Membuat Instance IDT

#### `IDT.now()`
Membuat instance dengan waktu saat ini (Asia/Jakarta).

```javascript
const now = IDT.now()
```

#### `IDT.fromMillis(milliseconds)`
Membuat instance dari Unix timestamp (milidetik).

```javascript
const dt = IDT.fromMillis(1714234567000)
```

#### `IDT.fromISO(isoString)`
Membuat instance dari string ISO 8601.

```javascript
const dt = IDT.fromISO('2026-04-27T14:30:00+07:00')
const dt2 = IDT.fromISO('2026-04-27T07:30:00Z')
```

#### `IDT.fromSQLDate(dateString)`
Membuat instance dari string tanggal SQL (`YYYY-MM-DD`).

```javascript
const dt = IDT.fromSQLDate('2026-04-27')
// → 2026-04-27 00:00:00 WIB
```

#### `IDT.fromSQLDateTime(dateTimeString)`
Membuat instance dari string datetime SQL (`YYYY-MM-DD HH:mm:ss`).

```javascript
const dt = IDT.fromSQLDateTime('2026-04-27 14:30:00')
// → 2026-04-27 14:30:00 WIB
```

#### `IDT.fromFormat(str, format)`
Membuat instance dengan mem-parse string menggunakan format kustom.

```javascript
const dt = IDT.fromFormat('27-04-2026', 'dd-MM-yyyy')
const dt2 = IDT.fromFormat('2026/04/27 14:30', 'yyyy/MM/dd HH:mm')
```

**Token yang didukung:**
| Token | Contoh Output |
|-------|---------------|
| `yyyy` | 2026 |
| `MM` | 04 |
| `dd` | 27 |
| `HH` | 14 |
| `mm` | 30 |
| `ss` | 45 |

---

### 📌 Aritmatika Datetime

#### `.plus({ ... })`
Menambahkan durasi ke datetime.

```javascript
const dt = IDT.fromISO('2026-04-27T14:30:00+07:00')

dt.plus({ days: 7 })
// → 2026-05-04 14:30:00 WIB

dt.plus({ hours: 3, minutes: 30 })
// → 2026-04-27 18:00:00 WIB

dt.plus({ months: 2, years: 1 })
// → 2027-06-27 14:30:00 WIB
```

**Parameter yang didukung:**
| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `seconds` | number | Detik |
| `minutes` | number | Menit |
| `hours` | number | Jam |
| `days` | number | Hari |
| `weeks` | number | Minggu |
| `months` | number | Bulan |
| `years` | number | Tahun |

#### `.minus({ ... })`
Mengurangi durasi dari datetime.

```javascript
const dt = IDT.fromISO('2026-04-27T14:30:00+07:00')

dt.minus({ days: 7 })
// → 2026-04-20 14:30:00 WIB

dt.minus({ months: 1, days: 5 })
// → 2026-03-22 14:30:00 WIB
```

---

### 📌 Formatting

#### `.toFormat(format)`
Memformat datetime menggunakan pola kustom.

```javascript
const dt = IDT.now()

dt.toFormat('yyyy-MM-dd HH:mm:ss')
// → "2026-04-27 14:30:45"

dt.toFormat('dd/MM/yyyy')
// → "27/04/2026"

dt.toFormat('HH:mm')
// → "14:30"
```

**Token yang didukung:**
| Token | Output | Contoh |
|-------|--------|--------|
| `yyyy` | Tahun (4 digit) | 2026 |
| `MM` | Bulan (2 digit) | 04 |
| `M` | Bulan (tanpa padding) | 4 |
| `dd` | Tanggal (2 digit) | 27 |
| `d` | Tanggal (tanpa padding) | 27 |
| `HH` | Jam (2 digit, 00-23) | 14 |
| `H` | Jam (tanpa padding) | 14 |
| `mm` | Menit (2 digit) | 30 |
| `m` | Menit (tanpa padding) | 30 |
| `ss` | Detik (2 digit) | 45 |
| `s` | Detik (tanpa padding) | 45 |

#### `.toISO({ suppressMilliseconds })`
Mengonversi ke string ISO 8601 dengan timezone +07:00.

```javascript
const dt = IDT.now()

dt.toISO()
// → "2026-04-27T14:30:45+07:00"

dt.toISO({ suppressMilliseconds: false })
// → "2026-04-27T14:30:45.123+07:00"
```

#### `.toSQLDateTime()`
Mengonversi ke format datetime SQL (`YYYY-MM-DD HH:mm:ss`).

```javascript
const dt = IDT.now()

dt.toSQLDateTime()
// → "2026-04-27 14:30:45"
```

#### `.valueOf()`
Mengembalikan Unix timestamp dalam milidetik.

```javascript
const dt = IDT.now()
dt.valueOf()
// → 1714234567000

// Juga bisa digunakan untuk perbandingan:
dt > IDT.fromISO('2026-01-01T00:00:00+07:00')
// → true
```

---

## 📋 Contoh Lengkap

```javascript
import { IDT } from 'indonesia-datetime'

// Waktu saat ini di WIB
const sekarang = IDT.now()
console.log(sekarang.toFormat('yyyy-MM-dd HH:mm:ss'))
// → "2026-04-27 14:30:45"

// 7 hari ke depan
const mingguDepan = sekarang.plus({ days: 7 })
console.log(mingguDepan.toFormat('dd/MM/yyyy'))
// → "04/05/2026"

// Parse dari format kustom
const parsed = IDT.fromFormat('17-08-1945', 'dd-MM-yyyy')
console.log(parsed.toISO())
// → "1945-08-17T00:00:00+07:00"

// Konversi ke SQL datetime
console.log(sekarang.toSQLDateTime())
// → "2026-04-27 14:30:45"

// Aritmatika kompleks
const deadline = IDT.now()
    .plus({ months: 3, days: 14 })
    .minus({ hours: 2 })
console.log(deadline.toFormat('yyyy-MM-dd HH:mm'))
// → "2026-08-10 12:30"
```

---

## 🧪 Testing

```bash
npm test
```

---

## 🤝 Kontribusi

Kontribusi selalu diterima dengan senang hati! Silakan buka [issue](https://github.com/Ridhonurr/IndonesiaDateTime/issues) atau kirim pull request.

1. Fork repository
2. Buat branch fitur (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buka Pull Request

---

## 📄 Lisensi

ISC License — lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

---

## 👤 Author

**Ridho Laboratorium**

- GitHub: [@Ridhonurr](https://github.com/Ridhonurr)
- Repository: [https://github.com/Ridhonurr/IndonesiaDateTime](https://github.com/Ridhonurr/IndonesiaDateTime)

---

<p align="center">Dibuat dengan ❤️ untuk developer Indonesia 🇮🇩</p>
