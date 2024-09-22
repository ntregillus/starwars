import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { getDetailsFor, getPerson } from '~/lib/swapi';
import { Card, CardContent } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import type { Vehicle } from '~/lib/swapi';

export const loader: LoaderFunction = async ({ params }) => {
  const person = await getPerson(Number(params.id));
  
  const vehicles = await getDetailsFor<Vehicle>(person.vehicles);
  return { vehicles };
};

export default function Vehicles() {
  const { vehicles } = useLoaderData<{ vehicles: Vehicle[] }>();

  return (
    <Card>
        <CardContent>
      {vehicles.length > 0 ? (
        <ul className="pt-5">
          {vehicles.map((vehicle, index) => (
            <li key={vehicle.url}>
                {index > 0? <Separator />: ""}
              <strong>Name:</strong> {vehicle.name} <br />
              <strong>Model:</strong> {vehicle.model} <br />
              <strong>Manufacturer:</strong> {vehicle.manufacturer}
            </li>
          ))}
        </ul>
      ) : (
        <p className="pt-5">No vehicles found</p>
      )}
        </CardContent>
    </Card>
  );
}
