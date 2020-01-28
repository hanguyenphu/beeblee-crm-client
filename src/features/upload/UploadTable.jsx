import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Table, Icon } from "react-materialize";
import Loading from "../loading/Loading";
function mapStateToProps(state) {
  return {};
}

class UploadTable extends Component {
  state = {
    uploads: []
  };
  componentDidMount() {
    if (this.props.uploads) {
      this.setState({
        uploads: this.props.uploads
      });
    }
  }

  componentWillReceiveProps(nextProps ){
    if(nextProps.uploads.length !== this.props.uploads){
      this.setState({
        uploads: nextProps.uploads
      })
    }
  }


  render() {
    const { uploads } = this.state;
    return (
      <div>
        <Row>
          <Table striped={true} responsive={true}>
            <thead>
              <tr>
                <th data-field="id">Title</th>
                <th data-field="name">Description</th>
                <th data-field="price">Review</th>
                <th data-field="price">Download</th>

              </tr>
            </thead>
            <tbody>
              {uploads.map(upload => {
                return (
                  <tr key={upload._id}>
                    <td>{upload.title}</td>
                    <td>{upload.description}</td>
                    <td><img src={upload.url} style={{height: "100px"}} /></td>
                    <td>
                      <a href={upload.url}>
                        <Icon>cloud_download</Icon>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UploadTable);
