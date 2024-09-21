import type { MetaFunction } from "@remix-run/node";
import type {LoaderFunctionArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchPeople } from "~/lib/swapi";
import { Link } from "@remix-run/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

export const meta: MetaFunction = () => {
  return [
    { title: "StarWars Characters" },
    { name: "description", content: "Quick StarWars Character Overview" },
  ];
};

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")||1);
  const people = await fetchPeople(page);
  return json({people, page});
};

export default function Index() {
  const {people, page} = useLoaderData<typeof loader>();

  if(!people || !people.results) {
    return (<p>Failure to Load from swapi</p>);
  }


  return (
    <div className="p-6">
      <div className="overflow-x-auto">
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
       {/* Pagination Controls */}
       <div className="mt-4 flex justify-between">
        {people.previous ? (
          <Link
            to={`?page=${page - 1}`}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Previous
          </Link>
        ) : (
          <span className="px-4 py-2 bg-gray-400 text-white rounded">Previous</span>
        )}
        {people.next ? (
          <Link
            to={`?page=${page + 1}`}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </Link>
        ) : (
          <span className="px-4 py-2 bg-gray-400 text-white rounded">Next</span>
        )}
      </div>
    </div>
  );
}

