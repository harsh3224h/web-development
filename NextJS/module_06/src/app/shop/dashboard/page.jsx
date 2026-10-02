"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const page = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "analytics";

  return (
    <div>
      <h1 className="font-bold text-2xl mt-4">Dashboard</h1>
      <div className="flex gap-4 mb-6">
        <Link
          href="/shop/dashboard?tab=analytics"
          className={tab == "analytics" ? "font-bold underline" : ""}
        >
          Analytics
        </Link>

        <Link
          href="/shop/dashboard?tab=sales"
          className={tab == "sales" ? "font-bold underline" : ""}
        >
          Sales
        </Link>

        <Link
          href="/shop/dashboard?tab=monitoring"
          className={tab == "monitoring" ? "font-bold underline" : ""}
        >
          Monitoring
        </Link>
      </div>
      {tab == "analytics" ? <p>Analyze the insights!</p> : null}
      {tab == "sales" ? <p>Sales are getting better!</p> : null}
      {tab == "monitoring" ? <p>Monitoring becomes more easy!</p> : null}
    </div>
  );
};

export default page;
