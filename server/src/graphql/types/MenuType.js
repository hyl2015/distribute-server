/**
 * Created by hyl on 2017/2/27.
 */


export default {
  name: 'Menu',
  typeStr: `
  type Menu {
    id: Int!
    menuName: String
    menuUrl: String
    menuIcon: String
    parentId: Int
  }`,
  resolvers: {}
}
