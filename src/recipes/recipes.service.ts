import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeDto } from './dtos/recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async findAll(): Promise<RecipeDto[]> {
    const data = await this.recipeRepository.find();
    return data.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        making_time: recipe.making_time,
        serves: recipe.serves,
        ingredients: recipe.ingredients,
        cost: recipe.cost,
      };
    });
  }
}
