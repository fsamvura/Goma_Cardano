import Sidebar from "@/src/components/ui/Text/Sidebar";
import React from "react";
import Head from "next/head";

import { items } from "@/src/data/modules/304";

const Module304 = () => {
  return (
    <>
    <Head>
      <title>PPBL Module 304</title>
    </Head>
    <div>
      <Sidebar items={items} modulePath="/modules/304" selected={0} />
    </div>
    </>
  );
};

export default Module304;
