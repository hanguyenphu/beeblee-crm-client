import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Icon } from "react-materialize";
import AccountForm from "./AccountForm";
function mapStateToProps(state) {
  return {};
}

class CreateAccountModal extends Component {
  render() {
    const account = {
      domain: "",
      username: "",
      password: "",
      startDate: "",
      expireDate: "",
      price: "",
      description: "",
      project: this.props.projectId
    };
    return (
      <div>
        <Modal
          actions={[
            <Button flat modal="close" node="button" waves="green">
              Close
            </Button>
          ]}
          bottomSheet={false}
          // fixedFooter={true}
          header="Add An Account"
          id="modal-0"
          options={{
            dismissible: true,
            endingTop: "10%",
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: "4%"
          }}
          trigger={
            <Button node="button" className="gradient-btn btn-red">
              <Icon>add_box</Icon>
            </Button>
          }
        >
          <AccountForm account={account} getProjectDetail={this.props.getProjectDetail}/>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CreateAccountModal);
