import React, { useState } from "react";
import Detail from "../../assets/Detail.svg";
import YourEurope from "../../assets/your-europe.png";
import "./FeedbackSubmissionConfirmation.css";
import { Button, Icon } from "@ama-pt/agora-design-system";
import AdditionalSurveyForm from "../AdditionalSurveyForm";

export default function FeedbackSubmissionConfirmation() {
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const yourEurope = true;

  return (
    <div>
      {!showAdditionalForm && (
        <>
          <img src={Detail} alt="Detalhe" className="detail-svg" />
          <h1 className="feedback-confirmation-title">
            Obrigado pela sua <span>opinião!</span>
          </h1>
          <p className="feedback-confirmation-subtitle">
            Avaliação submetida com sucesso.
          </p>
        </>
      )}

      {yourEurope && (
        <>
          {showAdditionalForm ? (
            <AdditionalSurveyForm />
          ) : (
            <>
              <p className="feedback-confirmation-description">
                Gostaria que a sua opinião fosse ouvida na União Europeia?
                Responda a este inquérito adicional.
              </p>
              <div className="feedback-confirmation-button your-europe">
                <Button
                  appearance="link"
                  variant="primary"
                  onClick={() => setShowAdditionalForm(true)}
                >
                  Responder a um inquérito adicional
                </Button>
                <Icon aria-hidden name="agora-line-arrow-right-circle" />
              </div>
              <img
                src={YourEurope}
                alt="Logo Your Europe"
                className="logo-your-europe"
              />
            </>
          )}
        </>
      )}
      {!showAdditionalForm && (
        <>
          <p className="feedback-confirmation-description">
            Vamos analisar o seu comentário com atenção, no entanto, não
            receberá uma resposta. Se precisar de ajuda, fale connosco através
            do nosso formulário.
          </p>
          <div className="feedback-confirmation-button">
            <Button appearance="link" variant="primary">
              Formulário de contato
            </Button>
            <Icon aria-hidden name="agora-line-arrow-right-circle" />
          </div>
        </>
      )}
    </div>
  );
}
