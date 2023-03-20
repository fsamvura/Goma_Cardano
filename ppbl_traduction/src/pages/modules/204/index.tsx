import Sidebar from "@/src/components/ui/Text/Sidebar";
import React from "react";
import Head from "next/head";

import { items } from "@/src/data/modules/204";

const Module204 = () => {
  return (
    <>
    <Head>
      <title>PPBL Module 204</title>
    </Head>
    <div>
      <Sidebar items={items} modulePath="/modules/204" selected={0} />
    </div>
    </>
  );
};

export default Module204;
