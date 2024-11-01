import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
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

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UpdateRecipeDto) {
    await this.recipesService.update(id, body);
    const data = await this.recipesService.findOne(id);
    return {
      message: 'Recipe successfully updated!',
      recipe: [data],
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    // Check if the recipe exists
    const recipe = await this.recipesService.findOne(id);
    if (!recipe) {
      return {
        message: 'No Recipe found',
      };
    }

    // Delete the recipe
    const removeResult = await this.recipesService.remove(id);
    if (removeResult.affected >= 0) {
      return {
        message: 'Recipe successfully removed!',
      };
    }
  }
}
