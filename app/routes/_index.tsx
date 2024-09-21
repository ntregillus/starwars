import type { MetaFunction } from "@remix-run/node";
import type {LoaderFunctionArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchPeople } from "~/lib/swapi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

export const meta: MetaFunction = () => {
  return [
    { title: "StarWars Characters" },
    { name: "description", content: "Quick StarWars Character Overview" },
  ];
};

export const loader = async ({
  params
}: LoaderFunctionArgs) => {
  const people = await fetchPeople();
  return json({people});
};

export default function Index() {
  const {people} = useLoaderData<typeof loader>();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Star Wars Characters</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Height</TableHead>
            <TableHead>Mass</TableHead>
            <TableHead>Birth Year</TableHead>
            <TableHead>Gender</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.results.map((person: any) => (
            <TableRow key={person.name}>
              <TableCell>{person.name}</TableCell>
              <TableCell>{person.height}</TableCell>
              <TableCell>{person.mass}</TableCell>
              <TableCell>{person.birth_year}</TableCell>
              <TableCell>{person.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

