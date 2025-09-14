"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function SignOut() {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({
        callbackUrl: `/${locale}`,
        redirect: false,
      });
      router.push(`/${locale}`);
    };

    handleSignOut();
  }, [router, locale]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Signing out...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
}
