import RegisterBg from "@/assest/images/HeroSection.jpg";
import RegisterForm from "@/components/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="w-full lg:grid lg:h-[100vh] lg:grid-cols-2 xl:h-[100vh]">
      <div className="hidden bg-muted lg:block">
        <img
          src={RegisterBg}
          alt="Register Image"
          className="object-cover w-full h-full lg:h-screen"
        />
      </div>
      <div className="flex items-center justify-center h-full p-6 sm:p-10 lg:p-0 bg-slate-300">
        <div className="mx-auto grid w-[325px] sm:w-[600px] md:w-[700px] lg:w-[450px] xl:w-[500px]">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
