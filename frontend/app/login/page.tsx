"use client";
import AuthSplitScreen from "@/components/ui/AuthSplitScreen";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const onCloseAction = () => {
    router.back(); // or router.push("/")
  };

  return <AuthSplitScreen onCloseAction={onCloseAction} />;
}
