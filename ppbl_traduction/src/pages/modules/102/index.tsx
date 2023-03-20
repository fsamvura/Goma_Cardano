import Sidebar from "@/src/components/ui/Text/Sidebar";
import React from "react";
import Head from "next/head";

import { items } from "@/src/data/modules/102";

const Module102 = () => {
  return (
    <>
    <Head>
      <title>PPBL Module 102</title>
    </Head>
    <div>
      <Sidebar items={items} modulePath="/modules/102" selected={0} />
    </div>
    </>
  );
};

export default Module102;
