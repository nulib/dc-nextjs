import Container from "@/components/Container";
import Layout from "@/components/layout";
import { NextPage } from "next";
import Heading from "@/components/Heading/Heading";
import React from "react";

const SearchPage: NextPage = () => {
  return (
    <Layout>
      <Container>
        <Heading title="Search" isHidden />
      </Container>
    </Layout>
  );
};

export default SearchPage;
