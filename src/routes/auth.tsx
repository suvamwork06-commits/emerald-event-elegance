import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { LuxeButton } from "@/components/luxe/LuxeButton";
import { brand } from "@/lib/content";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Admin Sign In — Maison Aurelle" },
      { name: "description", content: "Private access for the Maison Aurelle concierge team." },
    ],
  }),
});

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        setMessage("Account created. Check your email to confirm, then sign in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin/enquiries" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grain flex min-h-svh items-center justify-center px-6 py-24">
      <div className="clay-card w-full max-w-md rounded-2xl p-8 md:p-12">
        <div className="mb-10 text-center">
          <span className="font-display text-2xl tracking-[0.14em] text-gold">{brand.name}</span>
          <h1 className="mt-4 text-3xl text-ivory">Private Access</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            For the concierge team only.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <label className="block">
            <span className="eyebrow mb-2 block">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full border border-input bg-background/40 px-4 text-sm text-ivory outline-none placeholder:text-muted-foreground/60 focus:border-gold"
              placeholder="you@maisonaurelle.com"
            />
          </label>

          <label className="block">
            <span className="eyebrow mb-2 block">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full border border-input bg-background/40 px-4 text-sm text-ivory outline-none placeholder:text-muted-foreground/60 focus:border-gold"
              placeholder="••••••••"
            />
          </label>

          {error ? (
            <div className="rounded border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}
          {message ? (
            <div className="rounded border border-gold/40 bg-gold/10 p-3 text-sm text-ivory">
              {message}
            </div>
          ) : null}

          <LuxeButton type="submit" disabled={loading} className="mt-2 w-full">
            {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
          </LuxeButton>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setMessage(null);
            }}
            className="text-center text-xs text-muted-foreground transition-colors hover:text-ivory"
          >
            {mode === "signin" ? "Need an admin account? Create one" : "Already have an account? Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
