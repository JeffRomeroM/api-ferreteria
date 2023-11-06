import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './controllers/brands.controller';
import { ModelController } from './controllers/modelos.controller';
import { Model } from './entities/model.entity';
import { Brand } from './entities/brand.entity';
import { ModelsService } from './services/models.service';
import { BrandsService } from './services/brands.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Model])],
  controllers: [BrandController, ModelController ],
  providers: [BrandsService, ModelsService]
})
export class BrandsModule {}

