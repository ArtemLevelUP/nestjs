import { IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateCoffeeDto {
    @ApiProperty({ description: 'The name of a coffee.' })
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsString()
    readonly brand: string;

    @ApiProperty()
    @IsString({ each: true })
    readonly flavors: string[];
}
