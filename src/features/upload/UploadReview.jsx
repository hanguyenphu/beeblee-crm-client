import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Icon } from "react-materialize";
function mapStateToProps(state) {
  return {};
}

class UploadReview extends Component {
  render() {
    const { url } = this.props;
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
          header="Upload File"
          id="modal-0"
          open={true}
          options={{
            dismissible: true,
            endingTop: "10%",
            inDuration: 250,
            onCloseEnd: this.props.closeUploadReviewModal,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: "4%"
          }}
        >
          <img src={url} style={{ height: "100%", width: "100%" }} />
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UploadReview);
