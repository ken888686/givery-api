import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecipeDto } from './dtos/recipe.dto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async findAll(): Promise<{ recipes: RecipeDto[] }> {
    const data = await this.recipesService.findAll();
    return {
      recipes: data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<RecipeDto> {
    return await this.recipesService.findOne(id);
  }
}
