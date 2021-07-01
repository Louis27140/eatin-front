import axios from "./API";

export default {
  async updateProfile(profile) {
    return await axios.put("profile", profile);
  },
};
