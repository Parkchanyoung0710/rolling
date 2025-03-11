import requestor from "../client/requestor";

class MessageService {
  getMessages(id) {
    return requestor.get(`/14-8/messages/${id}/`);
  }

  putMessages(id, body) {
    return requestor.put(`/14-8/messages/${id}/`, {
      data: body,
    });
  }

  patchMessages(id, body) {
    return requestor.patch(`/14-8/messages/${id}/`, {
      data: body,
    });
  }

  deleteMessages(id) {
    return requestor.delete(`/14-8/messages/${id}/`);
  }
}

const messageService = new MessageService();

export default messageService;
