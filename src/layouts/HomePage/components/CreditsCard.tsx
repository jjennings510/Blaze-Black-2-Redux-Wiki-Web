import { APHEX_TWITTER, DRAYANO_TWITTER, ORIGINAL_REDDIT_POST } from "../../../constants";

export const CreditsCard = () => {
  return (
    <div className="container my-3">
      <div className="card">
        <div className="card-header">Note</div>
        {/* prettier-ignore */}
        <div className="card-body">
          This is a fanmade website by someone who just enjoys Pokemon! All credit for this page
          goes to <a href={APHEX_TWITTER}>@AphexCubed</a> and <a href={DRAYANO_TWITTER}>@Drayano60</a>.
          The original reddit post can be found <a href={ORIGINAL_REDDIT_POST}>here</a>.
        </div>
      </div>
    </div>
  );
};
