import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async findAll() {
    const data = await this.recipesService.findAll();
    return {
      recipes: data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.recipesService.findOne(id);
    return {
      message: 'Recipe details by id',
      recipe: [data],
    };
  }
}
