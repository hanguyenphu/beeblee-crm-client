import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-materialize";
import API from "../../../utils/API/API";
import Loading from "../../loading/Loading";
import ContributorForm from "./ContributorForm";
function mapStateToProps(state) {
  return {};
}

class EditContributorsModal extends Component {
  state = {
    users: [],
    contributors: []
  };
  componentDidMount() {

    this.getUsers();
  }

  getContributors = users => {
    const { project } = this.props;
    const contributors = users.filter(user =>
      project.contributors.includes(user._id)
    );
    return contributors;
  };

  getUsers = () => {
    API.get(`/admin/users`)
      .then(response => {
          const users = response.data
          const { project } = this.props;
          const contributors = users.filter(user =>
            project.contributors.includes(user._id)
          );
        this.setState({
          users,
          contributors,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          loading: true
        });
        this.props.history.push("/notfound");
      });
  };
  render() {
    const { project } = this.props;
    const { users, loading, contributors } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <Modal
          actions={[
            <Button flat modal="close" node="button" waves="green">
              Close
            </Button>
          ]}
          bottomSheet={false}
          fixedFooter={true}
          header="Edit Contributors"
          id="modal-0"
          open={true}
          options={{
            dismissible: true,
            endingTop: "10%",
            inDuration: 250,
            onCloseEnd: this.props.closeEditContributorsModal,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: "4%"
          }}
        >
          {contributors && <ContributorForm contributors={contributors} users={users} project={project} updateData={this.props.updateData}/>}
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(EditContributorsModal);
