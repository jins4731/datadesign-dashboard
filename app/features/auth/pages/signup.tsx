import { Form, Link, redirect, useActionData, useNavigation } from 'react-router';
import type { Route } from './+types/signup';
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
  const confirm = formData.get('confirm') as string;

  if (password !== confirm) {
    return { error: '비밀번호가 일치하지 않습니다.' };
  }

  if (password.length < 6) {
    return { error: '비밀번호는 6자 이상이어야 합니다.' };
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  return redirect('/auth/login?signup=success', { headers: responseHeaders });
}

export default function Signup() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">회원가입</h1>
          <p className="text-sm text-muted-foreground">새 계정을 만드세요</p>
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
              placeholder="6자 이상"
              required
              autoComplete="new-password"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirm">비밀번호 확인</Label>
            <Input
              id="confirm"
              name="confirm"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
          </div>

          {actionData?.error && (
            <p className="text-sm text-destructive">{actionData.error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? '가입 중...' : '회원가입'}
          </Button>
        </Form>

        <p className="text-center text-sm text-muted-foreground">
          이미 계정이 있으신가요?{' '}
          <Link to="/auth/login" className="font-medium text-primary hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
