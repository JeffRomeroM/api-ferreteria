import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../entities/category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "../dto/category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  //crear una categoria
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepo.create(createCategoryDto);
    await this.categoryRepo.save(category);
    return category;
  }
  
  //Encontrar una categoria
  
  findOne(id: number){
    return this.categoryRepo.findOneBy({id})
}

  //mostrar todos las categorias
  findAll(){
    return this.categoryRepo.find({
      order: { id: 'ASC'},
    });
  }


//eliminar una categoria
  async remove(id: number) {
  const category = await this.findOne(id);
  await this.categoryRepo.remove(category);

  return ' Categoria eliminada';
  }

  //actualizar una categoria
  async update(id: number, cambios: CreateCategoryDto) {
    const oldCategory = await this.findOne(id);
    const updateCategory = await this.categoryRepo.merge(oldCategory, cambios);

    return this.categoryRepo.save(updateCategory);
  }
}
