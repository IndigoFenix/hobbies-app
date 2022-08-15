import http from "../http-common";
import IUser from "../types/user.type"
class UserService {
  getAll() {
    return http.get<IUser[]>("/users");
  }
  get(id: number) {
    return http.get<IUser>(`/users/${id}`);
  }
  create(data: IUser) {
    return http.post<IUser>("/users", data);
  }
  delete(id: number) {
    return http.delete(`/users/${id}`);
  }
}
export default new UserService();