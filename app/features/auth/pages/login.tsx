import { Form, Link, redirect, useActionData, useNavigation, useSearchParams } from 'react-router';
import type { Route } from './+types/login';
import { createSupabaseServerClient } from '~/server/supabase.server';
import { Button } from '~/common/components/ui/button';
import { Input } from '~/common/components/ui/input';
import { Label } from '~/common/components/ui/label';
import { BarChart3 } from 'lucide-react';

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase } = createSupabaseServerClient(request);
  const { data: { user } } = await supabase.auth.getUser();
  if (user) throw redirect('/');
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const { supabase, responseHeaders } = createSupabaseServerClient(request);
  const formData = await request.formData();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
  }

  return redirect('/', { headers: responseHeaders });
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isSubmitting = navigation.state === 'submitting';
  const signupSuccess = searchParams.get('signup') === 'success';

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 px-4">
      <div className="w-full max-w-sm space-y-6">

        {/* Brand */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary">
            <BarChart3 className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-bold tracking-tight">Excel BI Dashboard</h1>
        </div>

        {/* Card */}
        <div className="rounded-2xl border bg-white dark:bg-gray-900 shadow-sm p-6 space-y-5">
          <div className="space-y-0.5">
            <h2 className="text-base font-semibold">로그인</h2>
            <p className="text-xs text-muted-foreground">계정에 로그인하세요</p>
          </div>

          {signupSuccess && (
            <div className="rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 px-3 py-2">
              <p className="text-xs text-green-700 dark:text-green-400">
                회원가입이 완료됐어요. 로그인해주세요.
              </p>
            </div>
          )}

          <Form method="post" className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                autoComplete="email"
                className="h-9 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs">비밀번호</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="h-9 text-sm"
              />
            </div>

            {actionData?.error && (
              <p className="text-xs text-destructive">{actionData.error}</p>
            )}

            <Button type="submit" className="w-full h-9" disabled={isSubmitting}>
              {isSubmitting ? '로그인 중...' : '로그인'}
            </Button>
          </Form>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          계정이 없으신가요?{' '}
          <Link to="/auth/signup" className="font-medium text-primary hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
