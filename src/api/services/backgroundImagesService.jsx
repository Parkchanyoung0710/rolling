import requestor from "../client/requestor";

class BackgroundImageService {
  getBackgroundImage() {
    return requestor.get(`/background-images/`);
  }
}

const backgroundImageService = new BackgroundImageService();

export default backgroundImageService;
