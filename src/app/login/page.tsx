import GoogleLoginButton from "@/components/GoogleLoginButton";
import Link from "next/link";
import { Building2 } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#408A71] text-white p-3 rounded-2xl group-hover:bg-[#34745c] transition-colors shadow-lg">
              <Building2 size={32} strokeWidth={2.5} />
            </div>
            <span className="text-3xl font-bold tracking-tight text-gray-900">
              prop<span className="text-[#408A71]">tech</span>
            </span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link href="/signup" className="font-medium text-[#408A71] hover:text-[#34745c]">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">
          <div className="flex flex-col gap-6">
            <GoogleLoginButton />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Secured by Firebase
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
