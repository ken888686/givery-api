import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  async create(@Body() body: CreateRecipeDto) {
    if (
      body === null ||
      body.title === null ||
      body.making_time === null ||
      body.serves === null ||
      body.ingredients === null ||
      body.cost === null
    ) {
      return {
        message: 'Recipe creation failed!',
        required: 'title, making_time, serves, ingredients, cost',
      };
    }

    const data = await this.recipesService.create(body);
    return {
      message: 'Recipe successfully created!',
      recipe: [data],
    };
  }

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
