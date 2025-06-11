import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  ObjectCannedACL,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3';
import { PrismaService } from '@database/PrismaService';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseDeleteOneFileDto } from './dto/response-delete-one-file.dto';
import { ResponseOneFileDto } from './dto/response-one-file.dto';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const region = this.configService.get<string>('AWS_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');

    if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
      throw new Error('Missing required AWS configuration');
    }

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
    this.bucketName = bucketName;
  }

  async uploadOneFile(file: Express.Multer.File): Promise<ResponseOneFileDto> {
    const uploadParams = {
      Bucket: this.bucketName,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: ObjectCannedACL.public_read,
    };

    await this.s3Client.send(new PutObjectCommand(uploadParams));

    return {
      imageUrl: `https://${this.bucketName}.s3.amazonaws.com/${uploadParams.Key}`,
    };
  }

  async deleteProfilePhoto(id: string): Promise<ResponseDeleteOneFileDto> {
    const customer = await this.prisma.cliente.findUnique({ where: { id } });

    if (!customer || !customer.imageUrl) {
      throw new Error('Customer not found or no profile photo to delete');
    }

    const fileKey = customer.imageUrl.split('/').pop();

    const deleteParams: DeleteObjectCommandInput = {
      Bucket: this.bucketName,
      Key: fileKey,
    };

    await this.s3Client.send(new DeleteObjectCommand(deleteParams));

    const costumerUpdated = await this.prisma.cliente.update({
      where: { id },
      data: { imageUrl: null },
    });

    return {
      id: costumerUpdated.id,
      name: costumerUpdated.name,
      email: costumerUpdated.email,
      imageUrl: costumerUpdated.imageUrl || '',
      tenantId: costumerUpdated.tenantId,
    };
  }
}
