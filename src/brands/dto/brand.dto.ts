import { IsNotEmpty, IsNumber, IsString, MaxLength} from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  marca: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

}
