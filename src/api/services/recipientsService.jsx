import requestor from "../client/requestor";

class RecipientsService {
  getRecipients() {
    return requestor.get(`/14-8/recipients/`);
  }

  postRecipients(body) {
    return requestor.put(`/14-8/recipients/`, {
      data: body,
    });
  }

  getRecipientsId(id) {
    return requestor.patch(`/14-8/recipients/${id}/`);
  }

  deleteRecipientsId(id) {
    return requestor.delete(`/14-8/recipients/${id}/`);
  }

  getRecipientsMessages(id, limit, offset) {
    return requestor.get(
      `/14-8/recipients/${id}/messages/?limit=${limit}&offset=${offset}`
    );
  }

  postRecipientsMessages(id, body) {
    return requestor.put(`/14-8/recipients/${id}/messages`, {
      data: body,
    });
  }

  getRecipientsReactions(id, limit, offset) {
    return requestor.patch(
      `/recipients/${id}/reactions/?limit=${limit}&offset=${offset}`
    );
  }

  postRecipientsReactions(id, body) {
    return requestor.delete(`/recipients/${id}/reactions/`, {
      data: body,
    });
  }
}

const recipientsService = new RecipientsService();

export default recipientsService;
