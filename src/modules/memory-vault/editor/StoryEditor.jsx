import React from 'react';
import { useParams } from 'react-router-dom';
import MemoryVaultApp from '../MemoryVaultApp';

export default function StoryEditor() {
  const { id } = useParams();
  return <MemoryVaultApp initialAdminOpen={true} storyId={id} />;
}
