'use client' ;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Star, Heart, Calendar, DollarSign, Home, User } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl">
                    Discover Your Dream Vacation Home
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Explore and book luxurious villas and vacation homes effortlessly. Join our marketplace today!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="h-10 px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                    List Your Property
                  </Button>
                  <Button className="h-10 px-8 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                    Book a Villa
                  </Button>
                </div>
              </div>
              <img
                src="https://placehold.co/600x400.png"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Featured Villas
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Handpicked vacation homes for your perfect getaway.
                </p>
              </div>
              <Carousel>
                <CarouselContent className="flex space-x-4">
                  <CarouselItem>
                    <Card className="w-64">
                      <CardHeader>
                        <CardTitle>Beachside Villa</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <img
                          src="https://placehold.co/600x400.png"
                          alt="Villa"
                          className="rounded-md object-cover"
                        />
                        <div className="flex items-center justify-between mt-4">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            4.8
                          </span>
                          <Button variant="outline" className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card className="w-64">
                      <CardHeader>
                        <CardTitle>Mountain Retreat</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <img
                          src="https://placehold.co/600x400.png"
                          alt="Villa"
                          className="rounded-md object-cover"
                        />
                        <div className="flex items-center justify-between mt-4">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            4.7
                          </span>
                          <Button variant="outline" className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                  <CarouselItem>
                    <Card className="w-64">
                      <CardHeader>
                        <CardTitle>Urban Loft</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <img
                          src="https://placehold.co/600x400.png"
                          alt="Villa"
                          className="rounded-md object-cover"
                        />
                        <div className="flex items-center justify-between mt-4">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            4.9
                          </span>
                          <Button variant="outline" className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Hear from our satisfied users about their experiences.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/50x50.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs text-muted-foreground">Traveler</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "This platform made booking my dream vacation home a breeze. Highly recommend!"
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/50x50.png" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Sarah Miller</p>
                      <p className="text-xs text-muted-foreground">Vendor</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Listing my property was simple and effective. I've reached more customers than ever before."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/50x50.png" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Michael Johnson</p>
                      <p className="text-xs text-muted-foreground">Buyer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The reviews helped me choose the perfect place for my family vacation. Great experience!"
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Simple steps to get you started with your dream vacation.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-center space-y-4 p-6">
                  <Home className="h-12 w-12 text-primary" />
                  <h3 className="text-lg font-bold">Explore Properties</h3>
                  <p className="text-muted-foreground">
                    Browse through our extensive list of luxurious villas and vacation homes.
                  </p>
                </Card>
                <Card className="flex flex-col items-center space-y-4 p-6">
                  <Calendar className="h-12 w-12 text-primary" />
                  <h3 className="text-lg font-bold">Book Instantly</h3>
                  <p className="text-muted-foreground">
                    Reserve your favorite property with ease and enjoy a hassle-free booking process.
                  </p>
                </Card>
                <Card className="flex flex-col items-center space-y-4 p-6">
                  <Heart className="h-12 w-12 text-primary" />
                  <h3 className="text-lg font-bold">Share Your Experience</h3>
                  <p className="text-muted-foreground">
                    Leave reviews and help others find their perfect getaway.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Marketplace</h3>
            <a href="#" className="hover:underline">Properties</a>
            <a href="#" className="hover:underline">Vendors</a>
            <a href="#" className="hover:underline">Reviews</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Blog</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Support</h3>
            <a href="#" className="hover:underline">Help Center</a>
            <a href="#" className="hover:underline">Contact Us</a>
            <a href="#" className="hover:underline">FAQs</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;