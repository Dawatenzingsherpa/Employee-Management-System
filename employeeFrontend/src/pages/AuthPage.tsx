import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { Login, Status } from "../types/AuthTypes";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { userLogin } from "../store/authSlice";

export default function SignInForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.auth);

  const [loginData, setLoginData] = useState<Login>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (status === Status.SUCCESS) {
      navigate("/");
    }
  }, [status, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userLogin(loginData));
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex min-h-screen w-full">
        {/* ================= LEFT SIDE ================= */}
        <div className="flex w-full flex-col bg-white lg:w-[93%]">
          <div className="flex flex-1 items-center">
            <div className="w-full max-w-[560px] px-6 sm:px-10 lg:ml-[8%] xl:ml-[9%]">
              {/* Header */}
              <div className="mb-8">
                <h1 className="mb-3 text-[40px] font-semibold tracking-[-1px] text-[#101828]">
                  Sign In
                </h1>

                <p className="text-[16px] text-[#667085]">
                  Enter your email and password to sign in!
                </p>
              </div>

              {/* Divider */}
              <div className="relative my-10 flex items-center">
                <div className="h-px flex-1 bg-[#e4e7ec]" />

                <span className="mx-6 bg-white px-0 text-[16px] text-[#98a2b3]">
                  Or
                </span>

                <div className="h-px flex-1 bg-[#e4e7ec]" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[16px] font-medium text-[#101828]"
                    >
                      Email <span className="text-[#ff3b30]">*</span>
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleChange}
                      placeholder="info@gmail.com"
                      required
                      className="
                        h-[55px]
                        w-full
                        rounded-[10px]
                        border
                        border-[#d0d5dd]
                        bg-white
                        px-5
                        text-[16px]
                        text-[#101828]
                        outline-none
                        transition
                        placeholder:text-[#98a2b3]
                        hover:border-[#98a2b3]
                        focus:border-[#4c63ff]
                        focus:ring-1
                        focus:ring-[#4c63ff]
                      "
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-[16px] font-medium text-[#101828]"
                    >
                      Password <span className="text-[#ff3b30]">*</span>
                    </label>

                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        className="
                          h-[55px]
                          w-full
                          rounded-[10px]
                          border
                          border-[#d0d5dd]
                          bg-white
                          px-5
                          pr-14
                          text-[16px]
                          text-[#101828]
                          outline-none
                          transition
                          placeholder:text-[#98a2b3]
                          hover:border-[#98a2b3]
                          focus:border-[#4c63ff]
                          focus:ring-1
                          focus:ring-[#4c63ff]
                        "
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="
                          absolute
                          right-4
                          top-1/2
                          -translate-y-1/2
                          text-[#667085]
                          transition
                          hover:text-[#344054]
                        "
                      >
                        {showPassword ? (
                          <Eye className="size-5" />
                        ) : (
                          <EyeOff className="size-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember / Forgot */}
                  <div className="flex items-center justify-between">
                    <label className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="
                          size-6
                          cursor-pointer
                          appearance-none
                          rounded-[7px]
                          border
                          border-[#d0d5dd]
                          bg-white
                          checked:border-[#4c63ff]
                          checked:bg-[#4c63ff]
                        "
                      />

                      <span className="text-[16px] text-[#344054]">
                        Keep me logged in
                      </span>
                    </label>

                    <Link
                      to="/reset-password"
                      className="
                        text-[16px]
                        font-medium
                        text-[#4353ff]
                        transition
                        hover:text-[#3440d9]
                      "
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === Status.LOADING}
                    className="
                      h-[56px]
                      w-full
                      rounded-[10px]
                      bg-[#2563eb]
                      text-[16px]
                      font-semibold
                      text-white
                      shadow-[0_2px_4px_rgba(76,99,255,0.15)]
                      transition
                      hover:bg-[#4358e8]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#4c63ff]
                      focus:ring-offset-2
                      disabled:cursor-not-allowed
                    "
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div
          className="
            relative
            hidden
            min-h-screen
            overflow-hidden
            bg-[#171b5b]
            lg:block
            lg:w-[7%]
          "
        >
          {/* Grid */}
          <div
            className="
              absolute
              inset-0
              opacity-30
              bg-[linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)]
              bg-[size:64px_64px]
            "
          />

          {/* Soft glow */}
          <div
            className="
              absolute
              -right-20
              top-1/3
              h-[300px]
              w-[300px]
              rounded-full
              bg-[#3d45a8]
              opacity-20
              blur-[100px]
            "
          />
        </div>
      </div>
    </div>
  );
}
