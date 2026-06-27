import { Form, Link, redirect, useActionData, useNavigation } from 'react-router';
import type { Route } from './+types/login';
import { createSupabaseServerClient } from '~/server/supabase.server';
import { Button } from '~/common/components/ui/button';
import { Input } from '~/common/components/ui/input';
import { Label } from '~/common/components/ui/label';

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
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">로그인</h1>
          <p className="text-sm text-muted-foreground">계정에 로그인하세요</p>
        </div>

        <Form method="post" className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {actionData?.error && (
            <p className="text-sm text-destructive">{actionData.error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? '로그인 중...' : '로그인'}
          </Button>
        </Form>

        <p className="text-center text-sm text-muted-foreground">
          계정이 없으신가요?{' '}
          <Link to="/auth/signup" className="font-medium text-primary hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
