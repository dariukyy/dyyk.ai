import {
  onDomainCustomerResponses,
  onGetAllDomainBookings,
} from "@/actions/appointment";
import PortalForm from "@/components/forms/portal/portal-form";
import React from "react";

type Props = { params: { domainid: string; customerid: string } };

async function ReservationPortalPage({ params }: Props) {
  const questions = await onDomainCustomerResponses(params.customerid);
  const bookings = await onGetAllDomainBookings(params.domainid);
  console.log(questions, bookings, "DATA");
  if (!questions) return null;
  return (
    <div className="pb-10">
      <PortalForm
        bookings={bookings}
        email={questions.email!}
        domainid={params.domainid}
        customerId={params.customerid}
        questions={questions.questions}
        type="Appointment"
      />
    </div>
  );
}

export default ReservationPortalPage;
