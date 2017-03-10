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
export const QUERY_RES_VERSION_INFO=`
        query versionInfo($id: Int){
              res{
                versionInfo(id: $id){                  
                  id
                  ver
                  status
                  gitVer
                  preId
                  updatedAt                  
                }
              }
            }
`

export const MUTATION_RES_VER_PACKAGING=`
        ($id: Int){
            res_packaging: res_verPackaging(id: $id){
                  id
                  ver
                  status
                  gitVer
                  preId
                  updatedAt   
            }
        }
`
export const MUTATION_RES_VER_ONLINE=`
        ($id: Int){
            res_online: res_verOnLine(id: $id)
        }
`
export const MUTATION_RES_VER_OFFLINE=`
        ($id: Int){
            res_offline: res_verOffLine(id: $id)
        }
`
export const MUTATION_RES_VER_REMOVE=`
        ($id: Int){
            res_remove: res_verRemove(id: $id)
        }
`

