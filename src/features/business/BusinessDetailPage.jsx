import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../utils/API/API";
import Loading from "../loading/Loading";
import { Row } from "react-materialize";
import BusinessForm from "./BusinessForm";
import { Redirect, Link } from "react-router-dom";
import Icon from "react-materialize/lib/Icon";
function mapStateToProps(state, ownProps) {
  const businessId = ownProps.match.params.id;
  let business = {};

  if(!state.businesses){
       ownProps.history.push('/businesses')
       return {

       }
  }

  if (businessId && state.businesses.length > 0) {
    business = state.businesses.filter(
      business => business._id === businessId
    )[0];
  }

  return {
    business
  };
}

class BusinessDetailPage extends Component {
  state = {
    loading: true,
    errorMessage: "",
    business: {}
  };


  updateData = () => {

  }
  componentDidMount() {
    if (this.props.business) {
      this.setState({
        business: this.props.business,
        loading: false,
        errorMessage: ""
      });
    }

    // const businessId = this.props.match.params.id;
    // API.get(`businesses/${businessId}`)
    //   .then(response => {
    //     this.setState({
    //       ...this.state,
    //       business: response.data.business,
    //       loading: false,
    //       errorMessage: ""
    //     });
    //   })
    //   .catch(error => {
    //     this.setState({
    //       business: {},
    //       loading: false,
    //       errorMessage: "Cannot fetch the business"
    //     });
    //   });
  }
  render() {
    const { business, errorMessage, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        <Row style={{ marginTop: "20px",  }}>
            <Link to="/businesses" style={{display: "inline-flex", verticalAlign: "middle"}} ><Icon >arrow_back</Icon> Back </Link>
        </Row>
        <Row>
          <h5>{business.name}</h5>
        </Row>
        <Row
          className=" radius-corner"
          style={{
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "1px 1px 1px #9E9E9E"
          }}
        >
          <BusinessForm business={business} updateData={this.updateData}/>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(BusinessDetailPage);
