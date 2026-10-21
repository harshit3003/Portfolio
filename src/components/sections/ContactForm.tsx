"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { submitContact, type ContactPayload } from "@/lib/contact";
import { EASE } from "@/lib/motion";

type Errors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: ContactPayload): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Tell me a little more (at least 10 characters).";
  return e;
}

export default function ContactForm() {
  const [values, setValues] = useState<ContactPayload>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactPayload, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof ContactPayload;
    const next = { ...values, [name]: e.target.value };
    setValues(next);
    if (touched[name]) setErrors(validate(next));
  };

  const onBlur = (name: keyof ContactPayload) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    const result = await submitContact({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    });
    setStatus(result.ok ? "sent" : "error");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="glass space-y-6 p-6 sm:p-8" aria-label="Contact form">
      <Field
        label="Name"
        name="name"
        autoComplete="name"
        value={values.name}
        error={touched.name ? errors.name : undefined}
        onChange={onChange}
        onBlur={() => onBlur("name")}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        value={values.email}
        error={touched.email ? errors.email : undefined}
        onChange={onChange}
        onBlur={() => onBlur("email")}
      />
      <Field
        label="Message"
        name="message"
        multiline
        value={values.message}
        error={touched.message ? errors.message : undefined}
        onChange={onChange}
        onBlur={() => onBlur("message")}
      />

      <div className="flex flex-wrap items-center gap-4">
        <MagneticButton type="submit" variant="primary" disabled={status === "sending"}>
          {status === "sending" ? "Opening mail app…" : "Send message"} <Send size={15} aria-hidden />
        </MagneticButton>

        <div role="status" aria-live="polite" className="min-h-6 text-sm">
          <AnimatePresence mode="wait">
            {status === "sent" && (
              <motion.p
                key="sent"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2 text-accent-b"
              >
                <Check size={16} aria-hidden /> Your mail app should open with the message ready to send.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500">
                Something went wrong. Please email me directly.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: keyof ContactPayload;
  value: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
}

/** Underline-style field: label tints and a gradient line sweeps in on focus. */
function Field({ label, name, value, error, type = "text", autoComplete, multiline, onChange, onBlur }: FieldProps) {
  const id = useId();
  const errId = `${id}-err`;
  const [focused, setFocused] = useState(false);

  const shared = {
    id,
    name,
    value,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => {
      setFocused(false);
      onBlur();
    },
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errId : undefined,
    "aria-required": true,
    className:
      "w-full bg-transparent pb-2 pt-1 text-base text-fg outline-none placeholder:text-muted/60 focus-visible:outline-none",
  } as const;

  return (
    <div>
      <label
        htmlFor={id}
        className={`font-mono text-xs transition-colors duration-200 ${focused ? "text-accent-b" : "text-muted"}`}
      >
        {label}
      </label>
      <div className="relative mt-1">
        {multiline ? (
          <textarea {...shared} rows={5} className={`${shared.className} resize-none`} />
        ) : (
          <input {...shared} type={type} autoComplete={autoComplete} />
        )}
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-fg/15" />
        <motion.span
          aria-hidden
          className="bg-accent-gradient absolute inset-x-0 bottom-0 h-0.5 origin-left"
          initial={false}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={errId}
            role="alert"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pt-2 text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
