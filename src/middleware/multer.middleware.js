import multer from 'multer';
import fs from 'fs';
import Setting from '../config/setting.config.js';
import path from 'node:path';

const createStorage = (uploadPath) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const fullPath = './uploads' + uploadPath;
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      cb(null, fullPath);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname + path.extname(file.originalname));
    },
  });
};

/**
 * @param {'image' | 'file' | 'video' | '*'} mime
 */
const createFilter = (mime) => {
  return (req, file, cb) => {
    let allowedMimes = [];

    if (mime == '*')
      allowedMimes = [
        ...Setting.allowedFileMimes,
        ...Setting.allowedImageMimes,
        ...Setting.allowedVideoMimes,
      ];
    else if (mime == 'image') allowedMimes = Setting.allowedImageMimes;
    else if (mime == 'file') allowedMimes = Setting.allowedFileMimes;
    else if (mime == 'video') allowedMimes = Setting.allowedVideoMimes;

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        `Please upload only ${allowedMimes.map((mim) => mim.split('/')[1]).join(', ')} file.`,
        false,
      );
    }
  };
};

/**
 * @param {String} uploadPath
 * @param {'image' | 'file' | 'video' | '*'} fileType
 * @param {number} limitSize
 */
const uploader = (
  uploadPath = '/images',
  fileType = 'image',
  limitSize = Setting.defaultLimitSize,
) => {
  const storage = createStorage(uploadPath),
    fileFilter = createFilter(fileType),
    limits = {};

  return multer({ storage, fileFilter });
};

export default uploader;
