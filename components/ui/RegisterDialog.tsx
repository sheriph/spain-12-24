import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import axios from "axios";
import { startCase, toLower } from "lodash";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries, getApiEndpoint } from "@/lib/utils";
import CongratulationsDialog from "./CongratulationsDialog";

// Utility to generate a 5-character random registration code
const generateRegistrationCode = () => {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
};

export function RegisterDialog() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    setValue,
    reset,
  } = useForm();

  const [isCongratsOpen, setIsCongratsOpen] = useState(false);
  const paymentAmount = 1;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const FLW_KEY =
    (process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_TEST_FLUTTERWAVE_PUBLIC_KEY
      : process.env.NEXT_PUBLIC_PRD_FLUTTERWAVE_PUBLIC_KEY) || "";

  const handleFlutterPayment = useFlutterwave({
    public_key: FLW_KEY as string,
    tx_ref: Date.now().toString(),
    amount: paymentAmount,
    currency: "EUR",
    payment_options: "card",
    customer: {
      email: "enquiries@idtaievents.com",
      phone_number: "",
      name: "",
    },
    customizations: {
      title: "IDTAI 2024 Registration",
      description: "Payment for conference registration",
      logo: "http://localhost:1337/uploads/IDTA_93d5a15bb4.png",
    },
  });

  const onSubmit = async (data: Record<string, string>) => {
    const toastId = toast.loading("Checking registration status... 🔍");

    try {
      const formattedEmail = data.email.trim().toLowerCase();
      const formattedName = startCase(toLower(data.name));
      const formattedOrganization = startCase(toLower(data.organization));

      // Check if the user is already registered
      const checkResponse = await axios.get(
        `${getApiEndpoint()}/api/registrations/check`,
        {
          params: { email: formattedEmail },
        }
      );

      if (checkResponse.data.registered) {
        toast.error("You have already registered for this event.", {
          id: toastId,
        });
        return;
      }

      // If not registered, proceed with registration and payment
      toast.loading("Proceeding with registration... 🚀", { id: toastId });

      const registrationCode = generateRegistrationCode();

      const registrationData = {
        FullName: formattedName,
        Email: formattedEmail,
        Organisation: formattedOrganization,
        Country: data.country,
        EventName: "SPAIN IDTAI 12-24",
        RegistrationCode: registrationCode,
        PaymentMethod: "Flutterwave",
        PaymentStatus: "Pending",
        PaymentAmount: paymentAmount,
      };

      setIsDialogOpen(false);

      handleFlutterPayment({
        callback: async (response) => {
          console.log(response);

          if (response.status === "successful") {
            registrationData.PaymentStatus = "Paid";
            toast.success("Payment successful! Submitting registration... 🎉", {
              id: toastId,
            });

            try {
              const apiResponse = await axios.post(
                `${getApiEndpoint()}/api/register`,
                registrationData
              );

              console.log("Form submitted:", registrationData);
              toast.success(
                apiResponse.data.message ||
                  "Registration successful! Welcome aboard! 🎉",
                {
                  id: toastId,
                }
              );

              setIsCongratsOpen(true);
              reset();
            } catch (error: any) {
              console.error("Registration error:", error);
              const errorMessage =
                error.response?.data?.error?.message ||
                error.message ||
                "An unexpected error occurred. Please try again.";
              toast.error(errorMessage, {
                id: toastId,
              });
            }
          } else {
            toast.error("Payment failed. Please try again.", {
              id: toastId,
            });
          }

          closePaymentModal();
          setIsDialogOpen(false);
        },
        onClose: () => {
          console.log("Payment modal closed");
          setIsDialogOpen(false);
        },
      });
    } catch (error: any) {
      console.error("Check registration error:", error);
      const errorMessage =
        error.response?.data?.error?.message ||
        error.message ||
        "An unexpected error occurred while checking registration. Please try again.";
      toast.error(errorMessage, {
        id: toastId,
      });
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-48 relative overflow-hidden group">
            <span className="relative z-10">Register Now</span>
            <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register for IDTAI 2024</DialogTitle>
            <DialogDescription>
              Please fill in your details and proceed with payment to register
              for the conference.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register("name", { required: "Full Name is required" })}
              />
              {errors.name && (
                <span className="text-red-500">
                  {errors.name.message?.toString()}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500">
                  {errors.email.message?.toString()}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                placeholder="Company Name"
                {...register("organization", {
                  required: "Organization is required",
                })}
              />
              {errors.organization && (
                <span className="text-red-500">
                  {errors.organization.message?.toString()}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Select onValueChange={(value) => setValue("country", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country.toLowerCase()}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <span className="text-red-500">Please select a country</span>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!isDirty || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Proceed to Payment"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <CongratulationsDialog
        isOpen={isCongratsOpen}
        onClose={() => {
          location.reload();
          setIsCongratsOpen(false);
        }}
      />
    </>
  );
}
