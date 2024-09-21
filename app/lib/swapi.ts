import { createCookie } from "@remix-run/node";
// Define the structure of a Person object returned by SWAPI
export interface Person {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
  };
  
  // Define the structure of the response returned by the SWAPI /people endpoint
export interface SWAPIResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
};

export async function fetchPeople(page: number = 1): Promise<SWAPIResponse<Person>> {
    const response = await fetch(`https://swapi.dev/api/people?page=${page}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }
    const people: SWAPIResponse<Person> = await response.json();
    if(people.next) {
        const allPeople: SWAPIResponse<Person> = await fetchPeople(page+1);
        people.results = people.results.concat(allPeople.results);
    }
    return people;
  }

  