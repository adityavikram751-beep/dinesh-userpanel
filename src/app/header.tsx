"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ================= TYPES =================

type DropdownItem = {
  href: string;
  label: string;
  desc: string;
  icon: string;
};

type NavItem =
  | {
      href: string;
      label: string;
    }
  | {
      label: string;
      dropdown: DropdownItem[];
    };

// ================= NAV ITEMS =================

const navItems: NavItem[] = [
  {
    href: "/",
    label: "HOME",
  },

  {
    label: "ONLINE TRAINING",

    dropdown: [
      {
        href: "/fitness-plan",

        label:
          "Transformation Plans",

        desc:
          "Workout & Transformation",

        icon: "🔥",
      },

      {
        href:
          "/fitness-plan/dietplan",

        label: "Diet Plans",

        desc:
          "Nutrition & Meal Plans",

        icon: "🥗",
      },

      {
        href:
          "/fitness-plan/consultation",

        label:
          "Video Consultation",

        desc:
          "1-on-1 Expert Guidance",

        icon: "📞",
      },
    ],
  },

  {
    href: "/blog",
    label: "BLOG",
  },

  {
    href: "/about",
    label: "ABOUT",
  },

  {
    href: "/contact",
    label: "CONTACT",
  },
];

export default function Header() {
  const pathname =
    usePathname();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [
    dropdownOpen,
    setDropdownOpen,
  ] = useState(false);

  return (
    <>
      {/* ================= OVERLAY ================= */}

      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() =>
            setDropdownOpen(
              false
            )
          }
        />
      )}

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/90 backdrop-blur-2xl">
        <nav className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          
          {/* ================= LOGO ================= */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-sm font-black text-white shadow-lg">
              DS
            </div>

            <div className="leading-tight">
              <h2 className="text-lg font-black uppercase tracking-wide">
                Dinesh
                <span className="text-lime-500">
                  Sehgal
                </span>
              </h2>

              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Fitness Coach
              </p>
            </div>
          </Link>

          {/* ================= DESKTOP MENU ================= */}

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => {
              // ================= DROPDOWN =================

              if (
                "dropdown" in item
              ) {
                return (
                  <div
                    key={
                      item.label
                    }
                    className="relative"
                  >
                    {/* BUTTON */}

                    <button
                      onClick={(
                        e
                      ) => {
                        e.stopPropagation();

                        setDropdownOpen(
                          !dropdownOpen
                        );
                      }}
                      className={`flex items-center gap-2 text-[14px] font-black tracking-[0.14em] transition ${
                        dropdownOpen
                          ? "text-orange-500"
                          : "text-zinc-800 hover:text-orange-500"
                      }`}
                    >
                      {
                        item.label
                      }

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition duration-300 ${
                          dropdownOpen
                            ? "rotate-180"
                            : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={
                          2.5
                        }
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* ================= DROPDOWN ================= */}

                    <div
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                      className={`absolute left-1/2 top-[68px] z-50 w-[300px] -translate-x-1/2 overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-300 ${
                        dropdownOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-2 opacity-0"
                      }`}
                    >
                      {/* TOP */}

                      <div className="border-b border-zinc-100 px-5 py-4">
                        <h3 className="text-xl font-black text-zinc-900">
                          Online Training
                        </h3>
                      </div>

                      {/* ITEMS */}

                      <div className="p-2">
                        {item.dropdown.map(
                          (
                            subItem
                          ) => {
                            const isActive =
                              pathname ===
                              subItem.href;

                            return (
                              <Link
                                key={
                                  subItem.href
                                }
                                href={
                                  subItem.href
                                }
                                onClick={() =>
                                  setDropdownOpen(
                                    false
                                  )
                                }
                                className={`relative mt-2 flex items-center justify-between overflow-hidden rounded-2xl px-4 py-4 transition-all duration-300 ${
                                  isActive
                                    ? "bg-orange-50"
                                    : "hover:bg-zinc-100"
                                }`}
                              >
                                {/* ACTIVE BAR */}

                                {isActive && (
                                  <div className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-orange-500" />
                                )}

                                {/* LEFT */}

                                <div className="flex items-center gap-3">
                                  {/* ICON */}

                                  <div
                                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${
                                      isActive
                                        ? "bg-orange-100"
                                        : "bg-zinc-100"
                                    }`}
                                  >
                                    {
                                      subItem.icon
                                    }
                                  </div>

                                  {/* TEXT */}

                                  <div>
                                    <h4
                                      className={`text-[15px] font-black ${
                                        isActive
                                          ? "text-orange-500"
                                          : "text-zinc-900"
                                      }`}
                                    >
                                      {
                                        subItem.label
                                      }
                                    </h4>

                                    <p
                                      className={`mt-1 text-[11px] ${
                                        isActive
                                          ? "text-orange-400"
                                          : "text-zinc-500"
                                      }`}
                                    >
                                      {
                                        subItem.desc
                                      }
                                    </p>
                                  </div>
                                </div>

                                {/* RIGHT */}

                                <div
                                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm transition ${
                                    isActive
                                      ? "bg-orange-500 text-white"
                                      : "bg-zinc-100 text-zinc-500"
                                  }`}
                                >
                                  →
                                </div>
                              </Link>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              // ================= NORMAL LINKS =================

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[14px] font-black tracking-[0.14em] transition ${
                    pathname ===
                    item.href
                      ? "text-orange-500"
                      : "text-zinc-800 hover:text-orange-500"
                  }`}
                >
                  {item.label}

                  {pathname ===
                    item.href && (
                    <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-orange-500" />
                  )}
                </Link>
              );
            })}

            {/* CTA */}

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              className="rounded-2xl bg-black px-6 py-3 text-sm font-black text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-zinc-800"
            >
              Join Now
            </a>
          </div>

          {/* ================= MOBILE BUTTON ================= */}

          <button
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300 text-xl lg:hidden"
          >
            {menuOpen
              ? "✕"
              : "☰"}
          </button>
        </nav>

        {/* ================= MOBILE MENU ================= */}

        <div
          className={`overflow-hidden border-t border-zinc-200 bg-white transition-all duration-300 lg:hidden ${
            menuOpen
              ? "max-h-[900px] py-5"
              : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-3 px-5">
            {navItems.map((item) => {
              if (
                "dropdown" in item
              ) {
                return (
                  <div
                    key={
                      item.label
                    }
                    className="overflow-hidden rounded-[24px] border border-zinc-200 bg-zinc-50"
                  >
                    {/* BUTTON */}

                    <button
                      onClick={() =>
                        setDropdownOpen(
                          !dropdownOpen
                        )
                      }
                      className="flex w-full items-center justify-between px-5 py-5 text-sm font-black tracking-[0.14em]"
                    >
                      {
                        item.label
                      }

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transition duration-300 ${
                          dropdownOpen
                            ? "rotate-180"
                            : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={
                          2.5
                        }
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* ================= MOBILE ITEMS ================= */}

                    <div
                      className={`grid transition-all duration-300 ${
                        dropdownOpen
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-3 border-t border-zinc-200 p-3">
                          {item.dropdown.map(
                            (
                              subItem
                            ) => {
                              const isActive =
                                pathname ===
                                subItem.href;

                              return (
                                <Link
                                  key={
                                    subItem.href
                                  }
                                  href={
                                    subItem.href
                                  }
                                  onClick={() => {
                                    setMenuOpen(
                                      false
                                    );

                                    setDropdownOpen(
                                      false
                                    );
                                  }}
                                  className={`relative flex items-center gap-4 overflow-hidden rounded-[24px] border px-4 py-4 shadow-sm transition-all duration-300 ${
                                    isActive
                                      ? "border-orange-200 bg-orange-50 shadow-orange-100"
                                      : "border-zinc-200 bg-white"
                                  }`}
                                >
                                  {/* ACTIVE BAR */}

                                  {isActive && (
                                    <div className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-orange-500" />
                                  )}

                                  {/* ICON */}

                                  <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${
                                      isActive
                                        ? "bg-orange-100"
                                        : "bg-zinc-100"
                                    }`}
                                  >
                                    {
                                      subItem.icon
                                    }
                                  </div>

                                  {/* TEXT */}

                                  <div className="flex-1">
                                    <h4
                                      className={`text-[15px] font-black ${
                                        isActive
                                          ? "text-orange-500"
                                          : "text-zinc-900"
                                      }`}
                                    >
                                      {
                                        subItem.label
                                      }
                                    </h4>

                                    <p
                                      className={`mt-1 text-[12px] ${
                                        isActive
                                          ? "text-orange-400"
                                          : "text-zinc-500"
                                      }`}
                                    >
                                      {
                                        subItem.desc
                                      }
                                    </p>
                                  </div>

                                  {/* RIGHT */}

                                  <div
                                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm transition ${
                                      isActive
                                        ? "bg-orange-500 text-white"
                                        : "bg-zinc-100 text-zinc-500"
                                    }`}
                                  >
                                    →
                                  </div>
                                </Link>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setMenuOpen(
                      false
                    )
                  }
                  className={`rounded-2xl px-2 py-3 text-sm font-black tracking-[0.14em] ${
                    pathname ===
                    item.href
                      ? "text-orange-500"
                      : "text-zinc-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* CTA */}

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              className="mt-3 flex items-center justify-center rounded-2xl bg-black px-5 py-4 text-sm font-black text-white shadow-lg"
            >
              Join Now
            </a>
          </div>
        </div>
      </header>
    </>
  );
}