/**
 * Created by Hyl on 2017/3/1.
 */
export const QUERY_RES_CREATE_INFO = `
            {
              res{
                createInfo{
                  branches{
                    name
                    id
                  }
                  resVers{
                    id
                    ver
                  }
                }
              }
            }
      `
export const MUTATION_RES_CREATE_VER=`
        ($preVer:Int,$verName:String,$notes:String,$gitBranch:String){
            res_createVer: res_createNewVer(preVer:$preVer,verName:$verName,notes:$notes,gitBranch:$gitBranch)
        }
`

export const QUERY_RES_VERSION_LIST=`
        query versionList($pageSize: Int,$page: Int){
              res{
                versionList(page: $page,pageSize: $pageSize){
                  total
                  listData{
                    id
                    ver
                    status
                    gitVer
                    updatedAt
                  }
                }
              }
            }
`
