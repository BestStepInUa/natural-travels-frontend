import AuthFooter from "@/components/AuthFooter/AuthFooter";
import AuthHeader from "@/components/AuthHeader/AuthHeader";
import MainAuthNav from "@/components/MainAuthNav/MainAuthNav";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
        <AuthHeader />
        <MainAuthNav />
        {children}
        <AuthFooter />
    </main>
  );
}
