import { Component, ChangeEvent, ComponentState } from "react";
import UserService from "../services/user.service";
import IUser from '../types/user.type';
import { Link } from "react-router-dom";
type Props = {};
type State = IUser & {
  submitted: boolean
};
export default class AddTutorial extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.save = this.save.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      id: null,
      first_name: "",
      last_name: "",
      address: "",
      phone_number: "",
      submitted: false
    };
  }
  onChangeValue(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      [e.target.name]: e.target.value
    } as ComponentState);
  }
  save() {
    const data: IUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      address: this.state.address,
      phone_number: this.state.phone_number,
    };
    UserService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          address: response.data.address,
          phone_number: response.data.phone_number,
          submitted: true
        });
        console.log(response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  reset() {
    this.setState({
      id: null,
      first_name: "",
      last_name: "",
      address: "",
      phone_number: "",
      submitted: false
    });
  }
  render() {
    const { submitted, first_name, last_name, address, phone_number } = this.state;
    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>User added!</h4>
            <Link className="btn" to={"/"}>
              Back to list
            </Link>
            <button className="btn btn-success" onClick={this.reset}>
              Add another
            </button>
          </div>
        ) : (
          <div>
            <h4>Add New User</h4>
            <div className="mb-2">
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  required
                  value={first_name}
                  onChange={this.onChangeValue}
                  name="first_name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  required
                  value={last_name}
                  onChange={this.onChangeValue}
                  name="last_name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  required
                  value={address}
                  onChange={this.onChangeValue}
                  name="address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone_number">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone_number"
                  required
                  value={phone_number}
                  onChange={this.onChangeValue}
                  name="phone_number"
                />
              </div>
            </div>
            <Link className="btn me-2" to={"/"}>
              Back
            </Link>
            <button onClick={this.save} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
