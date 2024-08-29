import InfoBar from "@/components/infobar";
import BillingSettings from "@/components/settings/billing-settings";

function Settings() {
  return (
    <>
      <InfoBar />
      <div className="overflow-y-hidden w-full chat-window flex-1 h-0 flex flex-col gap-10">
        <BillingSettings />
      </div>
    </>
  );
}

export default Settings;
