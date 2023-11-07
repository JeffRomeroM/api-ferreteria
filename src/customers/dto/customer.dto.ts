import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsNumber()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  contact: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  identification: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  address: string;

  @IsString()
  @IsOptional()
  type: string;


}
