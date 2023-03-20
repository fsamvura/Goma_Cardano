import Sidebar from "@/src/components/ui/Text/Sidebar";
import React from "react";
import Head from "next/head";

import { items } from "@/src/data/modules/201";

const Module201 = () => {
  return (
    <>
    <Head>
      <title>PPBL Module 201</title>
    </Head>
    <div>
      <Sidebar items={items} modulePath="/modules/201" selected={0} />
    </div>
    </>
  );
};

export default Module201;
