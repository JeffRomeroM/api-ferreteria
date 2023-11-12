import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserImage } from '../entities/user-image.entity';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,

        @InjectRepository(UserImage)
        private readonly userImageRepo: Repository<UserImage>,

        private readonly dataSource: DataSource,
    ){}

     
    async create(createUserDto: CreateUserDto) {
        const { images = [], password, ...detailUser } = createUserDto;
        const user = await this.userRepo.create({
          ...detailUser,
          password: bcrypt.hashSync(password, 10),
          images: images.map((image) => this.userImageRepo.create({ url: image })),
        });
    
        await this.userRepo.save(user);
        return user;
      }


    async login(login: LoginUserDto) {
        const { password, email } = login;
        const user = await this.userRepo.findOne({
          where: { email },
          select: { password: true, email: true },
        });
    
        if (!user) {
          throw new UnauthorizedException(
            'Credenciales no válidas, correo no encontrado',
          );
        }
        if (!bcrypt.compareSync(password, user.password)) {
          throw new UnauthorizedException(
            'Credenciales no válidas, password incorrecta',
          );
        }
        return user;
      }
      
    //Encontrar un user
    findOne(id: number){
        return this.userRepo.findOne({
            where: {id},
            relations: {
                images: true,
            },
        });
    }
    //mostrar todos los usuarios
    findAll(){
        return   this.userRepo.find({
            order: {id: 'ASC'},
            relations: {
                images: true,
            },
        });
    }
    
    //eliminar un usuario
    async remove(id:number){
        const user =await this.findOne(id);
        await this.userRepo.remove(user);
        return 'Usuario eliminado';
    }

    //actualizar un usuario con imagenes
    async update(id: number, changes: CreateUserDto){
        const {images, ...updateAll } = changes;
        const user = await this.userRepo.preload({
            id: id,
            
            ...updateAll,//Esparcir todos los datos del usuario
        });
     

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        if(images) {
            //sino esta vacio borramos las imagenes existentes
            await queryRunner.manager.delete(UserImage, {user: { id }});
            
            //creamos nuevas imagenes
            user.images = images.map((image) =>
            this.userImageRepo.create({ url: image }),
            );
        } else {
          user.images = await this.userImageRepo.findBy({ user: { id }});
        }
        await queryRunner.manager.save(user);

        await queryRunner.commitTransaction();
        await queryRunner.release();
        return user;
    }
}