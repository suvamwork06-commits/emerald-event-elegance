import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, X } from "lucide-react";
import { LuxeButton } from "./LuxeButton";
import { sendEnquiry } from "@/lib/emailjs";

const schema = z.object({
  name: z.string().min(2, "Please share your full name"),
  email: z.string().email("A valid email is required"),
  phone: z.string().min(7, "A reachable number, please"),
  eventType: z.string().min(1, "Choose an experience"),
  date: z.string().min(1, "An approximate date helps us plan"),
  guests: z.string().min(1, "Approximate guest count"),
  city: z.string().min(2, "City or venue"),
  budget: z.string().min(1, "Select an investment range"),
  notes: z.string().optional(),
});

type QuoteValues = z.infer<typeof schema>;

const STEP_FIELDS: (keyof QuoteValues)[][] = [
  ["name", "email", "phone"],
  ["eventType", "date", "guests", "city"],
  ["budget", "notes"],
  [],
];

const STEPS = ["Personal Details", "Event Details", "Investment", "Confirmation"];

const EVENT_TYPES = [
  "Luxury Wedding",
  "Destination Wedding",
  "Corporate Gala",
  "Brand Launch",
  "Private Celebration",
  "Luxury Catering Only",
];

const BUDGETS = [
  "Under ₹25 Lakh",
  "₹25 — 60 Lakh",
  "₹60 Lakh — 1.5 Crore",
  "Above ₹1.5 Crore",
];

const QuoteContext = createContext<{ open: () => void }>({ open: () => {} });

export function useQuote() {
  return useContext(QuoteContext);
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </QuoteContext.Provider>
  );
}

const fieldClass =
  "h-12 w-full border border-input bg-background/40 px-4 font-sans text-sm text-ivory outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold";

function QuoteDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const form = useForm<QuoteValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: "",
      date: "",
      guests: "",
      city: "",
      budget: "",
      notes: "",
    },
  });

  const { register, trigger, getValues, formState, handleSubmit, reset } = form;

  const close = () => {
    onClose();
    window.setTimeout(() => {
      setStep(0);
      setDone(false);
      reset();
    }, 500);
  };

  const next = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => Math.min(3, s + 1));
  };

  const onSubmit = async (values: QuoteValues) => {
    setSending(true);
    try {
      await sendEnquiry({
        from_name: values.name,
        reply_to: values.email,
        phone: values.phone,
        event_type: values.eventType,
        event_date: values.date,
        guests: values.guests,
        city: values.city,
        budget: values.budget,
        notes: values.notes ?? "",
      });
      setDone(true);
    } finally {
      setSending(false);
    }
  };

  const values = getValues();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[115] flex items-center justify-center overflow-y-auto bg-background/90 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Request a consultation"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="clay-card grain relative my-auto w-full max-w-2xl rounded-2xl p-7 md:p-12"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-5 right-5 flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <X className="size-4" />
            </button>

            {done ? (
              <div className="py-14 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -25 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto flex size-20 items-center justify-center rounded-full border border-gold/50"
                >
                  <Check className="size-8 text-gold" />
                </motion.div>
                <h3 className="mt-8 text-4xl text-ivory">Thank you</h3>
                <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Your enquiry is with our concierge. A planner will write to you
                  within one working day to arrange your private consultation.
                </p>
                <LuxeButton variant="outline" className="mt-9" onClick={close}>
                  Close
                </LuxeButton>
              </div>
            ) : (
              <>
                <p className="eyebrow">Step {step + 1} of 4</p>
                <h3 className="mt-4 text-4xl text-ivory">{STEPS[step]}</h3>

                <div className="mt-7 flex gap-2" aria-hidden>
                  {STEPS.map((label, i) => (
                    <div key={label} className="h-px flex-1 overflow-hidden bg-border">
                      <motion.div
                        className="h-full bg-[image:var(--gradient-gold)]"
                        initial={false}
                        animate={{ width: i <= step ? "100%" : "0%" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-9">
                  {step === 0 ? (
                    <div className="grid gap-5">
                      <Field label="Full name" error={formState.errors.name?.message}>
                        <input className={fieldClass} placeholder="Ananya Roy" {...register("name")} />
                      </Field>
                      <Field label="Email" error={formState.errors.email?.message}>
                        <input className={fieldClass} type="email" placeholder="you@email.com" {...register("email")} />
                      </Field>
                      <Field label="Phone" error={formState.errors.phone?.message}>
                        <input className={fieldClass} placeholder="+91 …" {...register("phone")} />
                      </Field>
                    </div>
                  ) : null}

                  {step === 1 ? (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Experience" error={formState.errors.eventType?.message}>
                        <select className={fieldClass} {...register("eventType")}>
                          <option value="">Select…</option>
                          {EVENT_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Approximate date" error={formState.errors.date?.message}>
                        <input className={fieldClass} type="date" {...register("date")} />
                      </Field>
                      <Field label="Guests" error={formState.errors.guests?.message}>
                        <input className={fieldClass} placeholder="250" {...register("guests")} />
                      </Field>
                      <Field label="City or venue" error={formState.errors.city?.message}>
                        <input className={fieldClass} placeholder="Udaipur" {...register("city")} />
                      </Field>
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="grid gap-5">
                      <Field label="Investment range" error={formState.errors.budget?.message}>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {BUDGETS.map((b) => (
                            <label
                              key={b}
                              className="flex cursor-pointer items-center gap-3 border border-input px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-gold has-checked:border-gold has-checked:text-ivory"
                            >
                              <input type="radio" value={b} className="accent-[var(--gold)]" {...register("budget")} />
                              {b}
                            </label>
                          ))}
                        </div>
                      </Field>
                      <Field label="Anything we should know?">
                        <textarea
                          rows={4}
                          className={`${fieldClass} h-auto py-3`}
                          placeholder="Guest profile, cultural rituals, dietary notes…"
                          {...register("notes")}
                        />
                      </Field>
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <dl className="divide-y divide-border/60 border-y border-border/60">
                      {[
                        ["Name", values.name],
                        ["Email", values.email],
                        ["Phone", values.phone],
                        ["Experience", values.eventType],
                        ["Date", values.date],
                        ["Guests", values.guests],
                        ["Location", values.city],
                        ["Investment", values.budget],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-6 py-3 text-sm">
                          <dt className="text-muted-foreground">{k}</dt>
                          <dd className="text-right text-ivory">{v || "—"}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  <div className="mt-10 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      disabled={step === 0}
                      className="font-sans text-[0.7rem] tracking-[0.26em] text-muted-foreground uppercase transition-colors hover:text-gold disabled:opacity-30"
                    >
                      Back
                    </button>
                    {step < 3 ? (
                      <LuxeButton type="button" onClick={next}>
                        Continue
                      </LuxeButton>
                    ) : (
                      <LuxeButton type="submit" disabled={sending}>
                        {sending ? "Sending…" : "Submit Enquiry"}
                      </LuxeButton>
                    )}
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="eyebrow mb-3 block">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs text-destructive">{error}</span> : null}
    </label>
  );
}