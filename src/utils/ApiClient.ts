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

  //MESSAGE
  public getMessage = (id: string) => {
    return this.instance.get<{ id: string }>(`/messages/${id}`);
  }

  public createMessage = (content: string, recipientId: string, replyTo: string, roomId: string) => {
    return this.instance.post<{ content: string, recipientId: string, replyTo: string, roomId: string }, { id: string }>( '/message/', { content, recipientId, replyTo, roomId });
  }
}

export default Api;
