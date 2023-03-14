/*
 * @Descripttion: 自动生成文件夹脚本
 * @Author:
 * @Date: 2022-07-02 15:04:05
 * @LastEditors: yangzhiwei
 * @LastEditTime: 2022-07-13 21:41:14
 */
import chalk from 'chalk'
import path from 'path'
import fs from 'fs'

const resolve = (__dirname, ...file) => path.resolve(__dirname, ...file)
const log = (message) => console.log(chalk.green(`${message}`))
const successLog = (message) => console.log(chalk.blue(`${message}`))
const errorLog = (error) => console.log(chalk.red(`${error}`))
log('请输入要生成的"页面名称:页面描述"、会生成在 /src/pages 目录下')
process.stdin.on('data', async (chunk) => {
  // 页面名称
  const content = String(chunk).trim().toString()
  const inputSearch = content.search(':')
  if (inputSearch == -1) {
    errorLog('格式错误，请重新输入')
    return
  }
  // 拆分用户输入的名称和描述
  const inputName = content.split(':')[0]
  const inputDosc = content.split(':')[1] || inputName
  successLog(`将在 /src/pages 目录下创建 ${inputName} 文件夹`)
  const targetPath = resolve('./src/pages', inputName)
  // 判断页面文件夹是否存在
  const pageExists = fs.existsSync(targetPath)
  if (pageExists) {
    errorLog('页面已经存在，请重新输入')
    return
  }

  // 对multiPages.json进行操作
  /**
   * 1.读取文件
   */
  await fs.readFile(path.resolve('./scripts', 'multiPages.json'), 'utf-8', (err, data) => {
    //获取老数据
    let datas = JSON.parse(data)
    //和老数据去重
    let index = datas.findIndex((ele) => {
      return ele.chunk == inputName
    })
    if (index == -1) {
      //添加新数据
      let obj = {
        chunk: inputName,
        chunkName: inputDosc
      }
      datas.push(obj)
      setFile(datas)
    }
  })
  /**
   * 改变multiPages.json
   */
  function setFile(datas) {
    // 通过writeFile改变数据内容
    fs.writeFile(
      path.resolve('./scripts', 'multiPages.json'),
      JSON.stringify(datas),
      'utf-8',
      (err) => {
        if (err) throw err
        // 在pages中建立新的目录
        fs.mkdirSync(targetPath)
        const sourcePath = resolve('./scripts/template')
        copyFile(sourcePath, targetPath)
        process.stdin.emit('end')
      }
    )
  }
})

process.stdin.on('end', () => {
  console.log('exit')
  process.exit()
})

/**
 *  判断文件夹是否存在, 不存在创建一个
 *  fs.mkdirSync : 同步地创建目录。 返回 undefined
 *  sourceFile => /Users/lixia/Desktop/un/apph5/scripts/template/App.scss
 *  sourceFile => /Users/lixia/Desktop/un/apph5/scripts/template/components
 *
 *  newTargetPath => /Users/lixia/Desktop/un/apph5/src/Project/lixia2/App.scss
 *  newTargetPath => /Users/lixia/Desktop/un/apph5/src/Project/lixia2/components
 */
const isExist = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
}

const copyFile = (sourcePath, targetPath) => {
  const sourceFile = fs.readdirSync(sourcePath, { withFileTypes: true })

  sourceFile.forEach((file) => {
    const newSourcePath = path.resolve(sourcePath, file.name)
    const newTargetPath = path.resolve(targetPath, file.name)

    if (file.isDirectory()) {
      isExist(newTargetPath)
      copyFile(newSourcePath, newTargetPath)
    } else {
      fs.copyFileSync(newSourcePath, newTargetPath)
    }
  })
}
