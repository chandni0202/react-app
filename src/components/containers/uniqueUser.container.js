import { connect } from "react-redux";
import UserDetails from "../presentation/UniqueUser/uniqueUserDetails.jsx";
import { getUniqueUserData} from "../../action/common.action";
import { bindActionCreators } from "redux";


const mapStateToProps = (state) => {
  return {
    uniqueData: state,
  };
};

const mapDispatchToProps = (
  dispatch
) => ({
    getUniqueUserData: bindActionCreators(getUniqueUserData, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetails);
