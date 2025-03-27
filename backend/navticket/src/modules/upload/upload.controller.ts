import { Controller, Post, UseInterceptors, UploadedFile, Param, Get, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('company/:id/document')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCompanyDocument(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') companyId: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    
    // Optional: Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Only PDF and DOC/DOCX are allowed.');
    }
    
    return this.uploadService.uploadCompanyDocument(file, companyId);
  }

  @Get('company/:id/documents')
  async getCompanyDocuments(@Param('id') companyId: string) {
    return this.uploadService.getCompanyDocuments(companyId);
  }
}