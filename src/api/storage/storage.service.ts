import { Injectable } from '@nestjs/common';
import { NestMinioService } from 'nestjs-minio';

@Injectable()
export class StorageService {
  constructor(private readonly minioClient: NestMinioService) {}

  async uploadPoster(bucket, name, buffer) {
    const bucketExist = await this.minioClient.getMinio().bucketExists(bucket);
    console.log(bucketExist);

    if (!bucketExist) {
      await this.minioClient.getMinio().makeBucket(bucket);
    }
    await this.minioClient.getMinio().putObject(bucket, name, buffer);
  }

  public async getPoster(bucket, name, res) {
    const data = await this.minioClient.getMinio().getObject(bucket, name);

    return data.pipe(res);
  }
}
