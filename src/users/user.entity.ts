import { Profile } from "src/profile/profile.entity";
import { Tweet } from "src/tweet/tweet.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToOne(()=>Profile,(profile)=> profile.user, {
        cascade: true,
        eager:true
        
    })
    profile?: Profile

    @OneToMany(()=> Tweet, (tweets)=> tweets.user)
    tweets?: Tweet

    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
    @DeleteDateColumn()
    deletedAt!: Date;
}