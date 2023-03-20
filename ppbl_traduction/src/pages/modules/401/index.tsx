import Sidebar from "@/src/components/ui/Text/Sidebar";
import React from "react";
import Head from "next/head";

import { items } from "@/src/data/modules/401";

const Module401 = () => {
  return (
    <>
    <Head>
      <title>PPBL Module 401</title>
    </Head>
    <div>
      <Sidebar items={items} modulePath="/modules/401" selected={0} />
    </div>
    </>
  );
};

export default Module401;
