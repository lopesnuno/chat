export interface Repository<T> {
  create(o: T): Promise<T>
  get(id: string): Promise<T>
  insert(id: string, roomId: string, userId: string): Promise<boolean>
}
