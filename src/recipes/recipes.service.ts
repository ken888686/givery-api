import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async create(recipe: CreateRecipeDto) {
    const newRecipe = this.recipeRepository.create(recipe);
    const savedRecipe = await this.recipeRepository.save(newRecipe);
    return await this.recipeRepository.findOne({
      where: { id: savedRecipe.id },
    });
  }

  async findAll() {
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

  async findOne(id: number) {
    const data = await this.recipeRepository.findOne({ where: { id: id } });
    return {
      id: data.id,
      title: data.title,
      making_time: data.making_time,
      serves: data.serves,
      ingredients: data.ingredients,
      cost: data.cost,
    };
  }

  async update(id: number, recipe: UpdateRecipeDto) {
    return await this.recipeRepository.update({ id: id }, recipe);
  }

  async remove(id: number) {
    return await this.recipeRepository.delete({ id: id });
  }
}
