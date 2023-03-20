import Sidebar from "@/src/components/ui/Text/Sidebar";
import React from "react";
import Head from "next/head";

import { items } from "@/src/data/modules/302";

const Module302 = () => {
  return (
    <>
    <Head>
      <title>PPBL Module 302</title>
    </Head>
    <div>
      <Sidebar items={items} modulePath="/modules/302" selected={0} />
    </div>
    </>
  );
};

export default Module302;
