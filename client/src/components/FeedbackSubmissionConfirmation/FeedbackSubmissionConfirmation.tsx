import React from 'react'
import Detail from '../../assets/Detail.svg';

export default function FeedbackSubmissionConfirmation() {
  return (
    <div>
        <img src={Detail} alt="Detalhe" className="detail-svg" />
        <h2>Obrigado pela sua opinião!</h2>
        <p>Avaliação submetida com sucesso.</p>
        <p>
            Vamos analisar o seu comentário com atenção, no entanto, não receberá uma resposta. 
            Se precisar de ajuda, fale connosco através do nosso formulário.
        </p>
    </div>
  )
}
