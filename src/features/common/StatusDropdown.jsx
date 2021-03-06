import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../utils/API/API";
import { Select } from "react-materialize";
import Loading from "../loading/Loading";

function mapStateToProps(state) {
  return {};
}

class StatusDropdown extends Component {
  state = {
    loading: true,
    status: ""
  };
  componentDidMount() {
    if(this.props.status){
      this.setState({
        ...this.state,
        status: this.props.status
      })
    }
    API.get("/statuses")
      .then(response => {
        const statuses = response.data.filter(status => status.active)
        this.setState({
          ...this.state,
          statuses,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          ...this.state,
          loading: false
        });
        console.log(error);
      });
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    const { statuses }= this.state;


    return (
      <div>
        <Select
          label="Choose Status"
          s={12}
          l={6}
          m={6}
          xl={6}
          onChange={this.props.handleChangeProject}
          type="text"

          options={{
            classes: "",
            dropdownOptions: {
              alignment: "left",
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              container: null,
              coverTrigger: true,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250
            }
          }}
          value={this.props.status? this.props.status._id: ""}
          name="status"
          required={this.props.required? true: false}
        >
          <option disabled value="">
            Choose status
          </option>
          {statuses.map(status => {
            return (
              <option value={status._id} key={status._id} >
                {status.title}
              </option>
            );
          })}
        </Select>
      </div>
    );
  }
}

export default connect(mapStateToProps)(StatusDropdown);
