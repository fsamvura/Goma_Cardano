import Sidebar from "@/src/components/ui/Text/Sidebar";
import React from "react";
import Head from "next/head";

import { items } from "@/src/data/modules/103";

const Module103 = () => {
  return (
    <>
    <Head>
      <title>PPBL Module 103</title>
    </Head>
    <div>
      <Sidebar items={items} modulePath="/modules/103" selected={0} />
    </div>
    </>
  );
};

export default Module103;
