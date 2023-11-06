import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsNumber()
    id?: number;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;
    
    @IsDateString()
    @IsOptional()
    created_at: string;
  
  
  }