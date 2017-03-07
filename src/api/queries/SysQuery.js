/**
 * Created by Hyl on 2017/3/1.
 */
export const QUERY_SYS_CONFIGS = `
            {
              sys_configs{
                key
                value
              }
             }
      `


export const MUTATION_SYS_CONFIGS = `
        ($cfgs: String){
            sys_configs: sys_updateConfigs(cfgs:$cfgs)
        }
`
