import { PageHeader } from '@/components/page-header';
import { ClientGrid } from '@/components/client-grid';
import clientsData from '@/data/clients.json';

export const metadata = {
  title: 'Clients — Neil Hurley Photography',
  description: 'Selected clients of Neil Hurley Photography.',
};

export default function ClientsPage() {
  return (
    <>
      <PageHeader title="Clients" description="A selection of brands and agencies worked with over the years." />
      <div className="mx-auto max-w-[1280px] px-6 pb-20">
        <ClientGrid clients={clientsData.clients} />
      </div>
    </>
  );
}
