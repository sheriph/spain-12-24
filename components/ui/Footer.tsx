import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getApiEndpoint } from "@/lib/utils";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${getApiEndpoint()}/api/subscribers/subscribe`,
        { email }
      );
      toast.success(response.data.message || "Subscribed successfully!");
      setEmail("");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error?.message ||
        error.message ||
        "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>enquiries@idtaievents.com</p>
            <p>+34 96 123 4567</p>
            <p className="mt-4">Palacio de Congresos de Valencia</p>
            <p>Av. de les Corts Valencianes, 60</p>
            <p>46015 Valencia, Spain</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:underline">
                  About the Conference
                </a>
              </li>
              <li>
                <a href="#speakers" className="hover:underline">
                  Keynote Speakers
                </a>
              </li>
              <li>
                <a href="#agenda" className="hover:underline">
                  Agenda
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:underline">
                  Registration & Pricing
                </a>
              </li>
              <li>
                <a href="#venue" className="hover:underline">
                  Venue Information
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-2">
              Stay updated with our latest news and conference updates
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="rounded-r-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="rounded-l-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <p className="mt-4 text-sm">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from IDTAI 2024.
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>
            &copy; 2024 Innovation and Digital Transformation Across Industries
            Conference. All rights reserved.
          </p>
          <p className="mt-2">Organized by TechVista Events</p>
        </div>
      </div>
    </footer>
  );
}
