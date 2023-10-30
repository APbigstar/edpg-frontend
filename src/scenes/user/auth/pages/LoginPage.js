import FormHeader from "../FormHeader"
import Login from "../Login"

export default function LoginPage() {

    return (
        <div
            className="flex flex-col items-center justify-center h-screen"
            style={{
                backgroundImage: "url('/images/bg.png')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}>
            <FormHeader
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
            />
            <Login />
        </div>
    )
}