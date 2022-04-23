export interface Repository<T> {
  create(o: T): Promise<T>
  get(id: string): Promise<T>
  update(id: string, name: string): Promise<boolean>
  delete(id: string): Promise<boolean>
}
