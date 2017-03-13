/**
 * Created by hyl on 2017/3/13.
 */
import Build from '../server/src/scripts/Build'
import {PLATFORMS} from '../server/src/common/constants'

function test() {
  
  const build = new Build({
    inPath: '/Users/linlin.huang/Documents/workspace/rn/lifeline',
    outPath: '/tmp/res',
    version: 2,
    preVersion: 1
  })
  
  // build.start(PLATFORMS.IOS)
  // build.start(PLATFORMS.ANDROID).then(() => {
  //   process.exit()
  // }).catch(()=>{
  //   process.exit()
  // })
  
  const obj = build.getUpdateInfo(PLATFORMS.IOS, 1, [2])
  console.log(obj)
  
}

test()
