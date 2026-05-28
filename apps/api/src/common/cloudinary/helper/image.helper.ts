import { BadRequestException } from '@nestjs/common';

export const extractPublicIdFromUrl = async (url: string) => {
  const match = url.match(/\/upload\/v\d+\/(.+)$/);

  if (!match) {
    throw new BadRequestException('Invalid image link format.');
  }

  return match[1].replace(/\.[^/.]+$/, '');
};
