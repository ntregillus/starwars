import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

export const action = async ({request}:ActionFunctionArgs) => {
    const data = Object.fromEntries(await request.formData());
    invariant(data.search, "search string is missing!");
    return redirect(`/?search=${data.search}`);
}