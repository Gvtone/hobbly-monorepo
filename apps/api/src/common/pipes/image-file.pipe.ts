import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

interface ImageFilePipeOptions {
  maxSizeMB?: number;
  fileType?: RegExp;
  optional?: boolean;
}

export function imageFilePipe({
  maxSizeMB = 15,
  fileType = /^image\/(png|jpeg|jpg|gif)$/,
  optional = false,
}: ImageFilePipeOptions = {}) {
  const maxSize = maxSizeMB * 1000 * 1000;

  return new ParseFilePipe({
    fileIsRequired: !optional,
    validators: [
      new MaxFileSizeValidator({
        maxSize,
        errorMessage: (ctx) =>
          `Received file size is ${ctx.file?.size / (1000 * 1000)} MB, but it must be smaller than ${maxSizeMB} MB.`,
      }),
      new FileTypeValidator({
        fileType,
        errorMessage: (ctx) =>
          `Received file type '${ctx.file?.mimetype}', but expected '${fileType}'`,
      }),
    ],
  });
}
