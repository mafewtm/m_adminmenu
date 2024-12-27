import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Icon } from '@iconify/react';
import { cn } from "@/lib/utils"
import { Link, useRoute } from 'wouter';

interface NavButtonProps {
  icon: string; // Iconify (see https://icon-sets.iconify.design/)
  label: string;
  path: string;
}

const NavButton = ({ icon, label, path }: NavButtonProps) => {
  const [isActive] = useRoute(path);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={400}>
        <TooltipTrigger asChild>
          <Link href={path}>
            <Button variant='ghost' size='icon' className={cn('hover:bg-bismark-600', isActive && 'bg-bismark-700', 'drop-shadow')}>
              <Icon icon={icon} className='h-5 w-5 text-zinc-300' />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side='right' className='bg-zinc-700'>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default function Navbar() {
  return (
    <div className='flex flex-col h-fit w-fit justify-between rounded-md'>
      <div className='flex flex-col items-center gap-3'>
        <NavButton icon='carbon:home' label='Home' path='/' />
        <NavButton icon='carbon:user-multiple' label='Players' path='/players' />
        <NavButton icon='carbon:bare-metal-server' label='Server' path='/server' />
        <NavButton icon='carbon:car' label='Vehicles' path='/vehicles' />
        <NavButton icon='carbon:code' label='Development' path='/development' />
      </div>
    </div>
  );
}