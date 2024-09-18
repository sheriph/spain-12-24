import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { usePaystackPayment } from "react-paystack";
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
import { InfoIcon } from "lucide-react";

// Utility to generate a 5-character random registration code
const generateRegistrationCode = () => {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
};

const currencyOptions = [
  { code: "NGN", options: "card" },
  { code: "USD", options: "card" },
  { code: "EUR", options: "card" },
  { code: "GBP", options: "card" },
  { code: "KES", options: "card" },
  { code: "RWF", options: "card" },
];

const rates: { [key: string]: number } = {
  EUR: 1,
  USD: 1.11254,
  GBP: 0.84344,
  NGN: 1824.47,
  KES: 144.73,
  RWF: 1516.6,
};

const convertCurrency = (amount: number, from: string, to: string) => {
  const convertedAmount = (amount / rates[from]) * rates[to];
  return parseFloat(convertedAmount.toFixed(2));
};

export function RegisterDialog() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isSubmitting },
    setValue,
    reset,
  } = useForm();

  const [isCongratsOpen, setIsCongratsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]); // NGN as default
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const baseAmount = 109468; // Base amount in NGN
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const PAYSTACK_KEY =
    (process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_TEST_PUBLIC_KEY
      : process.env.NEXT_PUBLIC_LIVE_PUBLIC_KEY) || "";

  useEffect(() => {
    const updateConvertedAmount = async () => {
      if (selectedCurrency.code !== "NGN") {
        const converted = await convertCurrency(
          baseAmount,
          "NGN",
          selectedCurrency.code
        );
        setConvertedAmount(converted);
      } else {
        setConvertedAmount(baseAmount);
      }
    };

    updateConvertedAmount();
  }, [selectedCurrency]);

  const onSuccess = async (reference: any) => {
    console.log(reference);
    const toastId = toast.loading("Submitting registration... 🚀");

    
    try {
      const formData = watch();
      const formattedEmail = formData.email.trim().toLowerCase();
      const formattedName = startCase(toLower(formData.name));
      const formattedOrganization = startCase(toLower(formData.organization));

      const registrationCode = generateRegistrationCode();

      const registrationData = {
        FullName: formattedName,
        Email: formattedEmail,
        Organisation: formattedOrganization,
        Country: formData.country,
        EventName: "SPAIN IDTAI 12-24",
        RegistrationCode: registrationCode,
        PaymentMethod: "Paystack",
        PaymentStatus: "Paid",
        PaymentAmount: convertedAmount || baseAmount,
        PaymentCurrency: selectedCurrency.code,
        PaymentReference: reference.reference,
      };

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
  };

  const onClose = () => {
    console.log("Payment modal closed");
    toast.info("Payment cancelled. Please try again.");
    setIsDialogOpen(false);
  };

  const config = {
    reference: Date.now().toString(),
    email: watch("email"),
    amount: Math.round(baseAmount * 100), // Paystack expects amount in kobo (smallest currency unit)
    publicKey: PAYSTACK_KEY,
    currency: "NGN",
  };

  const initializePayment = usePaystackPayment(config);

  const onSubmit = async (data: Record<string, string>) => {
    const toastId = toast.loading("Checking registration status... 🔍");

    try {
      const formattedEmail = data.email.trim().toLowerCase();

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

      // If not registered, proceed with payment
      toast.success("Proceeding to payment...", { id: toastId });
      setIsDialogOpen(false);
      initializePayment({ config, onSuccess, onClose });
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

  const getCountryCurrency = (country: string) => {
    const currencyMap: { [key: string]: string } = {
      nigeria: "NGN",
      "united states": "USD",
      "united kingdom": "GBP",
      ghana: "GHS",
      cameroon: "XAF",
      "côte d'ivoire": "XOF",
      "south africa": "ZAR",
      malawi: "MWK",
      kenya: "KES",
      uganda: "UGX",
      rwanda: "RWF",
      tanzania: "TZS",
    };

    return currencyMap[country.toLowerCase()] || "EUR";
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
              <Select
                onValueChange={(value) => {
                  setValue("country", value);
                  const currencyCode = getCountryCurrency(value);
                  setSelectedCurrency(
                    currencyOptions.find((c) => c.code === currencyCode) ||
                      currencyOptions[0]
                  );
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <span className="text-red-500">Please select a country</span>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                type="submit"
                className="w-full"
                disabled={!isDirty || isSubmitting || convertedAmount === null}
              >
                {isSubmitting ? "Submitting..." : "Proceed to Payment"}
              </Button>
              {convertedAmount !== null && selectedCurrency.code !== "NGN" && (
                <div className="bg-gray-100 p-3 rounded-md text-sm flex items-start">
                  <InfoIcon className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Currency Conversion Applied</p>
                    <p>{`₦${baseAmount} NGN ≈ ${convertedAmount} ${selectedCurrency.code}`}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      You will be charged ₦{baseAmount} NGN. The amount shown in {selectedCurrency.code} is for reference only.
                    </p>
                  </div>
                </div>
              )}
            </div>
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