import type {LoaderFunctionArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Button } from "../components/ui/button";

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    invariant(params.id, "ID was not provided in the url!");
    return json({id: params.id});
};

export default function Character() {
    const character = useLoaderData<typeof loader>();
    return (
        <div> 
            <p>character page for {character.id} </p>
            <Button>test this renders</Button>
        </div>
    );

};



