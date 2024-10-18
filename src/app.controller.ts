import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { FavoritesService } from './app.service';
import { Favorite } from './entities/favorite.entity';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async addFavorite(
    @Body('userId') userId: string,
    @Body('asteroidId') asteroidId: string,
  ): Promise<Favorite> {
    return this.favoritesService.addFavorite(userId, asteroidId);
  }

  @Get(':userId')
  async getFavorites(@Param('userId') userId: string): Promise<Favorite[]> {
    return this.favoritesService.getFavorites(userId);
  }

  @Delete()
  async removeFavorite(
    @Body('userId') userId: string,
    @Body('asteroidId') asteroidId: string,
  ): Promise<void> {
    return this.favoritesService.removeFavorite(userId, asteroidId);
  }
}
