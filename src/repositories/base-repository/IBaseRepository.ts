import { CollectionAggregationOptions, FilterQuery } from 'mongodb';

export interface IBaseRepository<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  getOne(id: number): Promise<T | undefined>;
  deleteOne(id: number): Promise<void>;
  getByQuery(query: FilterQuery<T>): Promise<T[] | undefined>;
  insertMany(data: T[]): Promise<void>;
  agregate<U>(
    pipeline?: object[] | undefined,
    options?: CollectionAggregationOptions | undefined
  ): Promise<U[] | undefined>;
}
