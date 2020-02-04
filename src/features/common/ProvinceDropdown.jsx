import React, { Component } from "react";
import { connect } from "react-redux";
import { Select } from "react-materialize";
import API from "../../utils/API/API";
import Loading from "../loading/Loading";
function mapStateToProps(state) {
  return {
    provinces: state.provinces
  };
}

// Display province drop down, with a props called handleChange
class ProvinceDropdown extends Component {
  state = {
    provinces: [],
    province: ""
  };
  componentDidMount() {
    API.get("/provinces")
      .then(response => {
        //if province is from props, check if it is the id or province object
        const province = this.props.province._id || this.props.province
        const provinces = response.data.filter(province => province.active)
        this.setState({
          provinces,
          province
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { provinces, province } = this.state;
    if (!provinces) {
      return <Loading />;
    }
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
