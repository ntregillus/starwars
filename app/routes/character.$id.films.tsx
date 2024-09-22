import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { getDetailsFor, getPerson } from '~/lib/swapi';
import { Card, CardContent } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import type { Film } from '~/lib/swapi';

export const loader: LoaderFunction = async ({ params }) => {
    const id: number = Number(params.id);
    const person = await getPerson(id);

    const films = await getDetailsFor<Film>(person.films);
    return { films };
};

export default function Films() {
  const { films } = useLoaderData<{ films: Film[] }>();

  return (
    <Card>
      <CardContent>
      {films.length > 0 ? (
        <ul className="pt-5">
          {films.map((film, index)=> (
            <li key={film.url}>
              {index > 0 ? <Separator/> : ""}
              <strong>Title:</strong> {film.title} <br />
              <strong>Release Date:</strong> {film.release_date} <br />
              <strong>Director:</strong> {film.director}
            </li>
          ))}
        </ul>
      ) : (
        <p className="pt-5">No films found</p>
      )}
      </CardContent>
    </Card>
  );
}
