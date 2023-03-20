import Sidebar from "@/src/components/ui/Text/Sidebar";
import React from "react";
import Head from "next/head";

import { items } from "@/src/data/modules/203";

const Module203 = () => {
  return (
    <>
    <Head>
      <title>PPBL Module 203</title>
    </Head>
    <div>
      <Sidebar items={items} modulePath="/modules/203" selected={0} />
    </div>
    </>
  );
};

export default Module203;
