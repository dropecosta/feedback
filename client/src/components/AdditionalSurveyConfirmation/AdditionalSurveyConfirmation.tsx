import { Button, Icon } from "@ama-pt/agora-design-system";
import "./AdditionalSurveyConfirmation.css";

const buttonArgs = {
  children: 'Fechar',
  hasIcon: true,
  leadingIcon: 'agora-line-x',
  leadingIconHover: 'agora-solid-x',
  onClick: () => window.location.reload()
};

const AdditionalSurveyConfirmation = () => {
  return (
    <div className="additional-confirmation-container">
      <div className="button-close">
        <Button {...buttonArgs} appearance="link"/>
      </div>
      <div className="additional-confirmation-wrapper">
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
    </div>  
  );
};

export default AdditionalSurveyConfirmation
