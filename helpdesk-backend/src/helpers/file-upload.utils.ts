import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';

// Allow only images
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

/**
 * This function gives the name to new file uploaded. Name salt should be set in frontend.
 * @param req Request containing body
 * @param file File sent
 * @param callback function to call after
 */
export const editFileName = (req, file, callback) => {
  /*const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 10).toString(10))
    .join('');
  callback(null, `${name}${randomName}${fileExtName}`);*/
  let req_filename = req.body.name;
  const filename = req_filename.split('.')[0];
  const fileExtName = extname(file.originalname);
  callback(null, `${filename}${fileExtName}`);
};

/**
 * Returns a path to local storage directory mapped for current date.
 * @param req Request object
 * @param file File sent
 * @param cb callback function
 */
export const getDestinationPath = (req, file, cb) => {
    let req_filename = req.body.name;
    const filename = req_filename.split('.')[0];
    const fileExtName = extname(file.originalname);

    const base_path = '/helpdesk_storage/images';
    const date = new Date();
    
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    const folder_path = `${base_path}/${year}/${month}/${day}`;

    fs.access(folder_path, function(error) {
        if (error) {
          fs.mkdirSync(folder_path, { recursive: true });
        }

        const file_path = `${folder_path}/${filename}${fileExtName}`;
    
        try {
            console.log("testing");
            if(fs.existsSync(file_path)){
                return cb(
                    new HttpException(
                    'File Already Exists!',
                    HttpStatus.BAD_REQUEST,
                    ),
                    false,
                );
            }
        } catch(err) {
            return cb(
                new HttpException(
                'Some error ocurred while accesing storage directory!',
                HttpStatus.BAD_REQUEST,
                ),
                false,
            );
        }

        cb(null, folder_path);
      })
  };