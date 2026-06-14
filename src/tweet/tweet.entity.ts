import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export class Tweet{
    @PrimaryGeneratedColumn()
    id!: number

    @Column(
        {
            nullable:false,
            type: 'text'
        }
    )
    text!:string

    @Column({
         nullable:true,
            type: 'text'
    })
    image?:string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!:Date
}