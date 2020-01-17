import React, { Component } from "react";
import { connect } from "react-redux";
import { Select } from "react-materialize";
function mapStateToProps(state) {
  return {
    provinces: state.provinces
  };
}

class ProvinceDropdown extends Component {
  render() {
    const { provinces, province } = this.props;
    return (
      <Select
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
        value={province}
        name="province"
        onChange={this.props.handleChange}

      >
        <option disabled value="">
          Select Province
        </option>
        {provinces.map(province => {
          return (
            <option
              className="black-text"
              key={province._id}
              value={province._id}
            >
              {province.name}
            </option>
          );
        })}
      </Select>
    );
  }
}

export default connect(mapStateToProps)(ProvinceDropdown);
