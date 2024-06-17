"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { loanFinalize } from "@/app/actions/loan.actions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoanFinalizeForm({ id }: { id: number | string }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function returnBook() {
    setLoading(true);

    return loanFinalize(id)
      .then(() => router.replace(`/loans/${id}`))
      .catch(() => alert("Please try again later"))
      .finally(() => setLoading(false));
  }

  return (
    <Button onClick={returnBook} disabled={loading}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Return
    </Button>
  );
}
