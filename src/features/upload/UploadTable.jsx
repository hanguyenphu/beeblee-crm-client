import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Table, Icon } from "react-materialize";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
import UploadReview from "./UploadReview";
function mapStateToProps(state) {
  return {};
}

class UploadTable extends Component {
  state = {
    uploads: [],
    url:""
  };
  componentDidMount() {
    if (this.props.uploads) {
      this.setState({
        uploads: this.props.uploads
      });
    }
  }

  openUploadReviewModal = (url) => () => {
    this.setState({
      url
    })
  }

  closeUploadReviewModal = (e) => {
    this.setState({
      url: ""
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uploads.length !== this.props.uploads) {
      this.setState({
        uploads: nextProps.uploads
      });
    }
  }

  render() {
    const { uploads, url } = this.state;
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
                    {/* <td><img src={upload.url} style={{height: "100px"}} /></td> */}
                    <td>
                      <a href="#" onClick={this.openUploadReviewModal(upload.url)}>
                        <Icon>launch</Icon>
                      </a>
                    </td>
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

        {url&& <UploadReview url={url} closeUploadReviewModal={this.closeUploadReviewModal}/>}
      </div>
    );
  }
}

export default connect(mapStateToProps)(UploadTable);
