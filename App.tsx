import React, { useState, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { TaglinePreview } from './components/TaglinePreview';
import { EditorPanel } from './components/Editor/EditorPanel';
import { useClickOutside } from './hooks/useClickOutside';

const PANEL_ANIMATION_DURATION = 200;

const App: React.FC = observer(() => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClose = useCallback(() => {
    if (!isEditorOpen) return;
    setIsExiting(true);
    closeTimeoutRef.current = setTimeout(() => {
      setIsEditorOpen(false);
      setIsExiting(false);
      closeTimeoutRef.current = null;
    }, PANEL_ANIMATION_DURATION);
  }, [isEditorOpen]);

  React.useEffect(() => () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  }, []);

  useClickOutside(editorRef, handleClose, isEditorOpen && !isExiting, headingRef);

  const handleToggle = useCallback(() => {
    if (isExiting) return;
    if (isEditorOpen) {
      handleClose();
    } else {
      setIsEditorOpen(true);
    }
  }, [isEditorOpen, isExiting, handleClose]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-[20vh] bg-[#121212] p-4">
      <div className="relative w-full max-w-4xl text-center">
        <h1
          ref={headingRef}
          className="text-4xl md:text-5xl font-semibold mb-12 cursor-pointer hover:opacity-80 transition-opacity select-none"
          onClick={handleToggle}
        >
          Tagline element
        </h1>

        <TaglinePreview />

        {(isEditorOpen || isExiting) && (
          <div
            ref={editorRef}
            className={`${
              isExiting
                ? 'opacity-0 scale-95 pointer-events-none transition-all duration-200 ease-out'
                : 'panel-enter'
            }`}
          >
            <EditorPanel
              onClose={handleClose}
            />
          </div>
        )}
      </div>

      <div className="fixed bottom-4 left-4 text-xs text-gray-500 opacity-50">
        Click the heading to open editor
      </div>
    </div>
  );
});

export default App;
