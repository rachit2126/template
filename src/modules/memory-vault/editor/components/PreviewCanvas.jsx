import React from 'react';
import MobileVaultPage from '../../components/MobileVaultPage';
import TabletVaultPage from '../../components/TabletVaultPage';
import DesktopVaultPage from '../../components/DesktopVaultPage';
import { EnvelopePage, ScrollLetterPage, GalleryPage, EndingPage } from '../../components/StoryPages';

export default function PreviewCanvas({ selectedPage, story, onNavigate, onElementClick, deviceMode = 'desktop' }) {
  if (!selectedPage) return null;

  const renderPageContent = () => {
    switch (selectedPage.type) {
      case 'vault':
        if (deviceMode === 'mobile') {
          return (
            <MobileVaultPage
              config={selectedPage}
              storyPin={story?.pin || '1234'}
              storyDecorations={story?.decorations || {}}
              onNavigate={onNavigate}
              onElementClick={onElementClick}
              isInsideStudio={true}
            />
          );
        } else if (deviceMode === 'tablet') {
          return (
            <TabletVaultPage
              config={selectedPage}
              storyPin={story?.pin || '1234'}
              storyDecorations={story?.decorations || {}}
              onNavigate={onNavigate}
              onElementClick={onElementClick}
            />
          );
        }
        return (
          <DesktopVaultPage
            config={selectedPage}
            storyPin={story?.pin || '1234'}
            storyDecorations={story?.decorations || {}}
            onNavigate={onNavigate}
            onElementClick={onElementClick}
          />
        );

      case 'envelope':
        return <EnvelopePage config={selectedPage} onNavigate={onNavigate} onElementClick={onElementClick} />;
      case 'letter':
        return <ScrollLetterPage config={selectedPage} onNavigate={onNavigate} onElementClick={onElementClick} />;
      case 'gallery':
        return <GalleryPage config={selectedPage} onNavigate={onNavigate} onElementClick={onElementClick} />;
      case 'ending':
        return <EndingPage config={selectedPage} onNavigate={onNavigate} onElementClick={onElementClick} />;
      default:
        return (
          <DesktopVaultPage
            config={selectedPage}
            storyPin={story?.pin || '1234'}
            storyDecorations={story?.decorations || {}}
            onNavigate={onNavigate}
            onElementClick={onElementClick}
          />
        );
    }
  };

  if (deviceMode === 'mobile') {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box' }}>
        {/* iPhone 15 Pro (390 x 844) Device Frame inside Studio Center Canvas */}
        <div
          style={{
            position: 'relative',
            width: '390px',
            height: '844px',
            maxHeight: '90vh',
            background: '#f6f0df',
            borderRadius: '46px',
            border: '11px solid #1E293B',
            boxShadow: '0 25px 65px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {renderPageContent()}
          </div>
        </div>
      </div>
    );
  }

  if (deviceMode === 'tablet') {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box' }}>
        {/* iPad Device Frame inside Studio Center Canvas */}
        <div
          style={{
            position: 'relative',
            width: '680px',
            height: '560px',
            maxHeight: '90vh',
            background: '#f6f0df',
            borderRadius: '24px',
            border: '8px solid #1E293B',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.4)',
            overflow: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {renderPageContent()}
        </div>
      </div>
    );
  }

  // DESKTOP PREVIEW
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', padding: '16px', boxSizing: 'border-box' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          background: '#f6f0df',
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {renderPageContent()}
      </div>
    </div>
  );
}
