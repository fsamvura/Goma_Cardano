import Sidebar from "@/src/components/ui/Text/Sidebar";
import React from "react";
import Head from "next/head";

import { items } from "@/src/data/modules/202";

const Module202 = () => {
  return (
    <>
    <Head>
      <title>PPBL Module 202</title>
    </Head>
    <div>
      <Sidebar items={items} modulePath="/modules/202" selected={0} />
    </div>
    </>
  );
};

export default Module202;
