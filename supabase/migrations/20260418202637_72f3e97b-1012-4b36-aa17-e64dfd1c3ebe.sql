
-- Contact / quote leads from the public website
CREATE TABLE public.contact_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  project_location TEXT,
  equipment_interest TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'contact_form',
  ip_hash TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous) can submit a lead
CREATE POLICY "Anyone can submit a lead"
ON public.contact_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users (team) can view leads
CREATE POLICY "Authenticated can view leads"
ON public.contact_leads
FOR SELECT
TO authenticated
USING (true);

CREATE INDEX idx_contact_leads_created_at ON public.contact_leads(created_at DESC);
CREATE INDEX idx_contact_leads_email ON public.contact_leads(email);
