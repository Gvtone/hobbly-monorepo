import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { extractPublicIdFromUrl } from './helper/image.helper';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  async upload(
    file: Express.Multer.File,
    folderName: string = '',
  ): Promise<{ secure_url: string; public_id: string }> {
    if (process.env.NODE_ENV === 'development') {
      folderName = `dev/${folderName}`;
    } else {
      folderName = `prod/${folderName}`;
    }

    return await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `${process.env.CLOUDINARY_ROOT_FOLDER_NAME}/${folderName}`,
            transformation: {
              quality: 'auto',
              fetch_format: 'webp',
              width: 1200,
            },
          },
          (error, result) => {
            if (error) {
              return reject(new BadRequestException(error.message));
            }
            return resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
          },
        )
        .end(file.buffer);
    });
  }

  async delete(url: string) {
    const publicId = await extractPublicIdFromUrl(url);

    await cloudinary.uploader
      .destroy(publicId, { resource_type: 'image' })
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }
}
