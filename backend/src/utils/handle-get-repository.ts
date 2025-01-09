import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import AppDataSource from '../data-source';

export const handleGetRespository = <T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> =>
  AppDataSource.manager.getRepository(entity);
