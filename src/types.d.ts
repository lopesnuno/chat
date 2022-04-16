export interface Repository<T> {
  create(o: T): Promise<T>
  get(id: string): Promise<T>
  insert(o: T): Promise<T>
}
