import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async addFavorite(userId: string, asteroidId: string): Promise<Favorite> {
    const favorite = this.favoriteRepository.create({
      userId,
      asteroidId,
    });
    return this.favoriteRepository.save(favorite);
  }

  async getFavorites(userId: string): Promise<Favorite[]> {
    return this.favoriteRepository.find({ where: { userId } });
  }

  async removeFavorite(userId: string, asteroidId: string): Promise<void> {
    await this.favoriteRepository.delete({ userId, asteroidId });
  }
}
