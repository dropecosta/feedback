import React, { ChangeEvent, MouseEventHandler, useState } from "react";
import YourEurope from "../../assets/your-europe.png";
import StarRating from "../Rating/Rating";
import AdditionalSurveyConfirmation from "../AdditionalSurveyConfirmation";
import { Button, RadioButton } from "@ama-pt/agora-design-system";
import "./AdditionalSurvey.css";

const AdditionalSurvey = () => {
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);
  const [lastUpdateAvailable, setLastUpdateAvailable] = useState<string[]>([]);
  const [authorityResponsibleAvailable, setAuthorityResponsibleAvailable] = useState<string[]>([]);
  const [legislationReferences, setLegislationReferences] = useState<string[]>([]);
  const [informationInEnglish, setInformationInEnglish] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleRatingChange1 = (newRating: number) => {
    setRating1(newRating);
  };

  const handleRatingChange2 = (newRating: number) => {
    setRating2(newRating);
  };

  const handleRatingChange3 = (newRating: number) => {
    setRating3(newRating);
  };

  const handleLastUpdateAvailable = (e: ChangeEvent<HTMLInputElement>) => {
    setLastUpdateAvailable([e.target.value]);
  };

  const handleAuthorityResponsibleAvailable = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthorityResponsibleAvailable([e.target.value]);
  };

  const handleLegislationReferences = (e: ChangeEvent<HTMLInputElement>) => {
    setLegislationReferences([e.target.value]);
  };

  const handleInformationInEnglish = (e: ChangeEvent<HTMLInputElement>) => {
    setInformationInEnglish([e.target.value]);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = {
      rating1,
      rating2,
      rating3,
      lastUpdateAvailable,
      authorityResponsibleAvailable,
      legislationReferences,
      informationInEnglish,
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
        console.log("Formulário adicional 'Your Europe' enviado com sucesso!");
        setShowConfirmation(true);
      } else {
        console.error("Erro ao enviar o formulário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  if (showConfirmation) {
    return <AdditionalSurveyConfirmation />;
  }

  const buttonArgs = {
    children: 'Fechar',
    hasIcon: true,
    leadingIcon: 'agora-line-x',
    leadingIconHover: 'agora-solid-x',
    onClick: () => window.location.reload()
  };

  return (
    <div className="additional-survey-container">
      <div className="button-close">
        <Button {...buttonArgs} appearance="link"/>
      </div>
      <div className="additional-survey-wrapper">
        <h1 className="additional-survey-title">
          Por favor, diga-nos mais sobre a informação que encontrou.
        </h1>
        <p>
          Para podermos melhorar os serviços que disponibilizamos a cidadãos
          portugueses e europeus, gostaríamos de saber a sua opinião sobre esta
          página.
        </p>
        <img
          src={YourEurope}
          alt="Logo Your Europe"
          className="logo-your-europe"
        />

        <div className="rating">
          <label>A informação está correta?</label>
          <div className="rating-content">
            <StarRating
              rating={rating1}
              onChange={handleRatingChange1}
              className="star-rating"
            />
          </div>
        </div>

        <div className="rating">
          <label>A informação é abrangente o suficiente?</label>
          <div className="rating-content">
            <StarRating
              rating={rating2}
              onChange={handleRatingChange2}
              className="star-rating"
            />
          </div>
        </div>

        <div className="rating">
          <label>A linguagem é fácil de perceber?</label>
          <div className="rating-content">
            <StarRating
              rating={rating3}
              onChange={handleRatingChange3}
              className="star-rating"
            />
          </div>
        </div>

        <div className="radio-group">
          <p>
            A data da última atualização da informação está disponível na
            página?
          </p>
          <label className="radio">
            Sim
            <RadioButton
              type="radio"
              name="lastUpdateAvailable"
              value="Sim"
              label="Sim"
              checked={lastUpdateAvailable.includes("Sim")}
              onChange={handleLastUpdateAvailable}
            />
          </label>
          <label className="radio">
            Não
            <RadioButton
              type="radio"
              name="lastUpdateAvailable"
              value="Não"
              label="Não"
              checked={lastUpdateAvailable.includes("Não")}
              onChange={handleLastUpdateAvailable}
            />
          </label>
          <label className="radio">
            Parcialmente
            <RadioButton
              type="radio"
              name="lastUpdateAvailable"
              value="Não sei"
              label="Não sei"
              checked={lastUpdateAvailable.includes("Não sei")}
              onChange={handleLastUpdateAvailable}
            />
          </label>
        </div>

        <div className="radio-group radio-group-spacer">
          <p>
            O nome da autoridade responsável pela informação está disponível na
            página?
          </p>
          <label className="radio">
            Sim
            <RadioButton
              type="radio"
              name="authorityResponsibleAvailable"
              value="Sim"
              label="Sim"
              checked={authorityResponsibleAvailable.includes("Sim")}
              onChange={handleAuthorityResponsibleAvailable}
            />
          </label>
          <label className="radio">
            Não
            <RadioButton
              type="radio"
              name="authorityResponsibleAvailable"
              value="Não"
              label="Não"
              checked={authorityResponsibleAvailable.includes("Não")}
              onChange={handleAuthorityResponsibleAvailable}
            />
          </label>
          <label className="radio">
            Parcialmente
            <RadioButton
              type="radio"
              name="authorityResponsibleAvailable"
              value="Não sei"
              label="Não sei"
              checked={authorityResponsibleAvailable.includes("Não sei")}
              onChange={handleAuthorityResponsibleAvailable}
            />
          </label>
        </div>

        <div className="radio-group radio-group-spacer">
          <p>Há referências a legislação?</p>
          <label className="radio">
            Sim
            <RadioButton
              type="radio"
              name="legislationReferences"
              value="Sim"
              label="Sim"
              checked={legislationReferences.includes("Sim")}
              onChange={handleLegislationReferences}
            />
          </label>
          <label className="radio">
            Não
            <RadioButton
              type="radio"
              name="legislationReferences"
              value="Não"
              label="Não"
              checked={legislationReferences.includes("Não")}
              onChange={handleLegislationReferences}
            />
          </label>
          <label className="radio">
            Parcialmente
            <RadioButton
              type="radio"
              name="legislationReferences"
              value="Não sei"
              label="Não sei"
              checked={legislationReferences.includes("Não sei")}
              onChange={handleLegislationReferences}
            />
          </label>
        </div>

        <div className="radio-group radio-group-spacer">
          <p>A informação está disponível em inglês?</p>
          <label className="radio">
            Sim
            <RadioButton
              type="radio"
              name="informationInEnglish"
              value="Sim"
              label="Sim"
              checked={informationInEnglish.includes("Sim")}
              onChange={handleInformationInEnglish}
            />
          </label>
          <label className="radio">
            Não
            <RadioButton
              type="radio"
              name="informationInEnglish"
              value="Não"
              label="Não"
              checked={informationInEnglish.includes("Não")}
              onChange={handleInformationInEnglish}
            />
          </label>
          <label className="radio">
            Parcialmente
            <RadioButton
              type="radio"
              name="informationInEnglish"
              value="Não sei"
              label="Não sei"
              checked={informationInEnglish.includes("Não sei")}
              onChange={handleInformationInEnglish}
            />
          </label>
        </div>

        <Button
          onClick={
            handleSubmit as unknown as MouseEventHandler<HTMLButtonElement>
          }
          className="submit-button"
          type="submit"
          hasIcon
          leadingIcon="agora-line-arrow-right-circle"
          leadingIconHover="agora-line-arrow-right-circle"
        >
          Enviar avaliação
        </Button>
      </div>
    </div>
  );
};

export default AdditionalSurvey
