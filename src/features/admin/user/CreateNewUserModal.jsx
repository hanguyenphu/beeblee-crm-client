import React, { Component } from "react";
import { connect } from "react-redux";
import {Modal, Button} from "react-materialize"
import UserForm from "./UserForm";
function mapStateToProps(state) {
  return {};
}

class CreateNewUserModal extends Component {

  render() {
    return (
      <div>
        <Modal
          actions={[
            <Button flat modal="close" node="button" waves="green">
              Close
            </Button>
          ]}
          bottomSheet={false}
          fixedFooter
          header="Create New User"
          id="modal-0"
          open={true}
          options={{
            dismissible: true,
            endingTop: "10%",
            inDuration: 250,
            onCloseEnd:  this.props.closeCreateModal,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: "4%"
          }}
        >
       <UserForm updateData={this.props.updateData} user={this.props.user}/>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CreateNewUserModal);
