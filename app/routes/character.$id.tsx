import { useLoaderData, Link, Outlet, useLocation } from '@remix-run/react';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';

import type { LoaderFunction } from '@remix-run/node';
import { type Person, getPerson } from '~/lib/swapi';

// Define your loader to fetch the person's data
export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  const person: Person = await getPerson(Number(id));
  
  return { person };
};

export default function Character() {
  const { person } = useLoaderData<{ person: Person }>();
  const activeTab = useLocation().pathname.split("/").pop();

  return (
    <div>
        <Link to="/" className="mt-4">
          Back to Home
        </Link>
        <div className="flex justify-start items-start p-3 h-screen">
        {/* Person Card */}
        <Card className="max-w-sm mr-4 mt-9">
            <CardHeader>
            <CardTitle>{person.name}</CardTitle>
            </CardHeader>
            <CardContent>
            <p><strong>Height:</strong> {person.height}</p>
            <p><strong>Mass:</strong> {person.mass}</p>
            <p><strong>Hair Color:</strong> {person.hair_color}</p>
            <p><strong>Skin Color:</strong> {person.skin_color}</p>
            <p><strong>Eye Color:</strong> {person.eye_color}</p>
            <p><strong>Birth Year:</strong> {person.birth_year}</p>
            </CardContent>
        </Card>

        {/* Tabs for Films, Species, Vehicles, and Starships */}
        <Tabs className="w-full max-w-lg" defaultValue={activeTab}>
            <TabsList>
            <TabsTrigger value="films">
                <Link to={`/character/${person.id}/films`} > Films </Link>
            </TabsTrigger>
            <TabsTrigger value="species">
              <Link to={`/character/${person.id}/species`} > Species </Link>
            </TabsTrigger>
            <TabsTrigger value="vehicles">
              <Link to={`/character/${person.id}/vehicles`} > Vehicles </Link>
            </TabsTrigger>
            <TabsTrigger value="starships">
              <Link to={`/character/${person.id}/starships`} > Starships </Link>
            </TabsTrigger>
            </TabsList>

            {/* Render nested route content here */}
            <Outlet />
        </Tabs>
        </div>
    </div>
  );
}
