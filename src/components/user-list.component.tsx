import { Component } from "react";
import UserService from "../services/user.service";
import IUser from '../types/user.type';
import UserHobbies from "./user-hobbies.component";
import { Link } from "react-router-dom";
type Props = {};
type State = {
    users: Array<IUser>,
    currentUser: IUser | null,
    currentIndex: number,
    loading: boolean,
};
export default class UserList extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.getUsers = this.getUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveUser = this.setActiveUser.bind(this);
        this.state = {
            users: [],
            currentUser: null,
            currentIndex: -1,
            loading: false
        };
    }
    componentDidMount() {
        this.getUsers();
    }
    getUsers() {
        this.setState({loading: true});
        UserService.getAll()
            .then((response: any) => {
                this.setState({
                    loading: false,
                    users: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    refreshList() {
        this.getUsers();
        this.setState({
            currentUser: null,
            currentIndex: -1
        });
    }
    setActiveUser(user: IUser, index: number) {
        this.setState({
            currentUser: user,
            currentIndex: index
        });
    }
    delete(id: number) {
        this.setState(prevState => ({
            users: prevState.users.filter(i => i.id !== id)
        }));
        UserService.delete(id)
            .then((response: any) => {
                console.log(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    render() {
        const { users, currentUser, currentIndex, loading } = this.state;
        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Users</h4>
                    <Link className="btn btn-success mb-2" to={"/add"}>
                        Add User
                    </Link>
                    {loading ? (
                        <div>Loading Users...</div>
                    ) : (
                    <ul className="list-group">
                        {users &&
                            users.map((user: IUser, index: number) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveUser(user, index)}
                                    key={index}
                                >
                                    {user.first_name} {user.last_name}
                                    <button className="btn btn-danger float-right" onClick={() => this.delete(user.id!)}>X</button>
                                </li>
                            ))}
                    </ul>
                    )}
                </div>
                <div className="col-md-6">
                    {currentUser ? (
                        <div>
                            <h4>User</h4>
                            <div>
                                <label>
                                    <strong>First Name:</strong>
                                </label>{" "}
                                {currentUser.first_name}
                            </div>
                            <div>
                                <label>
                                    <strong>Last Name:</strong>
                                </label>{" "}
                                {currentUser.last_name}
                            </div>
                            <div>
                                <label>
                                    <strong>Address:</strong>
                                </label>{" "}
                                {currentUser.address}
                            </div>
                            <div>
                                <label>
                                    <strong>Phone Number:</strong>
                                </label>{" "}
                                {currentUser.phone_number}
                            </div>
                            <UserHobbies user_id={currentUser.id!}></UserHobbies>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a User...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

}