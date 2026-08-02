import React from 'react';
import { useParams } from 'react-router-dom';
import MemoryVaultApp from '../MemoryVaultApp';

export default function StoryViewer() {
  const { id } = useParams();
  return <MemoryVaultApp storyId={id} />;
}
