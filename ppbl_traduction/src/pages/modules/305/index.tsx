import Sidebar from "@/src/components/ui/Text/Sidebar";
import React from "react";
import Head from "next/head";

import { items } from "@/src/data/modules/305";

const Module305 = () => {
  return (
    <>
    <Head>
      <title>PPBL Module 305</title>
    </Head>
    <div>
      <Sidebar items={items} modulePath="/modules/305" selected={0} />
    </div>
    </>
  );
};

export default Module305;
