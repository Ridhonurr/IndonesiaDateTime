const OFFSET = 7 * 3600000

export class IDT {

    constructor(ts) {
        this.ts = ts
    }

    static now() {
        return new IDT(Date.now())
    }

    static fromMillis(ms) {
        return new IDT(ms)
    }

    static fromISO(iso) {
        return new IDT(Date.parse(iso))
    }

    plus({
        seconds = 0,
        minutes = 0,
        hours = 0,
        days = 0,
        weeks = 0,
        months = 0,
        years = 0
    } = {}) {

        let ts = this.ts

        ts += seconds * 1000
        ts += minutes * 60000
        ts += hours * 3600000
        ts += days * 86400000
        ts += weeks * 604800000

        if (months || years) {

            const d = new Date(ts + OFFSET)

            d.setUTCFullYear(
                d.getUTCFullYear() + years
            )

            d.setUTCMonth(
                d.getUTCMonth() + months
            )

            ts = d.getTime() - OFFSET
        }

        return new IDT(ts)
    }

    minus(obj = {}) {

        const neg = {}

        for (const k in obj) {
            neg[k] = -obj[k]
        }

        return this.plus(neg)
    }

    valueOf() {
        return this.ts
    }

    toFormat(format) {

        const d = new Date(this.ts + OFFSET)

        const pad = n => String(n).padStart(2, '0')

        const map = {

            yyyy: d.getUTCFullYear(),

            MM: pad(d.getUTCMonth() + 1),
            M: d.getUTCMonth() + 1,

            dd: pad(d.getUTCDate()),
            d: d.getUTCDate(),

            HH: pad(d.getUTCHours()),
            H: d.getUTCHours(),

            mm: pad(d.getUTCMinutes()),
            m: d.getUTCMinutes(),

            ss: pad(d.getUTCSeconds()),
            s: d.getUTCSeconds()
        }

        return format.replace(
            /yyyy|MM|dd|HH|mm|ss|M|d|H|m|s/g,
            t => map[t]
        )
    }

    toISO({ suppressMilliseconds = true } = {}) {

        const d = new Date(this.ts + OFFSET)

        const pad = n => String(n).padStart(2, '0')

        const Y = d.getUTCFullYear()
        const M = pad(d.getUTCMonth() + 1)
        const D = pad(d.getUTCDate())

        const H = pad(d.getUTCHours())
        const i = pad(d.getUTCMinutes())
        const s = pad(d.getUTCSeconds())

        let iso = `${Y}-${M}-${D}T${H}:${i}:${s}`

        if (!suppressMilliseconds) {
            iso += `.${d.getUTCMilliseconds()}`
        }

        return iso + "+07:00"
    }

    toSQLDateTime() {

        const d = new Date(this.ts + OFFSET)

        const pad = n => String(n).padStart(2, '0')

        return (
            d.getUTCFullYear() + "-" +
            pad(d.getUTCMonth() + 1) + "-" +
            pad(d.getUTCDate()) + " " +
            pad(d.getUTCHours()) + ":" +
            pad(d.getUTCMinutes()) + ":" +
            pad(d.getUTCSeconds())
        )
    }

    static fromISO(iso) {

        if (typeof iso !== "string") {
            throw new Error("Invalid ISO input")
        }

        const ts = Date.parse(iso)

        if (Number.isNaN(ts)) {
            throw new Error("Invalid ISO format")
        }

        return new IDT(ts)
    }

    static fromSQLDate(date) {

        const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)

        if (!m) {
            throw new Error("Invalid SQL date format")
        }

        const [_, y, mth, d] = m

        const ts = Date.UTC(
            Number(y),
            Number(mth) - 1,
            Number(d)
        )

        return new IDT(ts)
    }

    static fromSQLDateTime(str) {

        const r =
            /^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/

        const m = r.exec(str)

        if (!m) {
            throw new Error("Invalid SQL datetime format")
        }

        const [_, y, mo, d, h, i, s] = m

        const ts = Date.UTC(
            y,
            mo - 1,
            d,
            h,
            i,
            s
        )

        return new IDT(ts - (7 * 3600000))
    }

    static compileFormat(format) {

        const map = {
            yyyy: "(\\d{4})",
            MM: "(\\d{2})",
            dd: "(\\d{2})",
            HH: "(\\d{2})",
            mm: "(\\d{2})",
            ss: "(\\d{2})"
        }

        let regex = format

        for (const k in map) {
            regex = regex.replace(k, map[k])
        }

        return new RegExp("^" + regex + "$")
    }
    static fromFormat(str, format) {

        const r = this.compileFormat(format)

        const m = r.exec(str)

        if (!m) {
            throw new Error("Format mismatch")
        }

        const map = {}

        const tokens = format.match(/yyyy|MM|dd|HH|mm|ss/g)

        tokens.forEach((t, i) => {
            map[t] = Number(m[i + 1])
        })

        const ts = Date.UTC(
            map.yyyy || 1970,
            (map.MM || 1) - 1,
            map.dd || 1,
            map.HH || 0,
            map.mm || 0,
            map.ss || 0
        )

        return new IDT(ts - (7 * 3600000))
    }
}