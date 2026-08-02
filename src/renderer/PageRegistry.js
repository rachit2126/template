// Memory Vault Studio - Extensible Page Registry

import VaultPage from '../pages/VaultPage';
import EnvelopePage from '../pages/EnvelopePage';
import LetterPage from '../pages/LetterPage';
import GalleryPage from '../pages/GalleryPage';
import QuestionCardsPage from '../pages/QuestionCardsPage';
import MemoryCardPage from '../pages/MemoryCardPage';
import ScratchCardPage from '../pages/ScratchCardPage';
import QuizPage from '../pages/QuizPage';
import TreasureBoxPage from '../pages/TreasureBoxPage';
import MusicPlayerPage from '../pages/MusicPlayerPage';
import GiftBoxPage from '../pages/GiftBoxPage';
import TimelinePage from '../pages/TimelinePage';
import BottlePage from '../pages/BottlePage';
import BandTyingPage from '../pages/BandTyingPage';
import PuzzlePage from '../pages/PuzzlePage';
import ConfessionPage from '../pages/ConfessionPage';
import CountdownPage from '../pages/CountdownPage';
import PolaroidWallPage from '../pages/PolaroidWallPage';
import EndingPage from '../pages/EndingPage';

export const PAGE_REGISTRY = {
  vault: VaultPage,
  envelope: EnvelopePage,
  letter: LetterPage,
  gallery: GalleryPage,
  'question-cards': QuestionCardsPage,
  choices: QuestionCardsPage,
  'memory-card': MemoryCardPage,
  scratch: ScratchCardPage,
  quiz: QuizPage,
  treasure: TreasureBoxPage,
  music: MusicPlayerPage,
  gift: GiftBoxPage,
  timeline: TimelinePage,
  bottle: BottlePage,
  'band-tying': BandTyingPage,
  puzzle: PuzzlePage,
  confession: ConfessionPage,
  countdown: CountdownPage,
  'polaroid-wall': PolaroidWallPage,
  ending: EndingPage
};

export const getPage = (type) => {
  return PAGE_REGISTRY[type] || VaultPage;
};
