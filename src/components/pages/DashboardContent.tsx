import StatsCards from "@/components/StatsCards";
import CustomerTable from "@/components/CustomerTable";
import BillingCards from "@/components/BillingCards";
import NetworkHealth from "@/components/NetworkHealth";
import AlertsCard from "@/components/AlertsCard";
import TechnicianCard from "@/components/TechnicianCard";

export default function DashboardContent() {
  return (
    <>
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CustomerTable />
          <BillingCards />
        </div>
        <div className="space-y-6">
          <NetworkHealth />
          <AlertsCard />
          <TechnicianCard />
        </div>
      </div>
    </>
  );
}

