import http from "../http-common";
import IHobby from "../types/hobby.type";
class HobbyService {
  getAllOfUser(id: number) {
    return http.get<IHobby[]>(`/hobbies/${id}`);
  }
  create(data: IHobby) {
    return http.post<IHobby>("/hobbies", data);
  }
  delete(id: number) {
    return http.delete(`/hobbies/${id}`);
  }
}
export default new HobbyService();