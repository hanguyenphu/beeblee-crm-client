import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-materialize";
import ProvinceForm from "./ProvinceForm";
function mapStateToProps(state) {
  return {};
}

class ProvinceModal extends Component {
  render() {
    const {province} = this.props || {}
    return (
      <div>
        <Modal
          actions={[
            <Button flat modal="close" node="button" waves="green">
              Close
            </Button>
          ]}
          bottomSheet={false}
          //   fixedFooter
          header="Province"
          id="modal-0"
          open={true}
          options={{
            dismissible: true,
            endingTop: "10%",
            inDuration: 250,
            onCloseEnd: this.props.closeModal,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: "4%"
          }}
        >
          <ProvinceForm province={province} updateData={this.props.updateData} />
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProvinceModal);
