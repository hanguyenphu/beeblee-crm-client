import React, { Component } from 'react';
import { connect } from 'react-redux';
import API from '../../utils/API/API';
import Loading from '../loading/Loading';

function mapStateToProps(state) {
    return {

    };
}

class DisplayStatus extends Component {
    state = {
        loading: true,
        status: "",
        statuses: []
      };
    componentDidMount() {

        API.get("/statuses")
        .then(response => {
          this.setState({
            ...this.state,
            statuses: response.data,
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

    displayStatus = (statusId) => {
        let {statuses, loading} = this.state
        if(!loading){
            let status = statuses.filter(status =>  status._id === statusId)[0]
            return <p style={{color:`${status.color}`}}>
                {status.title}
            </p>
        }

    }
    render() {
        const {status, loading} = this.props
        if(loading){
            return <Loading/>
        }
        return (
            <div>
                {this.displayStatus(status)}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(DisplayStatus);