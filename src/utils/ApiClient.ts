import HttpClient from './HttpClient';

class Api extends HttpClient {
  constructor() {
    super();
  }
  //ROOM
  public getRoom = (id: string) => {
    return this.instance.get<{ name: string, id: string }>(`/room/${id}`);
  };

  public createRoom = (name: string) => {
    return this.instance.post<{ name: string }, { id: string }>('/room/', { name });
  }

  public updateRoom = (id: string, name: string) => {
    return this.instance.put<{ id: string, name: string }, { updated: boolean }>('/room/', { id, name });
  }

  /*public deleteRoom = (id: string) => {
    return this.instance.delete<{ id: string }, { deleted: boolean }>('/room/', { id });
  }*/   //TODO: deleteRoom

  //USER
  public createUser = (name: string) => {
    return this.instance.post<{ name: string}, { id: string}>('/user/', { name });
  }

}

export default Api;
