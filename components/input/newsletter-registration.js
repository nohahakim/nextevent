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

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // 🌟 Step 2.2.2.1: Check response status
        // ✅ Validates if request succeeded
        if (response.ok) {
          return response.json();
        }
        // ❌ Throws error if response is not OK
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        // 🌟 Step 2. ceremonial2.2: Show success notification
        // ✅ Confirms successful registration
        notificationCtx.showNotification({
          title: "Success",
          message: "Successfully registered for newsletter!",
          status: "success",
        });
      })
      .catch((error) => {
        // 🌟 Step 2.2.3: Show error notification
        // ❌ Reports failure with error message
        notificationCtx.showNotification({
          title: "Error",
          message: error.message || "Something went wrong",
          status: "error",
        });
      });
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
