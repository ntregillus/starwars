import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { getDetailsFor, getPerson } from '~/lib/swapi';
import { Card, CardContent } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import type { Person, Starship } from '~/lib/swapi';

export let loader: LoaderFunction = async ({ params }) => {
  
  const person: Person = await getPerson(Number(params.id));
  
  const starships = await getDetailsFor<Starship>(person.starships);
  return { starships };
};

export default function Starships() {
  const { starships } = useLoaderData<{ starships: Starship[] }>();

  return (
    <Card>
        <CardContent>
      {starships.length > 0 ? (
        <ul className="pt-5">
          {starships.map((starship, index) => (
            <li key={starship.url}>
                {index > 0 ? <Separator />: ""}
              <strong>Name:</strong> {starship.name} <br />
              <strong>Model:</strong> {starship.model} <br />
              <strong>Manufacturer:</strong> {starship.manufacturer}
            </li>
          ))}
        </ul>
      ) : (
        <p className="pt-5">No starships found</p>
      )}
    </CardContent>
    </Card>
  );
}
