import type { MetaFunction } from "@remix-run/node";
import {json} from "@remix-run/node";
import { useLoaderData, useSearchParams, Form } from "@remix-run/react";
import { fetchPeople, fetchPeopleByName, SWAPIResponse, type Person } from "~/lib/swapi";
import { Link } from "@remix-run/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
const PAGE_SIZE = 10;
export const meta: MetaFunction = () => {
  return [
    { title: "StarWars Characters" },
    { name: "description", content: "Quick StarWars Character Overview" },
  ];
};

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")||1);
  const searchText = url.searchParams.get("search")||"";
  let people: SWAPIResponse<Person>;
  if(!!searchText) {
    people = await fetchPeopleByName(searchText);
  }
  else {
    people = await fetchPeople(); //we do NOT pass page number so we load ALL pages, and allow sorting
  }
  return json({people, page});
};

export default function Index() {
  const {people, page} = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  if(!people || !people.results) {
    return (<p>Failure to Load from swapi</p>);
  }
  const searchText = searchParams.get("search");
  //handling sorting
  const sortKey = searchParams.get('sort') || 'name';
  const sortOrder = searchParams.get('order') || 'asc';
  
  const generateSortLink = (key: string) => {
    let newOrderBy = "asc";
    if(sortKey == key && sortOrder === "asc") {
      newOrderBy = "desc";
    }
    return `?page=${page}&sort=${key}&order=${newOrderBy}`;
  };
  const generateCharacterLink = (url: string) => {
    return url.replace("https://swapi.dev/api/people/", "/character/")+"films"; 
  };

  const sortedPeople: Array<any> = [...people.results].sort((a:any, b:any)=> {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });


  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <Form key="search" className="flex w-full max-w-sm items-center space-x-2" action="search" method="post">
          <Label htmlFor="search">Search</Label>
          <Input id="search" name="search" type="text" placeholder="Name" defaultValue={`${searchText}`} />
          <Button>Search</Button>
        </Form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Link to={generateSortLink('name')} key="name">Name</Link>
              </TableHead>
              <TableHead>
                <Link to={generateSortLink('height')}>Height</Link>
              </TableHead>
              <TableHead>
                <Link to={generateSortLink("mass")}>Mass</Link>
              </TableHead>
              <TableHead>
                <Link to={generateSortLink("birth_year")}>Birth Year</Link>
              </TableHead>
              <TableHead>Gender</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPeople
            .filter((person: any, index: number) => {
              return index < (page*PAGE_SIZE) && index >= ((page-1)*PAGE_SIZE);
            }).map((person: any) => (
              <TableRow key={person.name}>
                <TableCell>
                  <Link 
                    to={generateCharacterLink(person.url)}
                    className="text-blue-600 visited:text-purple-600 hover:underline"
                  >
                    {person.name}
                  </Link>
                </TableCell>
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
        {page > 1 ? (
          <Link
            to={`?page=${page - 1}&sort=${sortKey}&order=${sortOrder}${!!searchText && "&search=" + encodeURIComponent(searchText)}`}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Previous
          </Link>
        ) : (
          <span className="px-4 py-2 bg-gray-400 text-white rounded">Previous</span>
        )}
        {people.count > page*PAGE_SIZE ? (
          <Link
            to={`?page=${page + 1}&sort=${sortKey}&order=${sortOrder}${!!searchText && "&search=" + encodeURIComponent(searchText)}`}
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

