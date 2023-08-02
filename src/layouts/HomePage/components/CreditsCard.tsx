import { Link } from "react-router-dom";
import {
  APHEX_TWITTER,
  DRAYANO_TWITTER,
  ORIGINAL_REDDIT_POST,
} from "../../../constants";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CreditsCard = () => {
  return (
    <div className="container my-3">
      <div className="card">
        <div className="card-header">
          <FontAwesomeIcon icon={faCircleInfo} className="me-2" />
          Note
        </div>
        {/* prettier-ignore */}
        <div className="card-body">
          This is a fanmade website by someone who just enjoys Pokemon! All credit for this page goes
          to <Link to={APHEX_TWITTER} target="_blank">@AphexCubed</Link> and <Link to={DRAYANO_TWITTER} target="_blank">@Drayano60</Link>.
          The original reddit post can be found <Link to={ORIGINAL_REDDIT_POST} target="_blank">here</Link>.
        </div>
      </div>
    </div>
  );
};
