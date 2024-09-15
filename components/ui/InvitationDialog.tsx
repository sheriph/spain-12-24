import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InvitationCongratulationsDialog from "./InvitationCongratulationsDialog";
import { getApiEndpoint } from "@/lib/utils";

export function InvitationDialog() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm();
  const [isCongratsOpen, setIsCongratsOpen] = useState(false);

  const onSubmit = async (data: Record<string, string>) => {
    const toastId = toast.loading("Submitting your invitation request... 🚀");

    try {
      await axios.post(`${getApiEndpoint()}/api/invitation-request`, {
        FullName: data.fullName,
        Country: data.country,
        ConsulateAddress: data.embassy,
        RegistrationCode: data.regCode,
        EventName: "SPAIN IDTAI 12-24", // You can adjust this dynamically
      });

      toast.success("Invitation request submitted successfully! 🎉", {
        id: toastId,
      });

      setIsCongratsOpen(true);
      reset();
    } catch (error: any) {
      console.log("error", error);
      const errorMessage =
        error.response?.data?.error?.message ||
        error.message ||
        "An unexpected error occurred. Please try again.";
      toast.error(errorMessage, {
        id: toastId,
      });
    }
  };

  return (
    <>
      <Toaster position="top-right" closeButton richColors />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-48 relative overflow-hidden group">
            <span className="relative z-10">Get Invitation Letter</span>
            <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Invitation Letter</DialogTitle>
            <DialogDescription>
              Please provide the following information to request an invitation
              letter.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="As it appears on your passport"
                {...register("fullName", { required: "Full Name is required" })}
              />
              {errors.fullName && (
                <span className="text-red-500">
                  {errors.fullName.message?.toString()}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="country">Country of Residence</Label>
              <Input
                id="country"
                placeholder="Your current country of residence"
                {...register("country", { required: "Country is required" })}
              />
              {errors.country && (
                <span className="text-red-500">
                  {errors.country.message?.toString()}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="embassy">Spanish Embassy/Consulate Address</Label>
              <Input
                id="embassy"
                placeholder="Address where you'll apply for the visa"
                {...register("embassy", {
                  required: "Embassy address is required",
                })}
              />
              {errors.embassy && (
                <span className="text-red-500">
                  {errors.embassy.message?.toString()}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="regCode">Registration Code</Label>
              <Input
                id="regCode"
                placeholder="Your conference registration code"
                {...register("regCode", {
                  required: "Registration Code is required",
                })}
              />
              {errors.regCode && (
                <span className="text-red-500">
                  {errors.regCode.message?.toString()}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!isDirty || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <InvitationCongratulationsDialog
        isOpen={isCongratsOpen}
        onClose={() => {
          location.reload();
          setIsCongratsOpen(false);
        }}
      />
    </>
  );
}
