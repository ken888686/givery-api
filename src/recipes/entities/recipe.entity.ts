import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'recipes' })
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  making_time: string;

  @Column()
  serves: string;

  @Column()
  ingredients: string;

  @Column()
  cost: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
