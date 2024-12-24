import { useParams } from 'wouter';

export default function Profile() {
  const { citizenId } = useParams();

  if (!citizenId) return null;

  return (
    <div className='flex w-full items-center justify-center gap-5'>
      <h1>Opened profile for {citizenId}</h1>
    </div>
  );
}