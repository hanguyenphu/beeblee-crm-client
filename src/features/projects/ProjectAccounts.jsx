import React, { Component } from "react";
import { connect } from "react-redux";
import {Row} from "react-materialize"
import AccountForm from "../account/AccountForm"
import CreateAccountModal from "../account/CreateAccountModal";

function mapStateToProps(state) {
  return {};
}

class ProjectAccounts extends Component {

  render() {
    const {accounts} = this.props
    return (
      <div>
         <CreateAccountModal projectId={this.props.projectId} getProjectDetail={this.props.getProjectDetail}/>
          {accounts.map(account => {
            return <AccountForm account={account} key={account._id}/>
          })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProjectAccounts);
