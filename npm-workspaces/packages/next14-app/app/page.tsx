"use client";

import React from 'react'
import RemoteComponent from "@/lib/components/RemoteComponent";

console.log(React.version)

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>Example of import via module federation</div>
      <RemoteComponent
        url="http://localhost:3000/__federated/remoteEntry.js"
        scope="widgets"
        module="./Button"
      />
    </div>
  );
}
