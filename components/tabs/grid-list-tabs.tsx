import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function GridListTabs() {
  return (
    <Tabs defaultValue="account" className="ml-auto">
      <TabsList>
        <TabsTrigger value="grid">Grid</TabsTrigger>
        <TabsTrigger value="list">List</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
