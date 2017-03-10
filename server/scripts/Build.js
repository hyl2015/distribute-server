/**
 * Created by hyl on 2016/11/21.
 */
import shell from 'shelljs'
import * as assert from 'assert'
import diff_match_patch from './diff_match_patch_uncompressed'
import fs from 'fs'
import rd from 'rd'
import md5File from 'md5-file'
import archiver from 'archiver'
class Build {
  static PLATFORMS = {
    IOS: 'IOS',
    ANDROID: 'ANDROID'
  }
  static isRunning = false
  bundleFileName = `full.jsbundle`
  
  constructor({
    platform = Build.PLATFORMS.IOS,
    entryFile = null,
    inPath = null,
    outPath = null,
    version = 1,
    preVersion = null
  }) {
    assert.notEqual(inPath, null, '请配置项目目录')
    assert.notEqual(outPath, null, '请配置打包目录')
    this.platform = platform
    if (!entryFile) {
      if (this.platform == Build.PLATFORMS.IOS) {
        entryFile = 'index.ios.js'
      } else {
        entryFile = 'index.android.js'
      }
    }
    
    this.inPath = inPath
    this.outPath = outPath
    this.entryFile = entryFile
    this.version = version
    this.preVersion = preVersion
  }
  
  start() {
    
    /**
     * 根据version创建目录
     * 在version目录中创建full,patch目录
     * 在full目录中存放当前版本的文件(js.bundle,assets.zip）
     * 在patch目录中存放当前version到preVerion相差的资源
     */
    
    if (Build.isRunning) {
      throw new Error('已经有发布任务在执行，请稍后再试～')
    }
    
    const versionDir = `${this.outPath}/ver-${this.version}`
    
    if (shell.test('-e', versionDir)) {
      throw new Error('当前版本已经存在')
    }
    const outFullDir = `${versionDir}/full`
    const outPatchDir = `${versionDir}/patches`
    
    shell.mkdir(versionDir, outFullDir, outPatchDir)//创建目录
    
    const shellStr = `react-native bundle --entry-file ${this.entryFile} --bundle-output ${outFullDir}/${this.bundleFileName} --platform ${this.platform.toLowerCase()} --assets-dest ${outFullDir} --dev false`
    shell.cd(this.inPath)
    console.log(shellStr)
    shell.exec(shellStr)
    
    const preVersion = Number.parseInt(this.preVersion)
    
    if (!Number.isNaN(preVersion)) {
      //TODO 计算版本差异
      this._patch(preVersion)
    }
    
    
    // return shell.exec(shellStr, function (code, stdout, stderr) {
    //     console.log('Exit code:', code)
    //     console.log('Program output:', stdout)
    //     console.log('Program stderr:', stderr)
    // })
  }
  
  _patch(preVersion) {
    const preVersionDir = `${this.outPath}/ver-${preVersion}`
    const prePath = `${preVersionDir}/full/assets`
    const preFullPath = `${preVersionDir}/full`
    const fullPath = `${this.outPath}/ver-${this.version}/full`
    const patchPath = `${this.outPath}/ver-${this.version}/patches/patch-${this.preVersion}-${this.version}`
    const currPath = `${fullPath}/assets`
    const tmpPath = `${fullPath}/tmp`
    const patchFileName = `${patchPath}/patch-${Date.now()}.zip`
    //清空tmp目录
    if (fs.existsSync(tmpPath)) {
      shell.rm('-rf', tmpPath)
    }
    //清空patch目录
    if (fs.existsSync(patchPath)) {
      shell.rm('-rf', patchPath)
    }
    
    fs.mkdirSync(patchPath)
    fs.mkdirSync(tmpPath)
    
    const tmpAssetsPath = `${tmpPath}/assets`
    
    shell.cp('-R', currPath, tmpAssetsPath)
    
    
    const dmp = new diff_match_patch()
    
    const text1 = fs.readFileSync(`${preFullPath}/${this.bundleFileName}`, 'utf-8')
    const text2 = fs.readFileSync(`${fullPath}/${this.bundleFileName}`, 'utf-8')
    const filePatches = dmp.patch_make(text1, text2)
    const patchesStr = dmp.patch_toText(filePatches)
    // console.log(str2)
    // const ret = dmp.patch_apply(dmp.patch_fromText(str2), text1)
    // console.log(ret)
    
    const diffFiles = []
    
    
    rd.eachSync(tmpAssetsPath, function (f, s) {
      // 每找到一个文件都会调用一次此函数
      // 参数s是通过 fs.stat() 获取到的文件属性值
      if (s.isFile()) {
        const fName = f.substr(tmpAssetsPath.length + 1)
        
        const fileName = f.substr(f.lastIndexOf('/') + 1)
        
        if (fileName.startsWith('.')) {
          return
        }
        const preFileName = `${prePath}/${fName}`
        if (fs.existsSync(preFileName)) {
          //TODO 计算文件md5
          const fileMd5 = md5File.sync(f)
          const preFileMd5 = md5File.sync(preFileName)
          if (fileMd5 !== preFileMd5) {
            diffFiles.push(f)
          } else {
            shell.rm('-rf', f)
          }
        } else {
          diffFiles.push(f)
        }
      }
    })
    
    
    // console.dir(diffFiles)
    const output = fs.createWriteStream(patchFileName)
    const archive = archiver('zip', {
      store: true // Sets the compression method to STORE.
    })
    archive.pipe(output)
    archive.append(patchesStr.replace(/\n/mg, '\\n'), {name: 'patch.jsbundle'})
    archive.directory(tmpAssetsPath, tmpAssetsPath.substr(tmpPath.length + 1))
    archive.finalize()
    
  }
  
}


export default Build
