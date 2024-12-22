import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';

export default function AdminMenu() {
  return (
    <div className='flex flex-col h-9/12 w-9/12 rounded-md border-2 border-solid border-zinc-750 drop-shadow-md'>
      <div className='flex h-full w-full bg-zinc-700 gap-5 p-5'>
        <Navbar />
        <div className='flex h-full w-full'>
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}