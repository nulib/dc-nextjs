import { useEffect, useState } from "react";

import Container from "@/components/Shared/Container";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Heading from "@/components/Heading/Heading";
import SearchPrototype from "@/components/SearchPrototype";
import axios from "axios";
import { styled } from "@/stitches.config";

export type ChatConfig = {
  auth: string,
  endpoint: string
}

const HomePage: React.FC = () => {
  const [chatConfig, setChatConfig] = useState<ChatConfig>();

  useEffect(() => {
    axios({
      method: "get",
      url: `${DCAPI_ENDPOINT}/chat-endpoint`,
      withCredentials: true,
    }).then((response) => {
      // console.log(response.data);
      setChatConfig(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, [])

  return (
    <StyledHomePage>
      <Container>
        <Heading as="h1">Chat Search Prototype</Heading>
        {chatConfig && 
          (<SearchPrototypeWrapper>
            <SearchPrototype chatConfig={chatConfig} />
          </SearchPrototypeWrapper>)
        }     
      </Container>
    </StyledHomePage>
  );
};

/* eslint sort-keys: 0 */

const StyledHomePage = styled("div", {
  color: "$black80",
  fontFamily: "$northwesternSansRegular",
  fontSize: "$gr3",

  h1: {
    marginBottom: "$gr5 !important",

    "&::before": {
      backgroundColor: "$brightBlueB !important",
    },
  },
});

const SearchPrototypeWrapper = styled("div", {
  margin: "$gr4 -$gr4",
  padding: "$gr4",
});

export default HomePage;