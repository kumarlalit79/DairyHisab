"use client";

import { 
  Button, 
  Card, 
  Field, 
  inputClassName, 
  PageHeader, 
  PageShell,
  Alert
} from "@/components/ui";
import { useAuthStore } from "@/store/authStore";
import { RegisterData } from "@/services/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

interface RegisterForm extends RegisterData {
  confirmPassword?: string;
}

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<RegisterForm>({
    mode: "onTouched"
  });
  const { register: registerUser } = useAuthStore();
  const router = useRouter();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const password = watch("password");

  const onSubmit = async (data: RegisterForm) => {
    setSubmitError(null);
    const { confirmPassword, ...registerData } = data;
    
    const result = await registerUser(registerData);
    
    if (result.success) {
      toast.success(result.message || "Registration Successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      setSubmitError(result.message);
      toast.error(result.message || "Registration failed");
    }
  };

  return (
    <PageShell className="max-w-4xl">
      <PageHeader
        eyebrow="Account"
        title="Create an Account"
        description="Join DairyHisab to manage your dairy transactions easily."
      />

      {submitError && (
        <div className="mb-6">
          <Alert title="Registration Failed">{submitError}</Alert>
        </div>
      )}

      <Card className="p-5 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="grid gap-6 sm:grid-cols-2">
            <Field 
              label="Full Name" 
              hint={errors.name?.message}
            >
              <input
                type="text"
                className={`${inputClassName} ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                placeholder="Enter your full name"
                {...register("name", { required: "Name is required" })}
              />
            </Field>

            <Field 
              label="Mobile Number" 
              hint={errors.mobile?.message}
            >
              <input
                type="tel"
                className={`${inputClassName} ${errors.mobile ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                placeholder="10-digit mobile number"
                {...register("mobile", { 
                  required: "Mobile number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Mobile number must be exactly 10 digits"
                  }
                })}
              />
            </Field>

            <Field 
              label="Dairy Code" 
              hint={errors.dairyCode?.message}
            >
              <input
                type="text"
                className={`${inputClassName} ${errors.dairyCode ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                placeholder="E.g., D-1234"
                {...register("dairyCode", { required: "Dairy code is required" })}
              />
            </Field>

            <Field 
              label="Village" 
              hint={errors.village?.message}
            >
              <input
                type="text"
                className={`${inputClassName} ${errors.village ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                placeholder="Your village name"
                {...register("village", { required: "Village is required" })}
              />
            </Field>

            <div className="sm:col-span-2">
              <Field 
                label="Address" 
                hint={errors.address?.message}
              >
                <textarea
                  rows={2}
                  className={`${inputClassName} resize-none ${errors.address ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="Complete address details"
                  {...register("address", { required: "Address is required" })}
                />
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field 
                label="Secretary Name (Optional)" 
                hint={errors.secretaryName?.message}
              >
                <input
                  type="text"
                  className={inputClassName}
                  placeholder="Name of the dairy secretary if applicable"
                  {...register("secretaryName")}
                />
              </Field>
            </div>

            <Field 
              label="Password" 
              hint={errors.password?.message}
            >
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`${inputClassName} pr-12 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="Minimum 6 characters"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </Field>

            <Field 
              label="Confirm Password" 
              hint={errors.confirmPassword?.message}
            >
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`${inputClassName} pr-12 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="Re-enter your password"
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords do not match"
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </Field>

          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-secondary)]">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-[var(--primary)] hover:underline">
                Log in here
              </Link>
            </p>
            <Button 
              type="submit" 
              loading={isSubmitting} 
              disabled={isSubmitting}
              className="w-full sm:w-auto min-w-[140px]"
            >
              Register
            </Button>
          </div>
          
        </form>
      </Card>
    </PageShell>
  );
};

export default RegisterPage;
