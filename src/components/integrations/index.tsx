"use client";
import React from "react";
import { Card, CardContent, CardDescription } from "../ui/card";
import Image from "next/image";
import { INTEGRATION_LIST_ITEMS } from "@/constants/integrations";
import IntegrationTrigger from "./IntegrationTrigger";
import { useStripe } from "@/hooks/billing/use-billing";
import { Button } from "../ui/button";
import { onGetStripeDashboardLink } from "@/actions/payments";

type Props = {
  connections: {
    stripe: boolean;
  };
};

const IntegrationsList = ({ connections }: Props) => {
  return (
    <div className="flex-1 h-0 grid grid-cols-1 content-start lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {INTEGRATION_LIST_ITEMS.map((item) => (
        <Card key={item.id}>
          <CardContent className="flex flex-col p-5 gap-2">
            <div className="flex w-full justify-between items-start gap-x-20">
              <div className="">
                <div className="w-10 h-10 relative">
                  <Image
                    className="rounded-md"
                    sizes="100vw"
                    src={`https://ucarecdn.com/${item.logo}`}
                    alt="Logo"
                    fill
                  />
                </div>
                <h2 className="font-bold capitalize">{item.name}</h2>
              </div>
              <div className="flex flex-col gap-7">
                <IntegrationTrigger
                  connections={connections}
                  title={item.title}
                  descrioption={item.modalDescription}
                  logo={item.logo}
                  name={item.name}
                />
                {connections.stripe === true && (
                  <form action={onGetStripeDashboardLink}>
                    <Button>View Dashboard</Button>
                  </form>
                )}
              </div>
            </div>
            <CardDescription>{item.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IntegrationsList;
