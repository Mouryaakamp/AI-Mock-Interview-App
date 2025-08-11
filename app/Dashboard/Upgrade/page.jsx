"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UpgradePage() {
  const [selected, setSelected] = useState("yearly"); // default highlight yearly

  const plans = {
    monthly: {
      title: "Monthly",
      price: "₹799",
      subtitle: "per month",
      features: [
        "All interview questions",
        "Access to mock tests",
        "Email support",
      ],
    },
    yearly: {
      title: "Yearly",
      price: "₹6,999",
      subtitle: "per year (save 27%)",
      features: [
        "All interview questions",
        "Unlimited mock tests",
        "Priority support",
        "Offline downloads",
      ],
    },
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">Choose your plan</h1>
          <p className="text-gray-600 mt-2">
            Pick a plan that fits your practice goals — yearly gives the best value.
          </p>
        </header>

        <section className="flex flex-col md:flex-row gap-6 items-stretch">
          {/* Monthly Card */}
          <article
            className={`flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transform transition-all
              ${selected === "monthly" ? "ring-2 ring-offset-2 ring-blue-300 scale-100" : "hover:scale-[1.02]"}`}
            aria-labelledby="monthly-title"
          >
            <div className="flex items-center justify-between">
              <h2 id="monthly-title" className="text-xl font-semibold"> {plans.monthly.title} </h2>
              <span className="text-sm text-gray-500">No commitment</span>
            </div>

            <div className="mt-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold">{plans.monthly.price}</span>
                <span className="text-sm text-gray-500">{plans.monthly.subtitle}</span>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                {plans.monthly.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 text-green-600">●</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Button
                  onClick={() => setSelected("monthly")}
                  className={`w-full ${selected === "monthly" ? "" : "bg-white text-black border"}`}
                >
                  Choose Monthly
                </Button>
              </div>
            </div>
          </article>

          {/* Yearly Card - more attractive */}
          <article
            className={`relative flex-1 rounded-3xl p-6 bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-600 text-white shadow-xl transform transition-all
              ${selected === "yearly" ? "scale-[1.03] ring-4 ring-offset-4 ring-indigo-300" : "hover:scale-[1.02]"}`}
            aria-labelledby="yearly-title"
          >
            <div className="absolute -top-3 left-4">
              <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur">
                Best Value
              </span>
            </div>

            <div className="flex items-center justify-between">
              <h2 id="yearly-title" className="text-2xl font-bold"> {plans.yearly.title} </h2>
              <span className="text-sm/none opacity-90">{plans.yearly.subtitle}</span>
            </div>

            <div className="mt-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold">{plans.yearly.price}</span>
                <span className="text-sm opacity-90">{plans.yearly.subtitle}</span>
              </div>

              <ul className="mt-6 space-y-3 text-sm">
                {plans.yearly.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 text-white/90">●</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Button
                  onClick={() => setSelected("yearly")}
                  className="w-full bg-white text-indigo-700 font-bold"
                >
                  Get Yearly (Save)
                </Button>
              </div>

              <p className="mt-3 text-xs opacity-90">
                Billed annually. You can cancel anytime; prorated refunds may apply.
              </p>
            </div>
          </article>
        </section>

        {/* Extra: small comparison row */}
        <section className="mt-8 bg-white rounded-lg p-4 shadow-inner">
          <div className="text-sm text-gray-700">
            <strong>Quick comparison:</strong> Yearly includes priority support and offline access.
            Monthly is flexible if you want to try first.
          </div>
        </section>
      </div>
    </main>
  );
}
