import { Repository, EntityRepository } from 'typeorm';
import { FilePath } from 'src/entity/file_paths.entity';

@EntityRepository(FilePath)
export class FilePathsRepository extends Repository<FilePath> {
}
