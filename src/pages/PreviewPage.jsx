import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipientSurprisePage from '../components/RecipientSurprisePage';

export default function PreviewPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  return (
    <RecipientSurprisePage 
      data={{
        recipientName: 'Ananya',
        senderName: 'Rahul',
        occasionTitle: 'Anniversary',
        message: 'Preview Mode — Customize this text in the editor anytime!'
      }}
      onBack={() => navigate('/editor')} 
    />
  );
}
