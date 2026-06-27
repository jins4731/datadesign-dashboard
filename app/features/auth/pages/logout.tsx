import { redirect } from 'react-router';
import type { Route } from './+types/logout';
import { createSupabaseServerClient } from '~/server/supabase.server';

export async function action({ request }: Route.ActionArgs) {
  const { supabase, responseHeaders } = createSupabaseServerClient(request);
  await supabase.auth.signOut();
  return redirect('/auth/login', { headers: responseHeaders });
}
