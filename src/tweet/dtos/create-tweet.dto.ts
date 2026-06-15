import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, isString } from "class-validator";

export class CreateTweetDto{
    @IsString()
    @IsNotEmpty()
    text!: string;

    @IsOptional()
    image?: string

    @IsInt()
    @IsNotEmpty()
    userId!: number

    @IsArray()
    @IsInt({each:true})
    @IsOptional()
    hashtags?:number[]
}