import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { getEnquiries, updateEnquiry } from "@/lib/enquiries.functions";
import { getSubscribers } from "@/lib/newsletter.functions";
import { LuxeButton } from "@/components/luxe/LuxeButton";
import { ArrowLeft, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/lib/content";

const enquiriesQueryOptions = queryOptions({
  queryKey: ["enquiries"],
  queryFn: () => getEnquiries(),
});

const subscribersQueryOptions = queryOptions({
  queryKey: ["subscribers"],
  queryFn: () => getSubscribers(),
});

export const Route = createFileRoute("/_authenticated/admin/enquiries")({
  component: EnquiriesPage,
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(enquiriesQueryOptions),
      context.queryClient.ensureQueryData(subscribersQueryOptions),
    ]),
  head: () => ({
    meta: [
      { title: "Enquiries Admin — Maison Aurelle" },
      { name: "description", content: "Manage consultation enquiries and newsletter subscribers for Maison Aurelle." },
    ],
  }),
});

const statusOptions = ["new", "contacted", "qualified", "booked", "archived"] as const;

type Tab = "enquiries" | "subscribers";

function EnquiriesPage() {
  const [tab, setTab] = useState<Tab>("enquiries");
  const { data: enquiries } = useSuspenseQuery(enquiriesQueryOptions);
  const { data: subscribers } = useSuspenseQuery(subscribersQueryOptions);
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
            <h1 className="mt-4 text-4xl text-ivory">Leads & Subscribers</h1>
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

        <div className="mb-8 flex gap-2 border-b border-border">
          {[
            { id: "enquiries", label: `Enquiries (${enquiries.length})` },
            { id: "subscribers", label: `Newsletter (${subscribers.length})` },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as Tab)}
              className={`px-4 py-3 font-sans text-[0.7rem] tracking-[0.26em] uppercase transition-colors ${
                tab === t.id ? "border-b border-gold text-ivory" : "text-muted-foreground hover:text-ivory"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "enquiries" ? (
          <EnquiriesTable enquiries={enquiries} updatingId={updatingId} onStatusChange={handleStatusChange} />
        ) : (
          <SubscribersTable subscribers={subscribers} />
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

function EnquiriesTable({
  enquiries,
  updatingId,
  onStatusChange,
}: {
  enquiries: Awaited<ReturnType<typeof getEnquiries>>;
  updatingId: string | null;
  onStatusChange: (id: string, status: (typeof statusOptions)[number]) => void;
}) {
  if (enquiries.length === 0) {
    return (
      <div className="clay-card rounded-2xl p-12 text-center">
        <p className="text-muted-foreground">No enquiries yet.</p>
        <p className="mt-2 text-sm text-muted-foreground/70">
          Submissions from the consultation form will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-5 py-4 font-sans text-[0.65rem] tracking-[0.26em] text-muted-foreground uppercase">Name</th>
              <th className="px-5 py-4 font-sans text-[0.65rem] tracking-[0.26em] text-muted-foreground uppercase">Contact</th>
              <th className="px-5 py-4 font-sans text-[0.65rem] tracking-[0.26em] text-muted-foreground uppercase">Event</th>
              <th className="px-5 py-4 font-sans text-[0.65rem] tracking-[0.26em] text-muted-foreground uppercase">Date / Guests</th>
              <th className="px-5 py-4 font-sans text-[0.65rem] tracking-[0.26em] text-muted-foreground uppercase">Budget</th>
              <th className="px-5 py-4 font-sans text-[0.65rem] tracking-[0.26em] text-muted-foreground uppercase">Status</th>
              <th className="px-5 py-4 font-sans text-[0.65rem] tracking-[0.26em] text-muted-foreground uppercase">Received</th>
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
                    onChange={(e) => onStatusChange(enquiry.id, e.target.value as (typeof statusOptions)[number])}
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
  );
}

function SubscribersTable({
  subscribers,
}: {
  subscribers: Awaited<ReturnType<typeof getSubscribers>>;
}) {
  if (subscribers.length === 0) {
    return (
      <div className="clay-card rounded-2xl p-12 text-center">
        <p className="text-muted-foreground">No subscribers yet.</p>
        <p className="mt-2 text-sm text-muted-foreground/70">
          Newsletter signups from the footer will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-5 py-4 font-sans text-[0.65rem] tracking-[0.26em] text-muted-foreground uppercase">Email</th>
              <th className="px-5 py-4 font-sans text-[0.65rem] tracking-[0.26em] text-muted-foreground uppercase">Joined</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id} className="border-b border-border/60 transition-colors hover:bg-surface/40">
                <td className="px-5 py-4 text-sm text-ivory">{subscriber.email}</td>
                <td className="px-5 py-4 text-sm text-ivory">
                  {new Date(subscriber.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  {" "}
                  {new Date(subscriber.created_at).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
