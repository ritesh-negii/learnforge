import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <SignUp 
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignUpUrl="/dashboard"
        appearance={{
          elements: {
            formButtonPrimary: 'bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-lg hover:shadow-orange-500/50 transition',
            card: 'bg-slate-800 border border-slate-700 shadow-2xl',
            headerTitle: 'text-white',
            headerSubtitle: 'text-slate-400',
            socialButtonsBlockButton: 'border-slate-600 hover:bg-slate-700',
            formFieldInput: 'bg-slate-900 border-slate-600 text-white',
            footerActionLink: 'text-orange-400 hover:text-orange-300',
          }
        }}
      />
    </div>
  );
}