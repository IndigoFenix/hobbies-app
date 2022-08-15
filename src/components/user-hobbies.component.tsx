import { Component, ChangeEvent, ComponentState, useEffect } from "react";
import HobbyService from "../services/hobby.service";
import IHobby from '../types/hobby.type';
type Props = {
    user_id: number
};
type State = {
    hobbies: Array<IHobby>,
    new_hobby: string,
    adding: boolean,
    submitted: boolean,
    loading: boolean,
};
export default class UserHobbies extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.save = this.save.bind(this);
        this.reset = this.reset.bind(this);
        this.state = {
            hobbies: [],
            new_hobby: "",
            adding: false,
            submitted: false,
            loading: true
        };
    }
    componentDidMount() {
        this.getHobbies();
    }
    componentDidUpdate(prevProps: Props) {
        if (prevProps.user_id !== this.props.user_id) {
            this.setState({loading: true})
            this.reset();
            this.getHobbies();
        }
    }
    getHobbies() {
        HobbyService.getAllOfUser(this.props.user_id)
            .then((response: any) => {
                this.setState({
                    hobbies: response.data,
                    loading: false
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    onChangeValue(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            [e.target.name]: e.target.value
        } as ComponentState);
    }
    delete(id: number) {
        this.setState(prevState => ({
            hobbies: prevState.hobbies.filter(i => i.id !== id)
        }));
        HobbyService.delete(id)
            .then((response: any) => {
                console.log(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    save() {
        this.setState({submitted: true});
        const data: IHobby = {
            user_id: this.props.user_id,
            hobby: this.state.new_hobby,
        };
        HobbyService.create(data)
            .then((response: any) => {
                this.setState(prevState => ({
                    hobbies: [
                        ...prevState.hobbies,
                        response.data
                    ]
                }))
                this.reset();
                console.log(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    reset() {
        this.setState({
            new_hobby: "",
            submitted: false,
            adding: false
        });
    }
    render() {
        const { adding, submitted, loading, new_hobby, hobbies } = this.state;
        return (
            <div>
                {loading ? (
                    <div>
                        Loading Hobbies...
                    </div>
                ) : (
                    <div>
                        <ul className="list-group">
                            {hobbies &&
                                hobbies.map((hobby: IHobby, index: number) => (
                                    <li className="list-group-item">
                                        <span>{hobby.hobby}</span>
                                        <button className="btn btn-danger float-right" onClick={() => this.delete(hobby.id!)}>X</button>
                                    </li>
                                ))}
                        </ul>
                        {adding ? (
                            <div className="submit-form">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="new_hobby"
                                        required
                                        disabled={submitted}
                                        value={new_hobby}
                                        onChange={this.onChangeValue}
                                        name="new_hobby"
                                    />
                                </div>
                                <button className="btn" onClick={() => {this.setState({adding: false})}}>
                                    Cancel
                                </button>
                                <button onClick={this.save} className="btn btn-success">
                                    Submit
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button className="btn btn-success" onClick={() => {this.setState({adding: true})}}>
                                    Add Hobby
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
