/**
 * Created by hyl on 2017/3/13.
 */
export default {
  _cache: {},
  get(key, defaultValue) {
    return this._cache[key] || defaultValue
  },
  set(key, value) {
    console.info(`set sys cache ${key}`)
    return this._cache[key] = value
  }
}
