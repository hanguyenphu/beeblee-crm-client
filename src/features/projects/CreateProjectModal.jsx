import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Modal, Button} from 'react-materialize'

import ProjectForm from './ProjectForm'

function mapStateToProps(state) {
    return {

    };
}

class CreateProjectModal extends Component {
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
              header="Create a new project"
              id="modal-1"
              open={true}
              options={{
                dismissible: true,
                endingTop: "10%",
                inDuration: 250,
                onCloseEnd: this.props.closeCreateProjectModal,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                opacity: 0.5,
                outDuration: 250,
                preventScrolling: true,
                startingTop: "4%"
              }}
            >
              <ProjectForm business={this.props.business} getBusinessData={this.props.getBusinessData} closeCreateProjectModal={this.props.closeCreateProjectModal}/>
            </Modal>
          </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(CreateProjectModal);