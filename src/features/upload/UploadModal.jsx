import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Icon } from "react-materialize";
import UploadForm from "./UploadForm";
function mapStateToProps(state) {
  return {};
}

class UploadModal extends Component {
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
          fixedFooter={false}
          header="Modal Header"
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
          <UploadForm projectId={this.props.projectId} getProjectDetail={this.props.getProjectDetail}/>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UploadModal);
