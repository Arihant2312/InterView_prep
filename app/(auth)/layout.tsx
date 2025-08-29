import { ReactNode } from 'react'
import { isAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'
import DotGrid from "@/components/magicui/Backgrounds/DotGrid/DotGrid";

const Authlayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (isUserAuthenticated) redirect('/');

  return (
   <div className="relative min-h-screen flex items-center justify-center">
  {/* Background wrapper */}
  <div className="fixed inset-0 z-0">
    <DotGrid
      dotSize={4}
      gap={40}
      baseColor="#3b82f6"
      activeColor="#06b6d4"
    />
  </div>

  {/* Foreground content */}
  <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center justify-center min-h-screen">
    {children}
  </div>
</div>

  );
}

export default Authlayout