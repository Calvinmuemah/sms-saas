"use client";

import Image from "next/image";
import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div>
        <Image
          src="/hero-bg.png"
          alt="Hero Illustration"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full opacity-20"
        />
      </div>

      {/* Cards Section */}
      <div>
        <Card className="shadow-xl rounded-xl hover:scale-105 transition-transform">
          <CardContent>
            <p>Card Content 1</p>
          </CardContent>
        </Card>
        <Card className="shadow-xl rounded-xl hover:scale-105 transition-transform">
          <CardContent>
            <p>Card Content 2</p>
          </CardContent>
        </Card>
        <Card className="shadow-xl rounded-xl hover:scale-105 transition-transform">
          <CardContent>
            <p>Card Content 3</p>
          </CardContent>
        </Card>
      </div>

      {/* Buttons Section */}
      <div>
        <Button className="px-8 py-3 text-lg bg-green-600 text-white font-bold hover:bg-green-700 transition">
          Click Me
        </Button>
      </div>

      {/* Clients Section */}
      <div>
        <Image src="/client1.png" alt="Client 1" width={48} height={48} />
        <Image src="/client2.png" alt="Client 2" width={48} height={48} />
        <Image src="/client3.png" alt="Client 3" width={48} height={48} />
        <Image src="/client4.png" alt="Client 4" width={48} height={48} />
      </div>
    </div>
  );
}