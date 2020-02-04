import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-materialize";
import CategoryForm from "./CategoryForm";

function mapStateToProps(state) {
  return {};
}

class CategoryModal extends Component {
  render() {
    const {category} = this.props || {}

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
          header="Category"
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
           <CategoryForm category={category} updateData={this.props.updateData}/>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CategoryModal);
