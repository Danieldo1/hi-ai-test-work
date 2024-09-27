import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Chat{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    message: string;

    @Column('text')
    response: string;

    @CreateDateColumn()
    createdAt: Date;
}