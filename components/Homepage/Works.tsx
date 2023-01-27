import { useEffect, useState } from "react";
import { ApiSearchRequestBody } from "@/types/api/request";
import { ApiSearchResponse } from "@/types/api/response";
import Container from "@/components/Shared/Container";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import Grid from "@/components/Grid/Grid";
import { HomepageWorksStyled } from "./Works.styled";
import SectionHeading from "../Shared/SectionHeading";
import { apiPostRequest } from "@/lib/dc-api";
import { querySearchTemplate } from "@/lib/queries/search";

type RequestState = {
  data: ApiSearchResponse | null;
  error: string | null;
  loading: boolean;
};

const HomepageWorks = () => {
  const [requestState, setRequestState] = useState<RequestState>({
    data: null,
    error: "",
    loading: true,
  });

  useEffect(() => {
    const size = 25;

    (async () => {
      try {
        const body = {
          ...querySearchTemplate,
          query: {
            function_score: {
              boost: 1,
              boost_mode: "replace",
              query: {
                match: {
                  keywords: "featured",
                },
              },
              random_score: {},
            },
          },
          size: size,
        } as ApiSearchRequestBody;

        const work = await apiPostRequest<ApiSearchResponse>({
          body,
          url: DC_API_SEARCH_URL,
        });

        setRequestState({
          data: work || null,
          error: "",
          loading: false,
        });
      } catch (err) {
        handleErrors(err);
      }
    })();
  }, []);

  /**
   * Handle any network errors
   */
  function handleErrors(err: Error | unknown) {
    let message: string;

    if (err instanceof Error) message = err.message;
    else message = String(err);
    console.error("Error getting data", message);

    setRequestState((prevState) => ({
      ...prevState,
      error: message,
      loading: false,
    }));
  }

  const { data: apiData, error, loading } = requestState;

  return (
    <HomepageWorksStyled>
      <Container containerType="default">
        <SectionHeading
          headingText="Works"
          linkHref="/search"
          linkText="Explore Further"
        />
      </Container>
      <Container containerType="wide">
        {loading && <></>}
        {error && <p>{error}</p>}
        {apiData && <Grid data={apiData?.data} info={apiData?.info} />}
      </Container>
    </HomepageWorksStyled>
  );
};

export default HomepageWorks;
