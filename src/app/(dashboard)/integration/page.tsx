import { onGetPaymentConnected } from "@/actions/settings";
import InfoBar from "@/components/infobar";
import IntegrationsList from "@/components/integrations";
import { currentUser } from "@clerk/nextjs";

async function IntegrationsPage() {
  const payment = await onGetPaymentConnected();
  const user = await currentUser();

  const connections = {
    stripe: payment ? true : false,
  };
  return (
    <>
      <InfoBar />
      <IntegrationsList connections={connections} />
    </>
  );
}

export default IntegrationsPage;
