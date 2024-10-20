import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from './app.controller';
import { FavoritesService } from './app.service';
import { Favorite } from './entities/favorite.entity';

describe('FavoritesController', () => {
  let controller: FavoritesController;
  let service: FavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [
        {
          provide: FavoritesService,
          useValue: {
            addFavorite: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FavoritesController>(FavoritesController);
    service = module.get<FavoritesService>(FavoritesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      jest.spyOn(service, 'addFavorite').mockResolvedValue(favorite);
      const result = await controller.addFavorite(userId, asteroidId);
      expect(result).toEqual({
        id: 'favorite-uuid',
        userId: favorite.userId,
        asteroidId: favorite.asteroidId,
      });
    });
  });
});
