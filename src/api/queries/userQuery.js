/**
 * Created by Hyl on 2017/3/1.
 */
export const QUERY_USER_LOGIN = {
  queryStr: `
            {
              login{
                id
                nickName
                permission{
                  menus{
                    menuName
                    menuUrl
                    menuIcon
                  }
                }

              }
             }
      `
}
