import Sidebar from "@/src/components/ui/Text/Sidebar";
import React from "react";
import Head from "next/head";

import { items } from "@/src/data/modules/205";

const Module205 = () => {
  return (
    <>
    <Head>
      <title>PPBL Module 205</title>
    </Head>
    <div>
      <Sidebar items={items} modulePath="/modules/205" selected={0} />
    </div>
    </>
  );
};

export default Module205;
