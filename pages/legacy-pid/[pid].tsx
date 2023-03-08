import { ApiSearchResponse } from "@/types/api/response";
import { DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { apiPostRequest } from "@/lib/dc-api";

const LegacyPid = () => null;

interface Params extends ParsedUrlQuery {
  pid: string;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { pid } = params as Params;
  const response = await apiPostRequest<ApiSearchResponse>({
    body: {
      _source: ["id"],
      query: {
        bool: {
          must: [
            {
              match: {
                legacy_identifier: pid,
              },
            },
          ],
        },
      },
      size: 1,
    },
    url: DC_API_SEARCH_URL,
  });

  if (!response?.data.length)
    return {
      notFound: true,
    };

  return {
    redirect: {
      destination: `/items/${response.data[0].id}`,
      permanent: true,
    },
  };
};

export default LegacyPid;
