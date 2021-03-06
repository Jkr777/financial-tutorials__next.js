import { useState, useContext } from "react";
import axios from "axios";
import NotificationContext from "../../context/notification";
import authFormStyles from "../../components/_auth/auth.module.css";

function Reset() {
  const [email, setEmail] = useState("");
  const { setNotification } = useContext(NotificationContext);
  
  const handleEmailChange = e => setEmail(e.target.value);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post('/api/reset', {email});

      setNotification(`Please, check your email and follow the instructions, an reset email was send to:${email}`);
    } catch (error) {
      setNotification(error.response.data);
    }

    setEmail("");
  }

  return (
    <section className={authFormStyles.container}>
      <h1 className={authFormStyles.container__title}>Reset your password</h1>
      <form className={authFormStyles.form} onSubmit={handleSubmit}>
      <input
          className={authFormStyles.form__input}
          name="email"
          type="email"
          maxLength="255"
          minLength="5"
          required
          placeholder="email"
          autoComplete="email"
          value={email}
          onChange={handleEmailChange}
        />
      <button className={authFormStyles.form__btn}>Rsset</button>
      </form>
    </section>
  );
}

export default Reset;