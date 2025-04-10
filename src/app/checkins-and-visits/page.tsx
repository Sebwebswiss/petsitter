import Footer from "@/components/footer";
import Link from "next/link";

const Page = () => {
    return (
        <>
            <div className="min-h-screen bg-black max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto mt-24 text-white">

                <div className="h-[300px] flex flex-col items-center justify-center bg-golden rounded-lg mb-4">
                    <p className="bg-black p-2 rounded-md">Our Services</p>
                    <h1 className="text-3xl text-black mt-4 font-semibold">Check-ins & Feeding Visits</h1>
                </div>

                {/* -- Main Content Area -- */}
                <div className="container mx-auto py-8 flex flex-col md:flex-row justify-between gap-10">
                    {/* Left: Main Section */}
                    <div className="md:w-[70%] rounded shadow">
                        <img
                            src="/images/pet-walk.jpg"
                            alt="Golden Retriever"
                            className="w-full h-auto max-h-[600px] object-cover rounded mb-6"
                        />
                           <h2 className="text-2xl text-primary font-bold mb-2">
                           Check-ins & Feeding Visits
            </h2>
            <p className="text-white mb-4">
            If you don&apos;t require full pet sitting but want someone to check in on your pet and handle feeding and care tasks, our Check-ins/Feeding Visits are the perfect solution. During a check-in visit (often 15-30 minutes, timing based on your preference), we will ensure your pet is doing well and tend to their immediate needs. This service is ideal for cats, puppies, senior pets, or any pets that need a quick visit for meals and a little TLC while you&apos;re out. 
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-primary mb-2">
                What&apos;s Included:
              </h3>
              <p>What you can expect from a check-in visit:</p>
              <ul className="list-disc list-inside text-gray-300 mt-2">
                <li className="py-2 ">
                Feeding your pet according to their normal schedule and dietary requirements.
                </li>
                <li className="py-2 ">
                Refreshing water and making sure they have plenty to drink.
                </li>
                <li className="py-2 ">
                A brief potty break for dogs, or litter box scooping for cats/small animals.
                </li>
                <li className="py-2 ">
                A bit of playtime, petting, or companionship to brighten their day.
                </li>
                <li className="py-2 ">
                A home check to verify everything is in order (and to reassure your pet that all is well).
                </li>
              </ul>
              <p className="mt-2">
              We offer check-ins as a stand-alone service or to supplement longer pet-sitting intervals. Pricing for check-in visits is affordable (comparable to our walking rates) - typically around $19 for a standard 30-minute visit. If you have specific timing or frequency needs, we can customize a plan and quote for you. This way, you can be confident your pet is looked after even during quick weekend trips or long days at the office.
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Booking Process
              </h3>
              <p>
                We&apos;ve made the booking process simple and user-friendly so you
                can schedule pet care with confidence and ease.
                 Here&apos;s a
                step-by-step guide on how to book a service with us:
              </p>
              <ul className="list-disc list-inside text-gray-300 mt-2">
                <li className="py-2 ">
                  <strong>Log In (or
                Sign Up) with Google: </strong> Visit our booking page and log in using
                your Google account. This quick login option is secure and saves
                you time - no need to remember another password. If you&apos;re a new
                user, you can create a profile in seconds by linking your Google
                account
                </li>
                <li className="py-2 ">
                  <strong>Select Your Service & Schedule:</strong> Choose the service you
                need (pet sitting, walking, check-in, etc.) from the menu. Then,
                select the dates and times that work for you. You&apos;ll be able to
                provide details about your pet (such as their name, breed, any
                special needs or routines) and specify instructions or
                preferences (for example, “30-minute walk around 3 PM” or
                “overnight sit on Friday night”)
                </li>
                <li className="py-2 ">
                  <strong>Confirm Your Booking:</strong> Once you&apos;ve entered the details, submit your booking request. You&apos;ll receive an email confirmation shortly after, summarizing your booking details - including the service type, date/time, price, and any instructions you provided. Please check that everything is correct. If you notice something off, just let us know and we&apos;ll fix it.
                </li>
                <li className="py-2 ">
                  <strong>After Confirmation - What&apos;s Next:</strong> After your booking is confirmed via email, we&apos;ll reach out to you (if needed) to answer any remaining questions or arrange a meet-and-greet before the service, especially for first-time clients or pets with special needs. On the day of service, simply relax - we&apos;ll show up as scheduled and take great care of your pet! During longer bookings (like full-day sits or multiple-day care), we can send periodic updates and photos so you know how your pet is doing.
                </li>
              </ul>
              <h3 className="text-xl font-semibold text-primary mb-4 mt-2">
              Need help or have questions before booking?
              </h3>
              <p className="mt-3">
               We&apos;re here to assist. You can always contact us by phone or email (see the Contact & Support section below) if you want to discuss your pet&apos;s needs in detail, or if you&apos;d like to meet the caregiver (Sebastien) beforehand. We want you to feel completely comfortable, so don&apos;t hesitate to reach out at any stage of the booking process. Our system is designed to be hassle-free: Google login makes signing in easy, and email confirmations provide a clear record of your bookings. Payments for services can be arranged securely after booking confirmation (we&apos;ll provide details on payment methods in the confirmation email). Once everything is set, you can look forward to top-notch pet care and peace of mind!
              </p>
            </div>
          </div>
          {/* Right: Related Services */}
          <div className="md:w-[30%] rounded shadow sticky top-32 self-start">
            <h3 className="text-xl text-primary font-semibold mb-4">
              Other Services
            </h3>
            <ul className="space-y-2">
              <Link href={"/pet-sitting"}>
              <li className="border hover:border-primary py-3 px-3 rounded-md hover:text-primary cursor-pointer">
                Pet Sitting
              </li>
              </Link>
              <Link href={"/dog-walking"}>
              <li className="border hover:border-primary py-3 px-3 mt-2 rounded-md hover:text-primary cursor-pointer">
                Dog Walking
              </li>
              </Link>
             <Link href={"/drop-in-visit"}>
              <li className="border hover:border-primary py-3 px-3 mt-2 rounded-md hover:text-primary cursor-pointer">
        Drop In Visit
              </li>
              </Link>
              <Link href={"/checkins-and-visits"}>
              <li className="border hover:border-primary py-3 px-3 mt-2 rounded-md hover:text-primary cursor-pointer">
              Check-ins & Feeding Visits
              </li>
              </Link>
              <Link href={"/additional-services"}>
              <li className="border hover:border-primary py-3 px-3 mt-2 rounded-md hover:text-primary cursor-pointer">
              Additional Services
              </li>
              </Link>
            </ul>
          </div>
                </div>
                <div
                    className="relative mt-10 text-center rounded-md h-[500px] bg-[url('/images/book.jpeg')] bg-cover bg-center bg-no-repeat"
                >
                    {/* Overlay for Better Visibility */}
                    <div className="absolute inset-0 bg-black/50"></div>

                    {/* Content */}
                    <div className="relative flex flex-col items-center justify-center h-full text-white">
                        <h2 className="text-3xl font-bold mb-10">Experience Premium Pet Care</h2>
                        <Link
                            href={"/client/login"}
                            className="bg-golden rounded-full py-4 px-10 whitespace-nowrap text-lg text-black hover:text-white font-heading font-semibold"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Page;
