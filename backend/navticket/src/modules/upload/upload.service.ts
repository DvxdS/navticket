// upload/upload.service.ts
import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../company/companies/companyEntity';

@Injectable()
export class UploadService {
  private supabase;

  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
  }

  async uploadCompanyDocument(file: Express.Multer.File, companyId: string) {
    
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = `companies/${companyId}/${fileName}`;

    
    const { data, error } = await this.supabase.storage
      .from('company-documents')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw new Error(`Failed to upload: ${error.message}`);
    }

    
    const { data: publicURL } = this.supabase.storage
      .from('company-documents')
      .getPublicUrl(filePath);


    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    if (!company) {
      throw new Error(`Company not found with id: ${companyId}`);
    }

    
    const updatedDocs = company.officialDocs || [];
    updatedDocs.push(publicURL.publicUrl);

    await this.companyRepository.update(companyId, { officialDocs: updatedDocs });

    return {
      originalName: file.originalname,
      fileName: fileName,
      fileSize: file.size,
      mimeType: file.mimetype,
      url: publicURL.publicUrl,
    };
  }

  async getCompanyDocuments(companyId: string) {
    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    if (!company || !company.officialDocs) {
      return [];
    }
    return company.officialDocs;
  }
}