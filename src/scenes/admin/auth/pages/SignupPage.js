import FormHeader from "../../../../components/FormHeader";
import Signup from "../Signup";

export default function AdminSignupPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FormHeader
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/admin/signin"
      />
      <Signup />
    </div>
  );
}
