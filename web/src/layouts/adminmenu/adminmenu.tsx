import { useState, useEffect } from 'react';
import { useLocation, Switch, Route, Redirect } from 'wouter';
import { useNuiEvent } from '@/hooks/useNuiEvent';
import { fetchNui } from '@/utils/fetchNui';
import Header from './components/header';
import Navbar from './components/navbar';
import Home from './pages/home/home';
import Players from './pages/players/players';
import Profile from './pages/players/components/profile';
import Server from './pages/server/server';
import Vehicles from './pages/vehicles/vehicles';
import Development from './pages/dev/dev';

export default function AdminMenu() {
  const [visible, setVisible] = useState(false);
  const navigate = useLocation()[1];

  useNuiEvent('setVisible', (status: boolean) => {
    navigate('/');
    setVisible(status)
  });

  const handleEscape = (e: KeyboardEvent) => {
    if (visible && e.key === 'Escape') {
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
    <div className='flex-col h-4/6 w-3/6 bg-bismark-950 rounded-md border-2 border-solid border-bismark-900 text-zinc-300 shadow' style={{ display: visible ? 'flex' : 'none' }}>
      <Header />
      <div className='flex h-full w-full gap-5 p-5 overflow-x-hidden'>
        <Navbar />
        <div className='flex h-full w-full overflow-y-auto'>
          <Switch>
            <Route path='/'><Home /></Route>
            <Route path='/players'><Players /></Route>
            <Route path='/players/:citizenId'><Profile /></Route>
            <Route path='/server'><Server /></Route>
            <Route path='/vehicles'><Vehicles /></Route>
            <Route path='/development'><Development /></Route>
            <Route>
              <Redirect to='/' />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}