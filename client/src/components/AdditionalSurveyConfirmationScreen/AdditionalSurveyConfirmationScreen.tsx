import { Button, Icon } from "@ama-pt/agora-design-system";
import "./AdditionalSurveyConfirmationScreen.css";

const AdditionalSurveyConfirmationScreen = () => {
  return (

    <div className="additional-confirmation-container">
      <Icon
      aria-hidden
      name="agora-line-check-circle"
      className="additional-confirmation-icon"
    />
      <h1 className="additional-confirmation-title">
        Obrigada pela sua <span>opinião</span>
      </h1>
      <p>Avaliação submetida com sucesso.</p>

      <Button
        className="confirm-button"
        hasIcon
        leadingIcon="agora-line-arrow-right-circle"
        leadingIconHover="agora-line-arrow-right-circle"
        onClick={() => window.location.reload()}
      >
        Voltar à pagina
      </Button>
    </div>  
  );
};

export default AdditionalSurveyConfirmationScreen;
