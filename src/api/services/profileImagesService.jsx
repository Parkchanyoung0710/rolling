import requestor from "../client/requestor";

class ProfileImageService{
  getProfileImageService(){
    return requestor.get(`/profile-images/`)
  }
}

const profileImageService = new ProfileImageService();

export default profileImageService;