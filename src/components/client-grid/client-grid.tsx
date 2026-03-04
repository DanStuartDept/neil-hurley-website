import type { ClientType } from '@/components/types';

interface ClientGridProps {
  clients: ClientType[];
}

export function ClientGrid({ clients }: ClientGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-px bg-border-light">
      {clients.map((client) => (
        <div
          key={client.name}
          className="flex items-center justify-center bg-background px-6 py-9 transition-colors duration-300 hover:bg-card hover:text-primary"
        >
          <span className="text-center font-display text-base text-secondary transition-colors duration-300">
            {client.name}
          </span>
        </div>
      ))}
    </div>
  );
}
