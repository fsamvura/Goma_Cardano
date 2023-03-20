import Sidebar from "@/src/components/ui/Text/Sidebar";
import React from "react";
import AboutSLTs from "@/src/components/course-details/About-SLTs";
import Governance from "@/src/components/course-details/Governance";
import ListOfModules from "@/src/components/course-details/List-of-modules";
import PBLFramework from "@/src/components/course-details/PBL-framework";
import Head from "next/head";

import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

import { Divider, Grid, GridItem, Text } from "@chakra-ui/react";

import { items } from "@/src/data/get-started";

const selected = 0;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { details: items[0].slug } },
      { params: { details: items[1].slug } },
      { params: { details: items[2].slug } },
      { params: { details: items[3].slug } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { items },
  };
};

type Props = {
  items: any;
};

const GetStarted: React.FC<Props> = ({ items }) => {
  const router = useRouter();
  const details = router.query.details as string;

  const itemIndex = items.findIndex((item: any) => item.slug === details)

  return (
    <>
      <Head>
        <title>PPBL</title>
      </Head>
      <Grid templateColumns="repeat(6, 1fr)">
        <Sidebar items={items} modulePath="/get-started" selected={itemIndex} />
        <GridItem colSpan={5}>
           {details == "framework" && <PBLFramework />}
           {details == "slts" && <AboutSLTs />}
           {details == "modules" && <ListOfModules />}
           {details == "governance" && <Governance />}
        <Divider my="2em" />
        </GridItem>
      </Grid>
    </>
  );
};

export default GetStarted;
