import type { ClientType } from '@/components/types';

/**
 * Props for the ClientGrid component.
 */
interface ClientGridProps {
  /** Array of client objects to display. */
  clients: ClientType[];
}

/**
 * Auto-filling grid of client name tiles with hover highlight.
 *
 * @example
 * <ClientGrid clients={[{ name: 'Hermes' }, { name: 'Cartier' }]} />
 */
export function ClientGrid({ clients }: ClientGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-px bg-border-light">
      {clients.map((client) => (
        <div
          key={client.name}
          className="group flex items-center justify-center bg-background px-6 py-9 transition-colors duration-300 hover:bg-card"
        >
          <span className="text-center font-display text-base text-secondary transition-colors duration-300 group-hover:text-primary">
            {client.name}
          </span>
        </div>
      ))}
    </div>
  );
}
