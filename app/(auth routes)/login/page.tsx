import AuthFooter from "@/components/AuthFooter/AuthFooter";
import AuthHeader from "@/components/AuthHeader/AuthHeader";
import LoginForm from "@/components/LoginForm/LoginForm";
import MainAuthNav from "@/components/MainAuthNav/MainAuthNav";

export default function LoginPage(){
  return(
    <>
    <AuthHeader />
    <MainAuthNav />
    <LoginForm />
    <AuthFooter />
    </>
  )
}