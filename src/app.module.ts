import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './app.service';
import { FavoritesController } from './app.controller';
import { Favorite } from './entities/favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-favorites',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'favorites',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Favorite]),
  ],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class AppModule {}
