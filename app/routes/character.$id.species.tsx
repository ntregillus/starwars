import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { getDetailsFor, getPerson } from '~/lib/swapi';
import { Card, CardContent } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import type { Species } from '~/lib/swapi';


export const loader: LoaderFunction = async ({ params }) => {
    const id: number = Number(params.id);
    const person = await getPerson(id);
  
  const species = await getDetailsFor<Species>(person.species);
  return { species };
};

export default function Species() {
  const { species } = useLoaderData<{ species: Species[] }>();

  return (
    <Card>
        <CardContent>
      {species.length > 0 ? (
        <ul className="pt-5">
          {species.map((s, index) => (
            <li key={s.url}>
              {index > 0 ? <Separator/> : ""}
              <strong>Name:</strong> {s.name} <br />
              <strong>Language:</strong> {s.language} <br />
              <strong>Classification:</strong> {s.classification}
            </li>
          ))}
        </ul>
      ) : (
        <p className="pt-5">No species found</p>
      )}
      </CardContent>
    </Card>
  );
}
