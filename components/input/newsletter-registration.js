import { useRef } from "react";
import classes from "./newsletter-registration.module.css";
import { useContext } from "react";
import NotificationContext from "@/store/notification-context";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for the newsletter...",
      status: "pending",
    });

    const response = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: { "Content-Type": "application/json" },
    });
    // Using fetch to send the request

    if (!response.ok) {
      const data = await response.json();
      notificationCtx.showNotification({
        title: "Error signing up",
        message: data.message || "Something went wrong.",
        status: "error",
      });
      return;
    }
    const data = await response.json();
    notificationCtx.showNotification({
      title: "Success!",
      message: "Successfully registered for the newsletter!",
      status: "success",
    });
    emailInputRef.current.value = "";
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
