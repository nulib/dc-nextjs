import aggregationsStyles from "@/components/Chat/Response/Aggregations.module.css";
import responseStyles from "@/components/Chat/Response/Response.module.css";
import interstitialStyles from "@/components/Chat/Response/Interstitial.module.css";
import { AggregationResultMessage } from "@/types/components/chat";
import { IconSparkles } from "@/components/Shared/SVG/Icons";
import React from "react";
interface ResponseInterstitialProps {
  message: AggregationResultMessage["message"];
}
const ResponseAggregations: React.FC<ResponseInterstitialProps> = ({
  message,
}) => {
  const { buckets } = message;
  return (
    <div>
      <div
        data-testid="response-aggregations"
        className={interstitialStyles.styledInterstitial}
      >
        <div className={interstitialStyles.styledInterstitialIcon}>
          <IconSparkles />
        </div>
        Aggregation Results
      </div>
      <div
        className={[
          responseStyles.styledResponseMarkdown,
          aggregationsStyles.styledAggregations,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <table>
          <tbody>
            {buckets.map((bucket) => (
              <tr
                key={bucket.key}
                data-key={bucket.key}
                data-count={bucket.doc_count}
              >
                <td>{bucket.key}</td>
                <td>{bucket.doc_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ResponseAggregations;
