export interface Repository<T, K = string> {
  create(o: T): Promise<T>
  get(id: string): Promise<T>
  update(o: T): Promise<boolean>
  delete(id: K): Promise<boolean>
}
