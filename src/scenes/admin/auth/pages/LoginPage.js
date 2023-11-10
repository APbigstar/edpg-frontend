import FormHeader from "../../../../components/FormHeader";
import Login from "../Login";

export default function AdminLoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FormHeader
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/admin/signup"
      />
      <Login />
    </div>
  );
}
