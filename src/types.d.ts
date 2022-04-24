export interface Repository<T> {
  create(o: T): Promise<T>
  get(id: string): Promise<T>
  update(o: T): Promise<boolean>
  delete(id: string): Promise<boolean>
}
