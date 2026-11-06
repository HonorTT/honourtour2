

"use client";

import { CONTACT } from "@/lib/contact";

import CardRail from "@/components/common/CardRail";

import { useState } from "react";

import {
  ChevronDown,
  ChevronUp,
  Star,
  Quote,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";

const staticReviews = [
  {
    name: "Anil",
    tour: "Dalhousie Dharamshala Amritsar",
    category: "Family",
    review:
      "Wonderful experience with excellent arrangements. The tour was comfortable, well planned and our tour manager was very helpful throughout the journey.",
    manager: "Tejas Dnyane",
  },
  {
    name: "Nilesh",
    tour: "Best of Kashmir",
    category: "Family",
    review:
      "Tour manager is amazing. Everything was properly managed and we enjoyed every destination. Hotels, food and sightseeing arrangements were excellent.",
    manager: "Jayesh Pawar",
  },
  {
    name: "Sitaram",
    tour: "Highlights of Ladakh",
    category: "Family",
    review:
      "We had a wonderful experience during our conducted tour to Ladakh. All arrangements were very professional including transport and accommodation.",
    manager: "Amol Patil",
  },
];

const staticFaqs = [
  {
    question: "What India tour packages does Honor Tour & Travels offer?",
    answer:
      "Honor Tour & Travels offers a wide range of India tour packages including family tours, group tours, women's special tours, seniors' tours, honeymoon packages, short trips and customized holidays across popular destinations in India.",
  },
  {
    question: "What is included in Honor Tour & Travels India tour packages?",
    answer:
      "Package inclusions vary by itinerary, but may include accommodation, sightseeing, selected meals, tour transportation, tour manager services and other experiences mentioned in the selected package.",
  },
  {
    question: "What is the best time to travel within India with Honor Tour & Travels?",
    answer:
      "India can be explored throughout the year. Hill destinations are popular during summer, Rajasthan and several heritage destinations during winter, while many southern and coastal destinations can be visited across multiple seasons.",
  },
  {
    question: "Does Honor Tour & Travels offer group tours within India for seniors?",
    answer:
      "Yes. Seniors can choose from selected group tours and special itineraries designed around comfortable travel, planned sightseeing and assisted tour experiences.",
  },
  {
    question:
      "Can I travel to India destinations with Honor Tour & Travels from any Indian city?",
    answer:
      "Departure options depend on the selected tour. Joining and leaving options may also be available, allowing travellers to arrange their own journey and join the group at the specified destination.",
  },
];

function ReviewCard({ review }) {
  return (
    <article className="relative flex min-h-[205px] flex-col rounded-xl bg-white p-4 text-[#222]">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-[2px] text-[#F5A623]">
          <Star size={11} fill="currentColor" />
          <span className="text-[10px] font-semibold text-[#222]">5</span>
        </div>

        <span className="rounded-[2px] border border-pink-400 px-1.5 py-[1px] text-[7px] text-pink-600">
          {review.category}
        </span>
      </div>

      <h3 className="mt-3 text-[12px] font-semibold">
        {review.tour}
      </h3>

      <p className="mt-3 line-clamp-3 text-[10px] leading-[1.5] text-[#666]">
        &quot;{review.review}&quot;
      </p>

      <button
        type="button"
        className="mt-1 self-start text-[10px] font-medium underline"
      >
        Read more
      </button>

      <div className="mt-auto flex items-end justify-between border-t border-[#eee] pt-3">
        <div>
          <strong className="block text-[11px]">
            {review.name}
          </strong>

          <span className="text-[8px] text-[#888]">
            Jul, 2026
          </span>
        </div>

        <div className="text-right">
          <span className="block text-[7px] text-[#999]">
            Tour Manager
          </span>

          <strong className="text-[9px] underline">
            {review.manager}
          </strong>
        </div>
      </div>
    </article>
  );
}

export default function IndiaTourBottom({ reviews, faqs }) {
  const reviewList = reviews?.length ? reviews : staticReviews;
  const faqList = faqs?.length ? faqs : staticFaqs;

  const [openFaq, setOpenFaq] = useState(0);
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {/* ==========================================
          REVIEWS
      ========================================== */}
      <section
        id="reviews"
        className="relative overflow-hidden bg-[#0B3B63] py-12"
      >
        <div className="india-container relative">
          {/* Decorative quotes */}
          <Quote
            size={100}
            className="absolute -left-3 top-8 text-white/[0.08]"
            fill="currentColor"
          />

          <Quote
            size={100}
            className="absolute -right-3 bottom-0 rotate-180 text-white/[0.08]"
            fill="currentColor"
          />

          <div className="relative z-10 text-center text-white">
            <h2 className="text-[19px] font-semibold">
              Honor Tour & Travels tour reviews
            </h2>

            <p className="mt-1 text-[10px] text-white/80">
              What are you waiting for? Chalo Bag Bharo Nikal Pado!
            </p>
          </div>

          <CardRail className="relative z-10 mx-auto mt-7 flex max-w-[1180px] gap-4 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory md:grid md:overflow-visible md:grid-cols-3">
            {reviewList.map((review) => (
              <div key={`${review.name}-${review.tour}`} className="min-w-[260px] max-w-[260px] flex-shrink-0 snap-start md:min-w-0 md:max-w-none">
                <ReviewCard review={review} />
              </div>
            ))}
          </CardRail>

          <div className="relative z-10 mt-7 flex justify-center">
            <button
              type="button"
              className="h-[36px] min-w-[170px] rounded-[3px] bg-[#0F4C81] px-6 text-[10px] font-semibold text-white transition hover:bg-[#0B3B63]"
            >
              Read 15K+ Reviews
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          FAQ
      ========================================== */}
      <section className="bg-[#f7f7f7] py-12">
        <div className="india-container">
          <div className="text-center">
            <h2 className="text-[18px] font-semibold text-[#222]">
              India Frequently Asked Questions
            </h2>

            <p className="mt-2 text-[10px] text-[#777]">
              We help you prepare for your trip and answer commonly asked
              questions about India tours.
            </p>

            <div className="mx-auto mt-2 h-[2px] w-[65px] bg-[#0F4C81]" />
          </div>

          <div className="mx-auto mt-7 max-w-[820px] space-y-2">
            {faqList.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-[4px] border border-[#e4e4e4] bg-white"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex min-h-[44px] w-full items-center justify-between gap-5 px-4 py-3 text-left"
                  >
                    <span className="text-[11px] font-medium text-[#333]">
                      {faq.question}
                    </span>

                    {isOpen ? (
                      <ChevronUp
                        size={14}
                        className="shrink-0"
                      />
                    ) : (
                      <ChevronDown
                        size={14}
                        className="shrink-0"
                      />
                    )}
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#eee] px-4 py-4">
                      <p className="text-[10px] leading-[1.7] text-[#666]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className="rounded-[3px] border border-[#333] bg-white px-6 py-2 text-[9px] font-medium"
            >
              See more FAQs
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          SEO CONTENT
      ========================================== */}
      <section className="bg-white py-10">
        <div className="india-container">
          <div className="mx-auto max-w-[1040px]">
            <h2 className="text-[14px] font-semibold text-[#222]">
              Get to know more about India Destinations before booking your
              tour packages
            </h2>

            <div className="mt-4 text-[10px] leading-[1.8] text-[#6b6b6b]">
              <p>
                India is one of the world&apos;s most fascinating travel
                destinations, blessed with outstanding natural beauty,
                historical landmarks, diverse cultures and memorable
                experiences. From scenic Himalayan landscapes and peaceful
                hill stations to magnificent forts, beaches, temples and
                vibrant cities, every region offers travellers something
                different.
              </p>

              <p className="mt-3">
                Our India tour packages are designed to make holiday planning
                convenient with thoughtfully planned itineraries covering
                popular destinations such as Kashmir, Rajasthan, Himachal
                Pradesh, Kerala, Gujarat, Uttar Pradesh and many more.
                Travellers can explore family holidays, group departures,
                speciality tours and customized holiday options according to
                their travel preferences.
              </p>

              {showMore && (
                <>
                  <p className="mt-3">
                    Whether you are planning your first India holiday, a
                    relaxing family vacation, a cultural journey, a spiritual
                    tour or a scenic mountain escape, choosing the right
                    itinerary helps you enjoy the destination comfortably.
                    Package duration, departure city, season and travel style
                    can all be considered while selecting your preferred tour.
                  </p>

                  <p className="mt-3">
                    Explore the available packages above, compare destinations
                    and select a holiday that matches your travel plans and
                    budget.
                  </p>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="mt-3 flex items-center gap-1 text-[10px] font-semibold underline"
            >
              {showMore ? "Read Less" : "Read More"}

              {showMore ? (
                <ChevronUp size={12} />
              ) : (
                <ChevronDown size={12} />
              )}
            </button>

            <div className="mt-6 border-t border-[#ddd] pt-4">
              <p className="text-[8px] text-[#999]">
                India Tours | Honor Tour & Travels Holiday Packages | All prices and
                tour information are subject to availability and selected
                itinerary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CONTACT STRIP
      ========================================== */}
      <section className="border-t border-[#ddd] bg-white">
        <div className="india-container">
          <div className="grid min-h-[72px] grid-cols-2 items-center gap-4 py-3 md:grid-cols-5">
            
            <div className="flex items-center gap-3">
              <MapPin size={17} className="text-[#0F4C81]" />

              <div>
                <p className="text-[8px] text-[#777]">
                  150+ Honor Tour & Travels Offices
                </p>

                <button className="text-[10px] font-semibold underline">
                  Locate Us
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={17} className="text-[#0F4C81]" />

              <div>
                <p className="text-[8px] text-[#777]">
                  Request a Quote
                </p>

                <a
                  href={CONTACT.phoneHref}
                  className="text-[10px] font-semibold underline"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MessageSquare
                size={17}
                className="text-[#0F4C81]"
              />

              <div className="min-w-0">
                <p className="text-[8px] text-[#777]">
                  For Feedback
                </p>

                <span className="break-all text-[9px] font-semibold">
                  {CONTACT.email}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={17} className="text-[#0F4C81]" />

              <div className="min-w-0">
                <p className="text-[8px] text-[#777]">
                  For Enquiries
                </p>

                <span className="break-all text-[9px] font-semibold">
                  {CONTACT.email}
                </span>
              </div>
            </div>

            <div>
  <p className="mb-2 text-[8px] text-[#777]">
    Connect with us
  </p>

  <div className="flex gap-2">
    <button
      type="button"
      aria-label="Facebook"
      className="flex h-6 w-6 items-center justify-center rounded-full bg-[#17202a] text-[11px] font-bold text-white"
    >
      f
    </button>

    <button
      type="button"
      aria-label="Instagram"
      className="flex h-6 w-6 items-center justify-center rounded-full bg-[#17202a] text-[9px] font-bold text-white"
    >
      IG
    </button>

    <button
      type="button"
      aria-label="YouTube"
      className="flex h-6 w-6 items-center justify-center rounded-full bg-[#17202a] text-[8px] font-bold text-white"
    >
      ▶
    </button>

    <button
      type="button"
      aria-label="LinkedIn"
      className="flex h-6 w-6 items-center justify-center rounded-full bg-[#17202a] text-[8px] font-bold text-white"
    >
      in
    </button>
  </div>
</div>

          </div>
        </div>
      </section>
    </>
  );
}   