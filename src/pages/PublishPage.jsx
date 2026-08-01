import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipientSurprisePage from '../components/RecipientSurprisePage';

export default function PublishPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const data = {
    recipientName: 'Ananya',
    senderName: 'Rahul',
    occasionTitle: 'Anniversary',
    message: 'From the moment you entered my life, every single day has felt like a fairytale. You are my best friend, my soulmate, and my forever love. Happy Anniversary! 💖',
    enablePassword: false,
    musicTrack: 'Romantic Piano Harmony'
  };

  return (
    <RecipientSurprisePage 
      data={data}
      onBack={() => navigate('/')} 
    />
  );
}
