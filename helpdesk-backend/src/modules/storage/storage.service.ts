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
}
