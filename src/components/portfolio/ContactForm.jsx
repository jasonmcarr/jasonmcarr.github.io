import React, { useRef, useState } from "react";
import Arrow from "./Arrow";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const form = useRef(null);
  const [status, setStatus] = useState("idle");
  async function send(event) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      await emailjs.sendForm(
        "service_722xc9m",
        "template_4kk2hi8",
        form.current,
        "vaLTp_jZUdg-Uncrq",
      );
      form.current.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }
  return (
    <form ref={form} onSubmit={send} className="contact-form">
      <h2>Send a message.</h2>
      <label htmlFor="contact-name">Name</label>
      <input id="contact-name" name="user_name" autoComplete="name" required />
      <label htmlFor="contact-email">Email</label>
      <input
        id="contact-email"
        name="user_email"
        type="email"
        autoComplete="email"
        required
      />
      <label htmlFor="contact-message">Message</label>
      <textarea id="contact-message" name="message" rows={5} required />
      <button
        type="submit"
        className="button primary"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          "Sending…"
        ) : (
          <>
            Send message <Arrow />
          </>
        )}
      </button>
      <p role="status">
        {status === "sent"
          ? "Message sent. Thank you for getting in touch."
          : status === "error"
            ? "The message could not be sent. Please try again or use the email link above."
            : ""}
      </p>
    </form>
  );
}
