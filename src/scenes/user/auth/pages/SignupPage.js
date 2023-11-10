import FormHeader from "../../../../components/FormHeader";
import Signup from "../Signup";

export default function UserSignupPage() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: "url('/images/bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <FormHeader
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/signin"
      />
      <Signup />
    </div>
  );
}
