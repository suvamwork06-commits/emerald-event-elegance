import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { getEnquiries, updateEnquiry } from "@/lib/enquiries.functions";
import { LuxeButton } from "@/components/luxe/LuxeButton";
import { ArrowLeft, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/lib/content";

const enquiriesQueryOptions = queryOptions({
  queryKey: ["enquiries"],
  queryFn: () => getEnquiries(),
});

export const Route = createFileRoute("/_authenticated/admin/enquiries")({
  component: EnquiriesPage,
  loader: ({ context }) => context.queryClient.ensureQueryData(enquiriesQueryOptions),
  head: () => ({
    meta: [
      { title: "Enquiries Admin — Maison Aurelle" },
      { name: "description", content: "Manage consultation enquiries for Maison Aurelle." },
    ],
  }),
});

const statusOptions = ["new", "contacted", "qualified", "booked", "archived"] as const;

function EnquiriesPage() {
  const { data: enquiries } = useSuspenseQuery(enquiriesQueryOptions);
  const updateStatus = useServerFn(updateEnquiry);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, status: (typeof statusOptions)[number]) => {
    setUpdatingId(id);
    try {
      await updateStatus({ data: { id, status } });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="grain min-h-svh px-6 py-24 pt-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Concierge Admin</p>
            <h1 className="mt-4 text-4xl text-ivory">Enquiries</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-sans text-[0.7rem] tracking-[0.26em] text-muted-foreground uppercase transition-colors hover:text-ivory"
            >
              <ArrowLeft className="size-4" />
              Back to site
            </Link>
            <button
              onClick={() => supabase.auth.signOut()}
              className="inline-flex items-center gap-2 font-sans text-[0.7rem] tracking-[0.26em] text-muted-foreground uppercase transition-colors hover:text-destructive"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </div>
        </div>

        {enquiries.length === 0 ? (
          <div className="clay-card rounded-2xl p-12 text-center">
            <p className="text-muted-foreground">No enquiries yet.</p>
            <p className="mt-2 text-sm text-muted-foreground/70">
              Submissions from the consultation form will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="px-5 py-4 font-sans text-[0.65rem] tracking-[0.26em] text-muted-foreground uppercase">
                      Name
                    </th>
                    <th className="px-5 py-4 font-sans text-[0.65rem] tracking-[0.26em] text-muted-foreground uppercase">
                      Contact
                    </th>
                    <th className="px-5 py-4 font-sans text-[0.65rem] tracking-[0.26em] text-muted-foreground uppercase">
                      Event
                    </th>
                    <th className="px-5 py-4 font-sans text-[0.65rem] tracking-[0.26em] text-muted-foreground uppercase">
                      Date / Guests
                    </th>
                    <th className="px-5 py-4 font-sans text-[0.65rem] tracking-[0.26em] text-muted-foreground uppercase">
                      Budget
                    </th>
                    <th className="px-5 py-4 font-sans text-[0.65rem] tracking-[0.26em] text-muted-foreground uppercase">
                      Status
                    </th>
                    <th className="px-5 py-4 font-sans text-[0.65rem] tracking-[0.26em] text-muted-foreground uppercase">
                      Received
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="border-b border-border/60 transition-colors hover:bg-surface/40">
                      <td className="px-5 py-4 align-top">
                        <p className="text-sm font-medium text-ivory">{enquiry.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{enquiry.city}</p>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <p className="text-sm text-ivory">{enquiry.email}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{enquiry.phone}</p>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <p className="text-sm text-ivory">{enquiry.event_type}</p>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <p className="text-sm text-ivory">{enquiry.event_date ?? "—"}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{enquiry.guests ?? "—"} guests</p>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <p className="text-sm text-ivory">{enquiry.budget ?? "—"}</p>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <select
                          value={enquiry.status}
                          onChange={(e) =>
                            handleStatusChange(enquiry.id, e.target.value as (typeof statusOptions)[number])
                          }
                          disabled={updatingId === enquiry.id}
                          className="h-9 rounded border border-input bg-background px-3 text-sm text-ivory outline-none focus:border-gold"
                        >
                          {statusOptions.map((s) => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <p className="text-sm text-ivory">
                          {new Date(enquiry.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(enquiry.created_at).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-12 text-center text-xs text-muted-foreground">
          <p>
            Signed in as {brand.name} admin. Need help? Email{" "}
            <a href="mailto:concierge@maisonaurelle.com" className="text-gold underline underline-offset-4">
              concierge@maisonaurelle.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
