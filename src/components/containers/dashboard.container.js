import { connect } from "react-redux";
import Dashboard from "../presentation/dashboard/dashboard.jsx";
import { getUserData } from "../../action/common.action";
import { bindActionCreators } from "redux";

// to connect redux state and action to props of react component
const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

const mapDispatchToProps = (
  dispatch
) => ({
  getUserData: bindActionCreators(getUserData, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
