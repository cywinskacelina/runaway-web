import React from "react";
import axios from "axios";
import Volunteer from "./volunteer";
import NavBar from "../NavBar/NavBar";

class Admin extends React.Component {
  state = {
    search: "",
    volunteers: [],
  };

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .get(
        `https://runaway-practicum.herokuapp.com/api/volunteer?search=${encodeURIComponent(
          this.state.search
        )}`
      )
      .then((response) => {
        const volunteers = response.data.map((v) => ({
          ...v,
          edit: false,
          newEmail: v.email,
        }));
        this.setState({ volunteers });
      });
  }

  // Delete volunteer from database
  handleDelete = (id) => {
    axios
      .delete(`https://runaway-practicum.herokuapp.com/api/volunteer/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const volunteers = this.state.volunteers.filter((v) => v._id !== id);
          this.setState({ volunteers });
        }
      });
  };

  handleEmailChange = (e, volunteer) => {
    const volunteers = [...this.state.volunteers];
    const index = volunteers.indexOf(volunteer);
    volunteers[index] = { ...volunteer };
    volunteers[index].newEmail = e.target.value;
    this.setState({ volunteers });
  };

  handleEdit = (volunteer) => {
    const volunteers = [...this.state.volunteers];
    const index = volunteers.indexOf(volunteer);
    volunteers[index] = { ...volunteer };
    volunteers[index].newEmail = volunteers[index].email;
    volunteers[index].edit = !volunteers[index].edit;
    this.setState({ volunteers });
  };

  handleUpdate = (volunteer) => {
    axios
      .patch(`https://runaway-practicum.herokuapp.com/api/volunteer/${volunteer._id}`, {
        email: volunteer.newEmail,
      })
      .then((response) => {
        if (response.status === 200) {
          volunteer.email = volunteer.newEmail;
          this.handleEdit(volunteer);
        }
      });
  };

  render() {
    return (
      <div>
        <NavBar pages={[]}/>
        <div style={{ marginTop: "100px", marginLeft: "150px" }}>
        <form  onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="search"
            name="search"
            value={this.state.search}
            onChange={(e) => this.handleChange(e)}
            placeholder="Volunteer Email"
            style={{ borderRadius: "5px" }}
          />
          <input type="submit" value="Search" style={{ background: "#ACDAFF", borderRadius: "5px" }}/>
        </form>
        <br></br>
        {this.state.volunteers.map((volunteer) => (
          <Volunteer
            key={volunteer._id}
            volunteer={volunteer}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
            onUpdate={this.handleUpdate}
            onEmailChange={this.handleEmailChange}
          />
        ))}
        </div>
      </div>
    );
  }
}

export default Admin;
