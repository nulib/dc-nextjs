import Container from "@/components/Shared/Container";
import Layout from "components/layout";
import { NextPage } from "next";
import { PlaceholderBlock } from "@/components/Shared/PlaceholderBlock.styled";
import React from "react";

const ContactPage: NextPage = () => {
  return (
    <Layout>
      <Container>
        <PlaceholderBlock>Contact page</PlaceholderBlock>
      </Container>
    </Layout>
  );
};

export default ContactPage;
