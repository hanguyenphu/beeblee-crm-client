import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Collapsible, CollapsibleItem, Icon } from "react-materialize";
import AccountForm from "../account/AccountForm";
import CreateAccountModal from "../account/CreateAccountModal";

function mapStateToProps(state) {
  return {};
}

class ProjectAccounts extends Component {
  render() {
    const { accounts } = this.props;
    return (
      <div>
        <CreateAccountModal
          projectId={this.props.projectId}
          getProjectDetail={this.props.getProjectDetail}
        />
        {accounts.length > 0 &&
        <Collapsible accordion>
          {accounts.map(account => {
            return (
              <CollapsibleItem
                expanded={false}
                header={account.domain}
                icon={<Icon>vpn_key</Icon>}
                node="div"
                key={account._id}
              >
                <AccountForm account={account}/>
              </CollapsibleItem>
            );
          })}
        </Collapsible>}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProjectAccounts);
