import React, { useState, ChangeEvent } from "react";
import StarRating from "../Rating";

const Feedback: React.FC = () => {
  const [foundWhatYouSearchedFor, setFoundWhatYouSearchedFor] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState<string>("");

  const handleFoundWhatYouSearchedFor = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (foundWhatYouSearchedFor.includes(value)) {
      setFoundWhatYouSearchedFor(
        foundWhatYouSearchedFor.filter((item) => item !== value)
      );
    } else {
      setFoundWhatYouSearchedFor([...foundWhatYouSearchedFor, value]);
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFeedbackText(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = {
      foundWhatYouSearchedFor,
      rating,
      feedbackText,
    };

    try {
      const response = await fetch("http://localhost:3001/submit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Formulário enviado com sucesso!");
      } else {
        console.error("Erro ao enviar o formulário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h1>DÊ-NOS A SUA OPINIÃO SOBRE ESTA PÁGINA</h1>
      <h2>Envie-nos o seu Feedback</h2>
      <p>
        Dê-nos a sua opinião sobre os conteúdos desta página. Pode deixar-nos um
        comentário sobre o que podemos melhorar. Não vai receber resposta ao seu
        comentário.
      </p>
      <p>
        Use o <a href="https://eportugal.gov.pt/contactos#formulario">formulário de contacto</a> 
        para esclarecer dúvidas sobre a informação
        e os serviços disponibilizados neste portal.
      </p>
      <pre>* campo obrigatório</pre>
      <div className="label">
        <label>Encontrou o que procurava?*:</label>
        <div className="checkbox-group">
          <label className="checkbox">
            Sim
            <input
              type="radio"
              name="foundWhatYouSearchedFor"
              value="Sim"
              checked={foundWhatYouSearchedFor.includes("Sim")}
              onChange={handleFoundWhatYouSearchedFor}
            />
          </label>
          <label className="checkbox">
            Não
            <input
              type="radio"
              name="foundWhatYouSearchedFor"
              value="Não"
              checked={foundWhatYouSearchedFor.includes("Não")}
              onChange={handleFoundWhatYouSearchedFor}
            />
          </label>
          <label className="checkbox">
            Parcialmente
            <input
              type="radio"
              name="foundWhatYouSearchedFor"
              value="Parcialmente"
              checked={foundWhatYouSearchedFor.includes("Parcialmente")}
              onChange={handleFoundWhatYouSearchedFor}
            />
          </label>
        </div>
      </div>
      <div className="label">
        <label>Classifique a sua experiência*</label>
        <div className="rating-content">
        <span>Muito má</span>
        <StarRating
          rating={rating}
          onChange={handleRatingChange}
          className="star-rating"
        />
        <span>Muito boa</span>
        </div>
      </div>
      <div className="feedback-group">
        <label>Comentário</label>
        <textarea
          placeholder="Em que podemos melhorar?"
          className="feedback-text"
          value={feedbackText}
          onChange={handleFeedbackChange}
          rows={5}
          cols={30}
        />
      </div>
      <button className="submit-button" type="submit">
        Enviar feedback
      </button>
    </form>
  );
};

export default Feedback
