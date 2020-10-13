import {Injectable, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from "./entities/flavor.entity";
import { Event } from "../events/entities/event.entity";
import { COFFEE_BRANDS } from "./coffees.constants";
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
    create() {
        return ['buddy brew', 'nescafe'];
    }
}

@Module({
    imports: [
        TypeOrmModule.forFeature([Coffee, Flavor, Event]),
        ConfigModule.forFeature(coffeesConfig),
    ], // 👈 Adding Coffee Entity here to TypeOrmModule.forFeature
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
        // CoffeeBrandsFactory,
        // {
        //     provide: ConfigService,
        //     useClass:
        //         process.env.NODE_ENV === 'development'
        //             ? DevelopmentConfigService
        //             : ProductionConfigService,
        // },
        // {
        //     provide: COFFEE_BRANDS, // 👈
        //     useValue: ['buddy brew', 'nescafe'] // array of coffee brands,
        // },
        // {
        //     provide: COFFEE_BRANDS,
        //     useFactory: (brandsFactory: CoffeeBrandsFactory) =>
        //         brandsFactory.create(),
        //     inject: [CoffeeBrandsFactory],
        // },
        {
            provide: 'COFFEE_BRANDS',
            // Note "async" here, and Promise/Async event inside the Factory function
            // Could be a database connection / API call / etc
            // In our case we're just "mocking" this type of event with a Promise
            useFactory: async (connection: Connection): Promise<string[]> => {
                // const coffeeBrands = await connection.query('SELECT * ...');
                const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe'])
                return coffeeBrands;
            },
            inject: [Connection],
        }
    ],
    exports: [CoffeesService]
})
export class CoffeesModule {}
