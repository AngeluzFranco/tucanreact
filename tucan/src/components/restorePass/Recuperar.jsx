import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Recuperar = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Nuevo estado para éxito
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/users/send-reset-email/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Por favor, revise su correo electrónico para continuar.");
      setSuccess(true); // Indicar éxito
      setLoading(false);
      setTimeout(() => navigate("/login"), 5000); // Navegar después de 5 segundos
    } else {
      setMessage(data.error);
      setSuccess(false); // Indicar error
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" style={{ width: "5rem", height: "5rem" }} role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
      className="page"
    >
      <div className="container mt-5">
        <h2 className="text-center">Recuperar Contraseña</h2>
        <p className="text-center">Ingrese el correo electrónico de su cuenta</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            className="form-control"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <button className="btn btn-primary w-100" type="submit">Enviar</button>
        </form>
        {message && (
          <div className={`alert mt-4 ${success ? "alert-success" : "alert-danger"}`} role="alert">
            {message}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Recuperar;