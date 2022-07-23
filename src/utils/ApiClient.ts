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

  public deleteRoom = (id: string) => {
    return this.instance.delete<{ id: string }, { deleted: boolean }>('/room/', { data: { id: id } });
  }

  //MESSAGE
  // id = messageId
  public getMessage = (id: string) => {
    return this.instance.get<{ id: string }>(`/message/${id}`);
  }

  // id = roomId
  public listMessage = (id: string) => {
    return this.instance.get<{ id: string }>(`/messages/${id}`);
  }

  public createMessage = (content: string, recipientId: string, replyTo: string, roomId: string) => {
    return this.instance.post<{ content: string, recipientId: string, replyTo: string, roomId: string }, { id: string }>( '/message/', { content, recipientId, replyTo, roomId });
  }

  public updateMessage = (id: string, content: string) => {
    return this.instance.put<{ id: string, content: string }, { updated: boolean }>('/message/', { id, content });
  }

  public deleteMessage = (id: string) => {
    return this.instance.delete<{ id: string }, { deleted: boolean }>('/message/', { data: { id: id } });
  }

}

export default Api;
