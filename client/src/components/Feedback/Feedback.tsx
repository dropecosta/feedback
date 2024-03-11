import React, { useState, ChangeEvent, MouseEvent } from "react";
import StarRating from "../Rating";
import { Button, Icon } from "@ama-pt/agora-design-system";
import "@ama-pt/agora-design-system/dist/index.css";
import FeedbackSubmissionConfirmation from "../FeedbackSubmissionConfirmation";

const Feedback: React.FC = () => {
  const [foundWhatYouSearchedFor, setFoundWhatYouSearchedFor] = useState<
    string[]
  >([]);
  const [rating, setRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
  const [positiveFeedback, setPositiveFeedback] = useState<boolean>(false);
  const [negativeFeedback, setNegativeFeedback] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
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
        setShowConfirmation(true);
      } else {
        console.error("Erro ao enviar o formulário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    const buttonValue = (event.target as HTMLButtonElement).innerText;
    setAccordionOpen(true);
    setSubmitted(false);
    if (buttonValue === "Sim") {
      setPositiveFeedback(true);
      setNegativeFeedback(false);
    } else {
      setPositiveFeedback(false);
      setNegativeFeedback(true);
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      {!showConfirmation ? (<>
      <div className="feedback-content">
        <div className="feedback-heading">
          <h1>O conteúdo da página foi útil?</h1>
          <p>Avalie a experiência da página e deixe-nos um comentário.</p>
        </div>
        <div className="feedback-buttons">
          <Button
            className={positiveFeedback ? "success-button-clicked" : "success-button"}
            appearance="outline"
            hasIcon
            leadingIcon="agora-line-thumbs-up"
            leadingIconHover="agora-line-thumbs-up"
            variant="success"
            onClick={handleButtonClick}
          >
            Sim
          </Button>
          <Button
            className={negativeFeedback ? "danger-button-clicked" : "danger-button"}
            appearance="outline"
            hasIcon
            leadingIcon="agora-line-thumbs-down"
            leadingIconHover="agora-line-thumbs-down"
            variant="danger"
            onClick={handleButtonClick}
          >
            Não
          </Button>
        </div>
        {positiveFeedback && (
          <div className="thank-you-message">Agradecemos o seu contributo.</div>
        )}
        {negativeFeedback && (
          <div className="thank-you-message">Agradecemos o seu feedback.</div>
        )}
      </div>
      <div className="accordion">
        {accordionOpen && (
          <div className={`accordion-content ${accordionOpen ? "active" : ""}`}>
            <p>Encontrou o que procurava?</p>
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

            <div className="rating">
              <label>Classifique a sua experiência nesta página</label>
              <div className="rating-content">
                <StarRating
                  rating={rating}
                  onChange={handleRatingChange}
                  className="star-rating"
                />
              </div>
            </div>
            <div className="feedback-group">
              <label>Em que podemos melhorar nesta página?</label>
              <textarea
                placeholder="Deixe aqui o seu comentário ou sugestão"
                className="feedback-text"
                value={feedbackText}
                onChange={handleFeedbackChange}
                rows={5}
                cols={30}
              />
              <span className="feedback-warning">
              <Icon
                aria-hidden
                name="agora-solid-alert-circle"
              />
              Este campo é opcional.
              </span>
            </div>
            <button className="submit-button" type="submit">
              Enviar feedback
            </button>

            <Button
              className="submit-button" 
              type="submit"
              hasIcon
              leadingIcon="agora-line-arrow-right-circle"
              leadingIconHover="agora-line-arrow-right-circle"
            >
              Enviar avaliação
            </Button>

          </div>
        )}

      </div>
      </>) : (
        <FeedbackSubmissionConfirmation />
      )}
    </form>
  );
};

export default Feedback
