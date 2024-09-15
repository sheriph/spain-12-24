"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Menu, Mail } from "lucide-react";
import { RetroGridDemo } from "./ui/RetroGridDemo";
import { countries } from "@/lib/utils";
import { RegisterDialog } from "./ui/RegisterDialog";
import { InvitationDialog } from "./ui/InvitationDialog";
import { Footer } from "./ui/Footer";

export function ConferenceWebsite() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-gray-800">
                <span className="text-primary">ID</span>
                <span className="text-pink-500">TAI</span>
                <span className="text-sm font-normal ml-1 text-gray-600">
                  2024
                </span>
              </h1>
            </motion.div>
            <div className="hidden md:flex space-x-4">
              {[
                "home",
                "about",
                "speakers",
                "agenda",
                "pricing",
                "venue",
                "Visa",
                "organizer",
              ].map((section) => (
                <motion.div
                  key={section}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={activeSection === section ? "default" : "ghost"}
                    onClick={() => scrollToSection(section)}
                    className={
                      activeSection === section
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Button>
                </motion.div>
              ))}
            </div>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white">
                <nav className="flex flex-col space-y-4">
                  {[
                    "home",
                    "about",
                    "speakers",
                    "agenda",
                    "pricing",
                    "venue",
                    "Visa",
                    "organizer",
                  ].map((section) => (
                    <Button
                      key={section}
                      variant={activeSection === section ? "default" : "ghost"}
                      onClick={() => scrollToSection(section)}
                      className={
                        activeSection === section
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <section
          id="home"
          style={{
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <RetroGridDemo>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <div className="container mx-auto">
                <h1 className="text-5xl font-bold mb-4">
                  Innovation and Digital Transformation Across Industries
                  Conference 2024
                </h1>
                <p className="text-xl mb-8">
                  November 27-29, 2024 | Valencia, Spain
                </p>
                <div className="flex justify-center">
                  <RegisterDialog />
                </div>
              </div>
            </motion.div>
          </RetroGridDemo>
        </section>

        <section id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              About the Conference
            </h2>
            <p className="text-lg mb-4">
              Digital transformation is revolutionizing how businesses operate,
              how industries evolve, and how professionals across all sectors
              perform their roles. Our conference will explore how emerging
              technologies—like AI, machine learning, blockchain, IoT, cloud
              computing, and more—are driving innovation and reshaping
              industries.
            </p>
            <p className="text-lg">
              Learn how to adapt, compete, and thrive in an increasingly digital
              world.
            </p>
          </div>
        </section>

        <section id="speakers" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Keynote Speakers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Dr. Jane Smith",
                  role: "Chief Digital Officer, GlobalTech Solutions",
                  topic: "The Future of AI in Digital Transformation",
                  image: "/images/Dr. Jane Smith.webp",
                },
                {
                  name: "Michael Johnson",
                  role: "Co-Founder, FinTech Innovators",
                  topic: "Blockchain's Role in the Future of Finance",
                  image: "/images/michael.webp",
                },
                {
                  name: "Prof. Maria Fernandez",
                  role: "Professor of Robotics, University of Valencia",
                  topic: "Robotics and Automation in Manufacturing: A New Era",
                  image: "/images/maria.webp",
                },
                {
                  name: "Sarah Lee",
                  role: "Global Head of Digital Strategy, HealthPlus",
                  topic: "Digital Disruption in Healthcare",
                  image: "/images/lee.jpg",
                },
              ].map((speaker, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={speaker.image} alt={speaker.name} />
                      <AvatarFallback>
                        {speaker.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>{speaker.name}</CardTitle>
                    <CardDescription>{speaker.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{speaker.topic}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="agenda" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Agenda Overview
            </h2>
            <ScrollArea className="h-96 w-full rounded-md border p-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">Day</th>
                    <th className="text-left p-2">Time</th>
                    <th className="text-left p-2">Event</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      day: "Nov 27",
                      time: "09:00 - 10:00",
                      event: "Registration & Welcome Breakfast",
                    },
                    {
                      day: "Nov 27",
                      time: "10:00 - 12:00",
                      event: "Keynote Sessions",
                    },
                    {
                      day: "Nov 27",
                      time: "12:00 - 13:00",
                      event: "Breakout Panel Discussions",
                    },
                    {
                      day: "Nov 27",
                      time: "13:00 - 14:00",
                      event: "Networking Lunch",
                    },
                    {
                      day: "Nov 27",
                      time: "14:00 - 17:00",
                      event: "Workshops and Hands-on Demos",
                    },
                    {
                      day: "Nov 28",
                      time: "09:30 - 12:00",
                      event: "Keynote Sessions",
                    },
                    {
                      day: "Nov 28",
                      time: "12:00 - 13:00",
                      event: "Industry-Focused Roundtables",
                    },
                    {
                      day: "Nov 29",
                      time: "09:30 - 12:00",
                      event: "Future Trends in Digital Transformation",
                    },
                    {
                      day: "Nov 29",
                      time: "12:00 - 14:00",
                      event: "Closing Remarks & Farewell Lunch",
                    },
                  ].map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{item.day}</td>
                      <td className="p-2">{item.time}</td>
                      <td className="p-2">{item.event}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Registration & Pricing
            </h2>
            <Tabs
              defaultValue="early-bird"
              className="w-full max-w-3xl mx-auto"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="early-bird">Early Bird</TabsTrigger>
                <TabsTrigger value="regular">Regular</TabsTrigger>
              </TabsList>
              <TabsContent value="early-bird">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Early Bird Pricing (Until March 31, 2024)
                    </CardTitle>
                    <CardDescription>
                      Save €10 with our early bird rate!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span>Conference Fee</span>
                      <span className="font-bold">€50</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <RegisterDialog />
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="regular">
                <Card>
                  <CardHeader>
                    <CardTitle>Regular Pricing (From April 1, 2024)</CardTitle>
                    <CardDescription>
                      Standard rate for late registrations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span>Conference Fee</span>
                      <span className="font-bold">€60</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full relative overflow-hidden group">
                          <span className="relative z-10">Register Now</span>
                          <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Register for IDTAI 2024</DialogTitle>
                          <DialogDescription>
                            Please fill in your details to register for the
                            conference.
                          </DialogDescription>
                        </DialogHeader>
                        <form className="space-y-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="John Doe" />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="john@example.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="organization">Organization</Label>
                            <Input
                              id="organization"
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="country">Country</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="spain">Spain</SelectItem>
                                <SelectItem value="france">France</SelectItem>
                                <SelectItem value="germany">Germany</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button type="submit" className="w-full">
                            Complete Registration
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="venue" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Venue</h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <img
                  src="/images/Palacio.jpg"
                  alt="Palacio de Congresos de Valencia"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2 md:pl-8">
                <h3 className="text-2xl font-bold mb-4">
                  Palacio de Congresos de Valencia
                </h3>
                <p className="mb-4">
                  A state-of-the-art conference center located in the heart of
                  Valencia, the Palacio de Congresos de Valencia is the perfect
                  venue for our event.
                </p>
                <div className="flex items-center mb-2">
                  <MapPin className="mr-2" />
                  <span>
                    Av. de les Corts Valencianes, 60, 46015 Valencia, Spain
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="Visa" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Request Invitation
            </h2>
            <div className="max-w-2xl mx-auto">
              <p className="mb-6">
                Attendees from countries outside the European Union may require
                a visa to enter Spain. If you need an invitation letter to
                support your visa application, please use the button below to
                request one.
              </p>
              <p className="mb-6">
                Please note that the invitation letter does not guarantee visa
                approval. It is the responsibility of the attendee to apply for
                the appropriate visa in a timely manner.
              </p>
              <InvitationDialog />
            </div>
          </div>
        </section>

        <section id="organizer" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              About the Organizer
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="mb-8 text-lg">
                TechVista Events is a leading conference organizer specializing
                in technology and digital transformation events. With over a
                decade of experience, we bring together industry leaders,
                innovators, and professionals to foster knowledge sharing and
                networking opportunities.
              </p>
              <h3 className="text-2xl font-bold mb-4">Our Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Elena Rodriguez",
                    role: "Event Director",
                    email: "elena@idtaievents.com",
                    image: "/images/elena.jpg",
                  },
                  {
                    name: "Marcus Chen",
                    role: "Program Coordinator",
                    email: "marcus@idtaievents.com",
                    image: "/images/chen.jpeg",
                  },
                  {
                    name: "Sophia Patel",
                    role: "Partnerships Manager",
                    email: "sophia@idtaievents.com",
                    image: "/images/sofia.jpeg",
                  },
                ].map((member, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <Avatar className="w-24 h-24 mx-auto mb-4">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle>{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          (window.location.href = `mailto:${member.email}`)
                        }
                      >
                        <Mail className="mr-2 h-4 w-4" /> Contact
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
