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
import {PLATFORMS} from '../common/constants'
import jsonfile from 'jsonfile'
import {getResMaxPatchVersion} from '../common/utils'
class Build {
  static isRunning = false
  bundleFileName = `full.jsbundle`
  bundleMetaFileName = `full.jsbundle.meta`
  
  constructor({
    inPath = null,
    outPath = null,
    version = 1,
    preVersion = null
  }) {
    assert.notEqual(inPath, null, '请配置项目目录')
    assert.notEqual(outPath, null, '请配置打包目录')
    this.inPath = inPath
    this.outPath = outPath
    this.version = version
    this.preVersion = preVersion
  }
  
  start(platform = PLATFORMS.IOS, entryFile = null) {
    
    /**
     * 根据version创建目录
     * 在version目录中创建full,patch目录
     * 在full目录中存放当前版本的文件(js.bundle,assets.zip）
     * 在patch目录中存放当前version到preVerion相差的资源
     */
    
    this.platform = platform
    this.platformName = 'ios'
    if (!entryFile) {
      if (this.platform == PLATFORMS.IOS) {
        entryFile = 'index.ios.js'
      } else {
        entryFile = 'index.android.js'
        this.platformName = 'android'
      }
    }
    
    
    this.entryFile = entryFile
    
    if (Build.isRunning) {
      throw new Error('已经有发布任务在执行，请稍后再试～')
    }
    
    const versionDir = `${this.outPath}/ver-${this.version}`
    const outFullDir = `${versionDir}/full/${this.platformName}`
    const jsonFilePath = `${versionDir}/full/files-${this.platformName}.json`
    const fullZipPath = `${versionDir}/full/${this.platformName}.zip`
    const outPatchDir = `${versionDir}/patches/${this.platformName}`
    console.log(`outFullDir  ${outFullDir}`)
    console.log(`outPatchDir  ${outPatchDir}`)
    
    if (shell.test('-e', outFullDir)) {
      throw new Error('当前版本已经存在')
    }
    
    shell.mkdir('-p', versionDir, outFullDir, outPatchDir)//创建目录
    
    const shellStr = `react-native bundle --entry-file ${this.entryFile} --bundle-output ${outFullDir}/${this.bundleFileName} --platform ${this.platformName} --assets-dest ${outFullDir} --dev false`
    shell.cd(this.inPath)
    shell.exec('watchman watch-del-all') //清理watchman
    console.log(shellStr)
    if (shell.exec(shellStr).code !== 0) {
      throw new Error('rn打包失败！')
    }
    
    
    this._writeMd5ToFile(outFullDir, jsonFilePath) //写入版本信息
    
    
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(fullZipPath)
      const archive = archiver('zip', {
        store: true
      })
      archive.pipe(output)
      archive.on('error', (e) => {
        console.error(e)
        reject()
      })
      output.on('close', () => {
        const preVersion = Number.parseInt(this.preVersion)
        
        if (!Number.isNaN(preVersion) && preVersion !== 0) {
          //TODO 计算版本差异
          this._patch(preVersion).then(resolve)
        } else {
          console.log(`${this.platformName} 打包完毕============`)
          return Promise.resolve()
        }
      })
      archive.directory(outFullDir, '')
      archive.finalize()
    })
  }
  
  _patch(preVersion) {
    const preVersionDir = `${this.outPath}/ver-${preVersion}`
    let prePath = `${preVersionDir}/full/${this.platformName}`
    const preFullPath = `${preVersionDir}/full/${this.platformName}`
    const fullPath = `${this.outPath}/ver-${this.version}/full/${this.platformName}`
    const patchesPath = `${this.outPath}/ver-${this.version}/patches/${this.platformName}`
    const patchesJsonFilePath = `${this.outPath}/ver-${this.version}/patches/patch-${this.preVersion}-${this.version}-${this.platformName}.json`
    const patchPath = `${patchesPath}/patch-${this.preVersion}-${this.version}`
    let currPath = `${fullPath}`
    const tmpPath = `${this.outPath}/ver-${this.version}/full/tmp`
    const patchFileName = `${patchPath}/patch-${Date.now()}.zip`
    
    console.log('---计算版本差异---')
    //清空tmp目录
    if (shell.test('-e', tmpPath)) {
      shell.rm('-rf', tmpPath)
    }
    //清空patch目录
    if (shell.test('-e', patchPath)) {
      shell.rm('-rf', patchPath)
    }
    
    shell.mkdir('-p', patchPath)
    shell.mkdir('-p', tmpPath)
    let tmpAssetsPath = `${tmpPath}`
    
    if (this.platform === PLATFORMS.IOS) {
      prePath = `${prePath}/assets`
      currPath = `${currPath}/assets`
      tmpAssetsPath = `${tmpPath}/assets`
      shell.cp('-R', currPath, tmpAssetsPath)
    } else {
      shell.cp('-R', `${currPath}/*`, tmpAssetsPath)
    }
    
    
    const dmp = new diff_match_patch()
    
    const text1 = fs.readFileSync(`${preFullPath}/${this.bundleFileName}`, 'utf-8')
    const text2 = fs.readFileSync(`${fullPath}/${this.bundleFileName}`, 'utf-8')
    const filePatches = dmp.patch_make(text1, text2)
    const patchesStr = dmp.patch_toText(filePatches)
    
    const diffFiles = []
    
    
    rd.eachSync(tmpAssetsPath, (f, s) => {
      // 每找到一个文件都会调用一次此函数
      // 参数s是通过 fs.stat() 获取到的文件属性值
      if (s.isFile()) {
        const fName = f.substr(tmpAssetsPath.length + 1)
        
        const fileName = f.substr(f.lastIndexOf('/') + 1)
        
        if (fileName.startsWith('.') || fileName === this.bundleFileName || fileName === this.bundleMetaFileName) {
          shell.rm('-rf', f)
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
    
    
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(patchFileName)
      const archive = archiver('zip', {
        store: true // Sets the compression method to STORE.
      })
      archive.pipe(output)
      archive.append(patchesStr.replace(/\n/mg, '\\n'), {name: 'patch.jsbundle'})
      archive.on('error', () => {
        reject()
      })
      output.on('close', () => {
        this._writeMd5ToFile(patchesPath, patchesJsonFilePath) //写入文件
        console.log(`${this.platformName} 打包完毕============`)
        resolve()
      })
      archive.directory(tmpAssetsPath, tmpAssetsPath.substr(tmpPath.length + 1))
      archive.finalize()
    })
    
    
  }
  
  
  /**
   * 计算filePath下所有文件md5和大小，并且写入到targetFile文件里面
   * @param filePath 原文件目录
   * @param md5FilePath md5文件名
   * @private
   */
  _writeMd5ToFile(filePath, md5FilePath) {
    
    const jsonObj = {}
    
    
    rd.eachSync(filePath, (f, s) => {
      if (s.isFile()) {
        const fName = f.substr(filePath.length + 1)
        const fileName = f.substr(f.lastIndexOf('/') + 1)
        if (fileName.startsWith('.')) {
          return
        }
        
        const fileMd5 = md5File.sync(f)
        jsonObj[fName] = `${fileMd5}-${s.size}`
      }
    })
    jsonfile.writeFileSync(md5FilePath, jsonObj, {spaces: 4})
    
    console.log(`${md5FilePath} 文件写入成功！`)
  }
  
  /**
   * 计算需要更新的内容
   * @param platform 操作系统版本
   * @param currentVer 当前版本
   * @param onLineVersions 已经上线的版本的集合，倒序，最大取10个版本
   * @returns {{latestVer: *, info: {}}}
   */
  getUpdateInfo(platform, currentVer, onLineVersions) {
    this.platformName = 'ios'
    if (platform == PLATFORMS.ANDROID) {
      this.platformName = 'android'
    }
    
    const latestVer = onLineVersions[0]
    
    const infoObj = {
      latestVer,
      isFull: false,
      isLatest: false,
      info: {}
    }
    
    if (onLineVersions.length > getResMaxPatchVersion()) {
      const latestVerDir = `${this.outPath}/ver-${latestVer}`
      const fullZipPath = `ver-${latestVer}/full/${this.platformName}.zip`
      const jsonFilePath = `${latestVerDir}/full/files-${this.platformName}.json`
      infoObj.isFull = true
      infoObj.fullInfo = jsonfile.readFileSync(jsonFilePath)
      infoObj.fullZipPath = fullZipPath
      return infoObj
    }
    for (let i = 0; i < onLineVersions.length; i++) {
      let nVer = onLineVersions[i + 1]
      let lVer = onLineVersions[i]
      if (i === onLineVersions.length - 1) {
        nVer = currentVer
      }
      const currentVerDir = `${this.outPath}/ver-${lVer}`
      console.log(currentVerDir)
      const patchesJsonFilePath = `${this.outPath}/ver-${lVer}/patches/patch-${nVer}-${lVer}-${this.platformName}.json`
      console.log(patchesJsonFilePath)
      if (!shell.test('-e', patchesJsonFilePath)) {
        console.log('文件不存在')
        throw new Error(`${patchesJsonFilePath} 不存在`)
      }
      const obj = jsonfile.readFileSync(patchesJsonFilePath)
      for (const key of Object.keys(obj)) {
        infoObj.info[key] = obj[key]
      }
    }
    return infoObj
  }
}


export default Build
