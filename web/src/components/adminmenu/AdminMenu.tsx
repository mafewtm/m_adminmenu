import { useState, useEffect } from 'react';
import { Switch, Route } from 'wouter';
import { useNuiEvent } from '@/hooks/useNuiEvent';
import { fetchNui } from '@/utils/fetchNui';
import Navbar from './components/NavBar';
import Home from './pages/home/Home';
import Players from './pages/players/Players';
import Server from './pages/server/Server';
import Vehicles from './pages/vehicles/Vehicles';
import Development from './pages/development/Development';

export default function AdminMenu() {
  const [visible, setVisible] = useState(false);

  useNuiEvent('setVisible', (status: boolean) => setVisible(status));

  const handleEscape = (e: KeyboardEvent) => {
    if (visible &&e.key === 'Escape') {
      setVisible(false);
      fetchNui('closeMenu');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [visible]);

  return (
    <div className='flex-col h-10/12 w-7/12 rounded-md border-2 border-solid border-zinc-700 drop-shadow-md' style={{ display: visible ? 'flex' : 'none' }}>
      <div className='flex h-full w-full bg-zinc-800 gap-5 p-5'>
        <Navbar />
        <div className='flex h-full w-full'>
          <Switch>
            <Route path='/' component={Home} />
            <Route path='/players' component={Players} />
            <Route path='/server' component={Server} />
            <Route path='/vehicles' component={Vehicles} />
            <Route path='/development' component={Development} />
          </Switch>
        </div>
      </div>
    </div>
  );
}