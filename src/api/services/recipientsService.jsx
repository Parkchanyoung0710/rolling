import requestor from "../client/requestor";

class RecipientsService {
  getRecipients() {
    return requestor.get(`/14-8/recipients/`);
  }

  postRecipients(body) {
    const requestBody = {
      ...body,
      team: "14-8",
    };
    return requestor.post("/14-8/recipients/", requestBody);
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
    const requestBody = {
      ...body,
      team: "14-8",
    };
    return requestor.post(`/14-8/recipients/${id}/messages/`, requestBody);
  }

  getRecipientsReactions(id, limit, offset) {
    return requestor.patch(
      `/recipients/${id}/reactions/?limit=${limit}&offset=${offset}`
    );
  }

  postRecipientsReactions(id, body) {
    const requestBody = {
      ...body,
      team: "14-8",
    };
    return requestor.post(`/14-8/recipients/${id}/reactions/`, requestBody);
  }
}

const recipientsService = new RecipientsService();

export default recipientsService;
