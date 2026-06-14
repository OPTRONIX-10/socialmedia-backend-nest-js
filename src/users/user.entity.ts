import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
        length: 24,
    })
    userName!:string;
   

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
        length: 100,
    })
    email!:string;

    @Column({
        type:'varchar',
        nullable:false,
        length:100
    })
    password!:string;

    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
    @DeleteDateColumn()
    deletedAt!: Date;
}