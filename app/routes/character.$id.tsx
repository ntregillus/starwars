import { json, useLoaderData } from '@remix-run/react';
import { Link } from "@remix-run/react";
import {Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

export const loader = async ({ params }: any) => {
  const { id } = params;
  const response = await fetch(`https://swapi.dev/api/people/${id}/`);
  if (!response.ok) throw new Response('Person not found', { status: 404 });
  const person = await response.json();
  return json(person);
};

export default function Character() {
    const person = useLoaderData<typeof loader>();

    return (
        <div>
            <Link to="/" className="mt-4">
                Back to Home
            </Link>

            <div className="flex justify-start items-start min-h-screen">
            <Card className="max-w-sm">
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
            </div>
        </div>
      );

};



