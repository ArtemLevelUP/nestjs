import { Column, Entity, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import {Flavor} from "./flavor.entity";
// export class Coffee {
//     id: number;
//     name: string;
//     brand: string;
//     flavors: string[];
// }

@Entity() // sql table === 'coffee'
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column({ default: 0})
    recommendations: number;

    @JoinTable() // 👈 Join the 2 tables - only the OWNER-side does this
    @ManyToMany(
        type => Flavor,
        flavor => flavor.coffees,
        {
            cascade: true, // 👈 or optionally just insert or update ['insert']
        },
    )
    flavors: Flavor[];
}