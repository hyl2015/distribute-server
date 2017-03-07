/**
 * Created by hyl on 2017/3/7.
 */
import Bookshelf from 'bookshelf'
import Knex from 'knex'


const knex = Knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'distribute_server',
    port: 3306
  },
  debug: 'knex:query'
})

const bookshelf = Bookshelf(knex)
bookshelf.plugin('registry')
bookshelf.plugin('bookshelf-camelcase')

export default  bookshelf
