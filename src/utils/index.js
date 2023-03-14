import axios from "axios";
export const SERVER_BASE_URL = "http://localhost:8000/api/";

export const getAllMessageTemplates = async() => {
    try{
      let response = await axios.get(SERVER_BASE_URL+"messagetemplates");
      return response.data;
    }catch(err){
        return err;
    }
}
export const saveTemplate = async(data) => {
  try{
    let response = await axios.post(SERVER_BASE_URL+ "messagetemplates", data);
    return response;
  }catch(err){
    return err;
  }

}
export const editTemplate = async(id, data) => {
  try{
     let res = await axios.put(SERVER_BASE_URL+`messagetemplates/${id}`, data);
     return res;
  }catch(err){
    return err;
  }
}
export const handleDeleteTemplate = async(id) => {
  try{
     let res = await axios.delete(SERVER_BASE_URL+`messagetemplates/${id}`);
     return res;
  }catch(err){
    return err;
  }
}
export const searchMessageTemplates = async(val) => {
  try{
    let res = await axios.get(SERVER_BASE_URL+`messagetemplates/search/${val}`);
    return res;
  }catch(err){
    return err;
  }
}