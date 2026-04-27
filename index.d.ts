/** Options for arithmetic operations (plus/minus) */
export interface DurationInput {
    seconds?: number
    minutes?: number
    hours?: number
    days?: number
    weeks?: number
    months?: number
    years?: number
}

/** Options for toISO method */
export interface ISOOptions {
    /** Whether to suppress milliseconds in output (default: true) */
    suppressMilliseconds?: boolean
}

/**
 * Indonesia DateTime (IDT) - Library untuk manipulasi datetime dengan timezone Asia/Jakarta (UTC+7).
 *
 * @example
 * ```typescript
 * import { IDT } from 'indonesia-datetime'
 *
 * const now = IDT.now()
 * console.log(now.toFormat('yyyy-MM-dd HH:mm:ss'))
 * ```
 */
export class IDT {
    /** Unix timestamp dalam milidetik */
    readonly ts: number

    /**
     * @param ts - Unix timestamp dalam milidetik
     */
    constructor(ts: number)

    /**
     * Membuat instance dengan waktu saat ini (Asia/Jakarta).
     */
    static now(): IDT

    /**
     * Membuat instance dari Unix timestamp (milidetik).
     *
     * @param ms - Unix timestamp dalam milidetik
     */
    static fromMillis(ms: number): IDT

    /**
     * Membuat instance dari string ISO 8601.
     *
     * @param iso - String ISO 8601 (contoh: "2026-04-27T14:30:00+07:00")
     * @throws Error jika format ISO tidak valid
     */
    static fromISO(iso: string): IDT

    /**
     * Membuat instance dari string tanggal SQL (YYYY-MM-DD).
     *
     * @param date - String tanggal SQL (contoh: "2026-04-27")
     * @throws Error jika format tanggal tidak valid
     */
    static fromSQLDate(date: string): IDT

    /**
     * Membuat instance dari string datetime SQL (YYYY-MM-DD HH:mm:ss).
     *
     * @param str - String datetime SQL (contoh: "2026-04-27 14:30:00")
     * @throws Error jika format datetime tidak valid
     */
    static fromSQLDateTime(str: string): IDT

    /**
     * Membuat instance dengan mem-parse string menggunakan format kustom.
     * Token yang didukung: yyyy, MM, dd, HH, mm, ss
     *
     * @param str - String yang akan di-parse
     * @param format - Format yang digunakan (contoh: "dd-MM-yyyy")
     * @throws Error jika format tidak cocok
     *
     * @example
     * ```typescript
     * const dt = IDT.fromFormat('27-04-2026', 'dd-MM-yyyy')
     * ```
     */
    static fromFormat(str: string, format: string): IDT

    /**
     * Menambahkan durasi ke datetime.
     *
     * @param obj - Durasi yang akan ditambahkan
     *
     * @example
     * ```typescript
     * IDT.now().plus({ days: 7, hours: 3 })
     * ```
     */
    plus(obj?: DurationInput): IDT

    /**
     * Mengurangi durasi dari datetime.
     *
     * @param obj - Durasi yang akan dikurangi
     *
     * @example
     * ```typescript
     * IDT.now().minus({ days: 7 })
     * ```
     */
    minus(obj?: DurationInput): IDT

    /**
     * Mengembalikan Unix timestamp dalam milidetik.
     * Berguna untuk perbandingan (>, <, ===).
     */
    valueOf(): number

    /**
     * Memformat datetime menggunakan pola kustom.
     *
     * Token yang didukung:
     * - yyyy: Tahun (4 digit)
     * - MM: Bulan (2 digit)
     * - M: Bulan (tanpa padding)
     * - dd: Tanggal (2 digit)
     * - d: Tanggal (tanpa padding)
     * - HH: Jam (2 digit, 00-23)
     * - H: Jam (tanpa padding)
     * - mm: Menit (2 digit)
     * - m: Menit (tanpa padding)
     * - ss: Detik (2 digit)
     * - s: Detik (tanpa padding)
     *
     * @param format - Pola format (contoh: "yyyy-MM-dd HH:mm:ss")
     *
     * @example
     * ```typescript
     * IDT.now().toFormat('dd/MM/yyyy')
     * // → "27/04/2026"
     * ```
     */
    toFormat(format: string): string

    /**
     * Mengonversi ke string ISO 8601 dengan timezone +07:00.
     *
     * @param options - Opsi konversi
     *
     * @example
     * ```typescript
     * IDT.now().toISO()
     * // → "2026-04-27T14:30:45+07:00"
     * ```
     */
    toISO(options?: ISOOptions): string

    /**
     * Mengonversi ke format datetime SQL (YYYY-MM-DD HH:mm:ss).
     *
     * @example
     * ```typescript
     * IDT.now().toSQLDateTime()
     * // → "2026-04-27 14:30:45"
     * ```
     */
    toSQLDateTime(): string
}
