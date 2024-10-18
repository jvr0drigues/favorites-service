import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from './app.service';
import { Favorite } from './entities/favorite.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const mockFavoriteRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
});

describe('FavoritesService', () => {
  let service: FavoritesService;
  let repository: Repository<Favorite>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: getRepositoryToken(Favorite),
          useFactory: mockFavoriteRepository,
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    repository = module.get<Repository<Favorite>>(getRepositoryToken(Favorite));
  });

  describe('addFavorite', () => {
    it('should add a favorite asteroid', async () => {
      const userId = 'user-uuid';
      const asteroidId = 'asteroid-uuid';
      const favorite: Favorite = {
        userId,
        asteroidId,
        id: 'favorite-uuid',
        createdAt: undefined,
      };

      jest.spyOn(repository, 'save').mockResolvedValue(favorite);

      const result = await service.addFavorite(userId, asteroidId);

      expect(result).toEqual(favorite);
    });
  });
});
