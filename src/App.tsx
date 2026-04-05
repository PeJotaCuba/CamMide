import { useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import ARView from './components/ARView';
import History from './components/History';
import CodeSnippets from './components/CodeSnippets';

export type ViewState = 'dashboard' | 'ar' | 'history' | 'code';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-container-lowest text-on-surface font-body">
      {currentView !== 'ar' && <TopBar currentView={currentView} />}
      {currentView !== 'ar' && <Sidebar currentView={currentView} setCurrentView={setCurrentView} />}
      
      <div className={`flex-1 relative ${currentView !== 'ar' ? 'md:ml-64 pt-24 pb-32 overflow-y-auto' : ''}`}>
        {currentView === 'dashboard' && <Dashboard setCurrentView={setCurrentView} />}
        {currentView === 'ar' && <ARView setCurrentView={setCurrentView} />}
        {currentView === 'history' && <History />}
        {currentView === 'code' && <CodeSnippets />}
      </div>

      {currentView !== 'ar' && <BottomNav currentView={currentView} setCurrentView={setCurrentView} />}
    </div>
  );
}
