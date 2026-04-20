-- Restrict SELECT on contact_leads. The previous policy allowed any authenticated user
-- to read all leads (PII: names, emails, phones). Lock down reads to service-role only.
DROP POLICY IF EXISTS "Authenticated can view leads" ON public.contact_leads;

-- No SELECT policy for anon/authenticated => no row access via PostgREST.
-- Service-role (used by server-side admin client) bypasses RLS and can still read.