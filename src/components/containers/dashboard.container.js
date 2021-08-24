import { connect } from "react-redux";
import Dashboard from "../presentation/dashboard/dashboard.jsx";
import { getUserData} from "../../action/common.action";
import { bindActionCreators } from "redux";


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
