"use client";

import { useEffect, useState } from "react";

const baseUrl =
  "https://dinesh-sagel-backend.onrender.com";

export default function Footer() {
  const [num1, setNum1] =
    useState(0);

  const [num2, setNum2] =
    useState(0);

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ================= FORM DATA =================

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      message: "",
    });

  // ================= RANDOM CAPTCHA =================

  const generateNumbers =
    () => {
      const first =
        Math.floor(
          Math.random() * 20
        ) + 1;

      const second =
        Math.floor(
          Math.random() * 20
        ) + 1;

      setNum1(first);
      setNum2(second);
    };

  useEffect(() => {
    generateNumbers();
  }, []);

  // ================= HANDLE INPUT =================

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setFormData(
      (current) => ({
        ...current,

        [event.target.name]:
          event.target.value,
      })
    );
  }

  // ================= SUBMIT =================

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    // ================= CAPTCHA =================

    if (
      Number(answer) !==
      num1 + num2
    ) {
      alert(
        "Wrong Answer ❌"
      );

      return;
    }

    try {
      setLoading(true);

      // ================= API =================

      const response =
        await fetch(
          `${baseUrl}/api/enquiries`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name: formData.name,

              email:
                formData.email,

              message:
                formData.message,
            }),
          }
        );

      const data =
        await response.json();

      console.log(
        "ENQUIRY RESPONSE =>",
        data
      );

      // ================= SUCCESS =================

      if (data.success) {
        alert(
          "Enquiry Submitted ✅"
        );

        // RESET FORM

        setFormData({
          name: "",
          email: "",
          message: "",
        });

        setAnswer("");

        generateNumbers();
      } else {
        alert(
          data.message ||
            "Submission failed ❌"
        );
      }
    } catch (error) {
      console.log(error);

      alert(
        "Something went wrong ❌"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="bg-[#06a7b5] px-5 py-16 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
        {/* LEFT IMAGE */}

        <div>
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
            alt="fitness"
            className="h-[450px] w-full rounded object-cover"
          />

          <p className="mt-5 text-lg font-bold">
            “Ready To Lose Fat ,
            DineshSehgal Me”
          </p>
        </div>

        {/* CENTER IMAGE */}

        <div>
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop"
            alt="coach"
            className="h-[450px] w-full rounded object-cover"
          />
        </div>

        {/* RIGHT FORM */}

        <div className="flex flex-col justify-center">
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >
            {/* TOP INPUTS */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                placeholder="Name"
                required
                className="h-14 w-full border-none bg-white px-5 text-black outline-none"
              />

              <input
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                placeholder="Email Address"
                required
                className="h-14 w-full border-none bg-white px-5 text-black outline-none"
              />
            </div>

            {/* MESSAGE */}

            <textarea
              rows={7}
              name="message"
              value={
                formData.message
              }
              onChange={
                handleChange
              }
              placeholder="Message"
              required
              className="w-full border-none bg-white p-5 text-black outline-none"
            />

            {/* CAPTCHA */}

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-light text-white">
                  {num1} + {num2} =
                </span>

                <input
                  type="text"
                  value={answer}
                  onChange={(
                    e
                  ) =>
                    setAnswer(
                      e.target
                        .value
                    )
                  }
                  className="h-16 w-20 bg-white text-center text-2xl font-bold text-black outline-none"
                />
              </div>

              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                disabled={
                  loading
                }
                className="h-16 rounded-[20px] border-2 border-white px-10 text-2xl font-semibold text-white transition hover:bg-white hover:text-[#06a7b5]"
              >
                {loading
                  ? "Submitting..."
                  : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
}