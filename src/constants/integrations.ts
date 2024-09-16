type IntegrationsListItemProps = {
  id: string;
  name: "stripe";
  logo: string;
  description: string;
  title: string;
  modalDescription: string;
};

export const INTEGRATION_LIST_ITEMS: IntegrationsListItemProps[] = [
  {
    id: "1",
    name: "stripe",
    description:
      "Stripe is the fastest and easiest way to integrate payments and financial services into your software platform or marketplace.",
    logo: "b9e2cf97-aeec-47ef-bbc6-ef7b7fe6503b/icon.webp",
    title: "Connect Stripe Account",
    modalDescription:
      "The world’s most successful platforms and marketplaces including Shopify and DoorDash, use Stripe Connect.",
  },
];
