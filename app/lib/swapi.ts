// Define the structure of a Person object returned by SWAPI
export interface Person {
    id: number,
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

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  release_date: string;
  director: string;
  url: string;
}

export interface Species {
  name: string;
  language: string;
  classification: string;
  url: string;
}

export interface Vehicle {
  name: string;
  model: string;
  manufacturer: string;
  url: string;
}

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  url: string;
}

//retrieves a set of parrallel api calls
export const getDetailsFor = async <T>(urls: string[]): Promise<T[]> => {
  return Promise.all(urls.map(url => fetch(url).then(res => res.json())));
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
};

export async function fetchPeopleByName(searchText: string, page: number = 1): Promise<SWAPIResponse<Person>> {
  const response = await fetch(`https://swapi.dev/api/people?search=${encodeURIComponent(searchText)}&page=${page}`);
    
  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }
  const people: SWAPIResponse<Person> = await response.json();
  if(people.next) {
      const allPeople: SWAPIResponse<Person> = await fetchPeopleByName(searchText, page+1);
      people.results = people.results.concat(allPeople.results);
  }
  return people;
}

export async function getPerson(id: number): Promise<Person> {
  const response = await fetch(`https://swapi.dev/api/people/${id}/`);
  if (!response.ok) throw new Response('Person not found', { status: 404 });
  const person: Person = await response.json();
  person.id = id;
  return person;
}