/**
 * @description utils
 */
const path = require('path')
const fsExtra = require('fs-extra')
const { SuccessResultModel, FailResultModel } = require('../model/ResultModel')
const { CODE_ENUM } = require('../utils/constant')

const MAX_FILE_SIZE = 1024 * 1024 * 1024 // 1M
const DIST_FOLDER_PATH = path.join(__dirname, '..', 'uploadFiles')

// 是否存在该目录
fsExtra.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fsExtra.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 保存文件
 * @param {string} name
 * @param {string} type
 * @param {number} size
 * @param {string} filePah
 */
async function saveFiles({ name, size, type, filePath }) {
  console.log('进来了么')
  if (size > MAX_FILE_SIZE) {
    await fsExtra.remove(filePath)
    return new FailResultModel(CODE_ENUM.FILE_SIZE_BIG)
  }
  // 线上应是调用文件服务（CDN）api，传递file并获取返回的图片链接url
  // 开发使用本项目移动文件path
  const fileName = `${new Date().getTime()}.${name}` // 防重名
  const disFilePath = path.join(DIST_FOLDER_PATH, fileName)
  console.log(fileName, disFilePath, '---上传成功文件名1---')
  await fsExtra.move(filePath, disFilePath, err => console.log(err))
  // 返回图片地址信息
  return new SuccessResultModel({
    filePath: `/${fileName}`,
    absoluteFilePath: disFilePath
  });
}

module.exports = {
  saveFiles
}