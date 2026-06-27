import { redirect } from 'react-router';
import { createSupabaseServerClient } from './supabase.server';

/** 로그인된 사용자만 접근 가능한 페이지에서 사용 — 미인증 시 /auth/login 으로 이동 */
export async function requireUser(request: Request) {
  const { supabase, responseHeaders } = createSupabaseServerClient(request);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw redirect('/auth/login', { headers: responseHeaders });
  }

  return { user, responseHeaders };
}

/** 로그인 여부만 확인 — 미인증이어도 페이지는 보여줌 (홈 등) */
export async function getOptionalUser(request: Request) {
  const { supabase, responseHeaders } = createSupabaseServerClient(request);
  const { data: { user } } = await supabase.auth.getUser();

  return { user, responseHeaders };
}
