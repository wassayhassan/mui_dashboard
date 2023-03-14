import { SERVER_BASE_URL } from "utils";
import axios from "axios";

const login = async(data) => {

      let response = await axios.post(SERVER_BASE_URL+ "user/login", data);
      console.log(response);
      return response;
}
let UserService = {
    login
}
export default UserService;