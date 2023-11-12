import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './controllers/brands.controller';
import { Brand } from './entities/brand.entity';
import { BrandsService } from './services/brands.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  controllers: [BrandController ],
  providers: [BrandsService]
})
export class BrandsModule {}

