
import AuthFooter from "@/components/AuthFooter/AuthFooter"
import AuthHeader from "@/components/AuthHeader/AuthHeader"
import MainAuthNav from "@/components/MainAuthNav/MainAuthNav"
import RegisterForm from "@/components/RegisterForm/RegisterForm"

export default function RegisterPage(){
  return(
   <>
    <AuthHeader />
    <MainAuthNav />
    <RegisterForm />
    <AuthFooter />
   </>
  )
}