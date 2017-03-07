/**
 * Created by hyl on 2016/12/15.
 */
import bookshelf from '../db'
import Config from '../models/Config'

export default bookshelf.Collection.extend({
  model: Config
})
