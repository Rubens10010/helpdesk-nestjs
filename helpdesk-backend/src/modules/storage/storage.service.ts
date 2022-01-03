import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class StorageService {
  constructor(
    
  ) {}

  getFile(path: string)
  {
    const filedata =  fs.readFileSync(path)
    return filedata;
  }

  removeFile(path: string)
  {
    try {
      fs.unlinkSync(path);
    } catch(err) {
      console.log(err);
      throw err;
    }
  }
}
