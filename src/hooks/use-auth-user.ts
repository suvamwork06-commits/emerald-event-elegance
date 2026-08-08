import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useAuthUser() {
  const [user, setUser] = useState<ReturnType<typeof supabase.auth.getUser> extends Promise<infer R> ? R extends { data: { user: infer U } } ? U : null : null>(null as any);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (mounted) setUser(data.user as any);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        setUser(session?.user as any);
      } else if (event === "SIGNED_OUT") {
        setUser(null as any);
      }
    });

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  return { user };
}
