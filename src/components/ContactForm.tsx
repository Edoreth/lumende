"use client";

import { useState } from "react";
import { site } from "@/data/site";

const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "project", label: "Project", type: "text", autoComplete: "off" },
] as const;

export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // No backend yet: compose an email in the visitor's own client.
    const subject = `Inquiry — ${values.project || "New project"}`;
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Project: ${values.project}`,
      "",
      values.message,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  return (
    <form onSubmit={submit} className="flex flex-col gap-8">
      {fields.map((f) => (
        <label key={f.name} className="group flex flex-col gap-2">
          <span className="label">{f.label}</span>
          <input
            type={f.type}
            name={f.name}
            autoComplete={f.autoComplete}
            required={f.name !== "project"}
            value={values[f.name]}
            onChange={set(f.name)}
            className="border-b border-line bg-transparent pb-3 font-serif text-[clamp(1.25rem,3vw,2rem)] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-ink"
          />
        </label>
      ))}
      <label className="flex flex-col gap-2">
        <span className="label">Message</span>
        <textarea
          name="message"
          rows={3}
          required
          value={values.message}
          onChange={set("message")}
          className="resize-none border-b border-line bg-transparent pb-3 font-serif text-[clamp(1.25rem,3vw,2rem)] text-ink outline-none transition-colors focus:border-ink"
        />
      </label>
      <button
        type="submit"
        className="label mt-4 self-start border border-line px-8 py-4 !text-ink transition-colors hover:border-ink hover:bg-ink hover:!text-ground"
      >
        Send Inquiry
      </button>
    </form>
  );
}
