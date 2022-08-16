import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddUser from "./components/add-user.component";
import UserList from "./components/user-list.component";
class App extends Component {
  render() {
    return (
      <div>
        <div className="container mt-3">
          <h1>Hobbies App</h1>
          <Routes>
            <Route path="/" element={<UserList/>} />
            <Route path="/add" element={<AddUser/>} />
          </Routes>
        </div>
      </div>
    );
  }
}
export default App;