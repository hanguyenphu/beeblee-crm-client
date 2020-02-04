import React, { Component } from "react";
import { connect } from "react-redux";
import { Select } from "react-materialize";

function mapStateToProps(state) {
  return {};
}

class ContributorDropDown extends Component {

  render() {
    const { contributors } = this.props;
    return (
      <div>
        <Select
          onChange={this.props.handleChangeProject}
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
          value={this.props.contributor ? this.props.contributor : ""}
          name="contributor"
        >
          <option disabled value="">
            Choose Contributor
          </option>
          {contributors.map(contributor => {
            return (
              <option key={contributor._id} value={contributor._id}>
                {contributor.name}
              </option>
            );
          })}
        </Select>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ContributorDropDown);
