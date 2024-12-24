import { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table'
import { debugData } from '@/utils/debugData';
import { useNuiEvent } from '@/hooks/useNuiEvent';
import { fetchNui } from '@/utils/fetchNui';
import DataTable from '@/components/datatable';
import { useLocation } from 'wouter';

type Player = {
  serverId: number
  citizenId: string
  characterName: string
  accountName: string
}

const columns: ColumnDef<Player>[] = [
  {
    accessorKey: 'serverId',
    header: 'Server ID',
  },
  {
    accessorKey: 'accountName',
    header: 'Account Name',
  },
  {
    accessorKey: 'citizenId',
    header: 'Citizen ID',
  },
  {
    accessorKey: 'characterName',
    header: 'Character Name',
  },
]

debugData<Player[]>([
  {
    data: [
      {
        serverId: 678,
        citizenId: 'G7Y4H2J9',
        characterName: 'Alex Carter',
        accountName: 'MysticFalcon',
      },
      {
        serverId: 142,
        citizenId: 'Z3A9T5R7',
        characterName: 'Brooke Maxwell',
        accountName: 'PixelPioneer',
      },
      {
        serverId: 895,
        citizenId: 'L2K8M1P6',
        characterName: 'Casey Palmer',
        accountName: 'QuantumQuokka',
      },
      {
        serverId: 321,
        citizenId: 'B5N4E3W8',
        characterName: 'Dylan Reed',
        accountName: 'GalaxyGuru',
      },
      {
        serverId: 478,
        citizenId: 'R6Q2X7T4',
        characterName: 'Emma Hayes',
        accountName: 'BlazeBlitz',
      },
      {
        serverId: 230,
        citizenId: 'S1J8F2L9',
        characterName: 'Finn Taylor',
        accountName: 'CyberSphinx',
      },
      {
        serverId: 762,
        citizenId: 'T4M3G6V7',
        characterName: 'Grace Parker',
        accountName: 'LunarLioness',
      },
      {
        serverId: 47,
        citizenId: 'R5Y4N8K2',
        characterName: 'Alex Carter',
        accountName: 'MysticFalcon',
      },
      {
        serverId: 13,
        citizenId: 'B7N6M2P4',
        characterName: 'Brooke Maxwell',
        accountName: 'PixelPioneer',
      },
      {
        serverId: 92,
        citizenId: 'L3K9J7P1',
        characterName: 'Casey Palmer',
        accountName: 'QuantumQuokka',
      },
      {
        serverId: 56,
        citizenId: 'F1G6H4J8',
        characterName: 'Dylan Reed',
        accountName: 'GalaxyGuru',
      },
      {
        serverId: 21,
        citizenId: 'Z5N2R3K7',
        characterName: 'Emma Hayes',
        accountName: 'BlazeBlitz',
      },
      {
        serverId: 78,
        citizenId: 'T2L9M5V6',
        characterName: 'Finn Taylor',
        accountName: 'CyberSphinx',
      },
      {
        serverId: 8,
        citizenId: 'P3Y6G2H4',
        characterName: 'Hunter Davis',
        accountName: 'TurboTrekker',
      },
      {
        serverId: 34,
        citizenId: 'K9H3F7J1',
        characterName: 'Ivy Morgan',
        accountName: 'SolarStorm',
      },
      {
        serverId: 67,
        citizenId: 'N2M4R5Y8',
        characterName: 'Jack Bennett',
        accountName: 'EchoEcho',
      },
      {
        serverId: 89,
        citizenId: 'Q1G8K7M4',
        characterName: 'Kayla Mitchell',
        accountName: 'NovaNinja',
      },
      {
        serverId: 12,
        citizenId: 'H6N3M2K7',
        characterName: 'Liam Sanders',
        accountName: 'ApexAviator',
      },
      {
        serverId: 53,
        citizenId: 'J4K8N2P5',
        characterName: 'Grace Parker',
        accountName: 'LunarLioness',
      }
    ],
    action: 'getPlayers',
  }
])

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const navigate = useLocation()[1];

  const handleDoubleClick = (row: any) => {
    navigate(`/players/${row.original.citizenId}`);
  };

  useNuiEvent<Player[]>('getPlayers', (playerData) => {
    setPlayers(playerData);
  });

  useEffect(() => {
    fetchNui<Player[]>('getPlayers')
      .then((playerData) => {
        setPlayers(playerData);
      })
      .catch((error) => {
        console.error('Failed to fetch player data:', error);
      });
  }, []);

  return (
    <div className='flex flex-col w-full justify-start gap-5'>
      <DataTable columns={columns} data={players} onDoubleClick={handleDoubleClick}/>
    </div>
  );
}