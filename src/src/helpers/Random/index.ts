// over 100500 size value may uncorect output length
export function RandomString(size: number = 10) {
        const gen = () => Math.random().toString(16).slice(2, 12)
        let ret = ""
        for (let s = (size > 10 ? 10 : size); size > 0; size -= s, s = size > 10 ? 10 : size) {
                ret += gen().slice(0, s)
        }
        return ret
}
