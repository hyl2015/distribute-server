/**
 * Created by Hyl on 2017/3/1.
 */
export const QUERY_USER_LOGIN = `
            {
              base_isLogin
             }
      `
export const QUERY_USER_INFO = `
            {
              base_userInfo{
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
