import { redirect } from 'react-router';
import { createSupabaseServerClient } from './supabase.server';

/**
 * 로그인된 사용자만 접근 가능한 페이지에서 사용 — 미인증 시 /auth/login 으로 이동
 * getSession()으로 쿠키를 로컬에서 읽어 네트워크 요청 없이 빠르게 확인
 * (root 로더의 getUser()가 이미 세션 유효성을 검증하므로 여기선 빠른 확인으로 충분)
 */
export async function requireUser(request: Request) {
  const { supabase, responseHeaders } = createSupabaseServerClient(request);
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw redirect('/auth/login', { headers: responseHeaders });
  }

  return { user: session.user, responseHeaders };
}

/** 로그인 여부만 확인 — 미인증이어도 페이지는 보여줌 (홈 등) */
export async function getOptionalUser(request: Request) {
  const { supabase, responseHeaders } = createSupabaseServerClient(request);
  const { data: { session } } = await supabase.auth.getSession();

  return { user: session?.user ?? null, responseHeaders };
}
