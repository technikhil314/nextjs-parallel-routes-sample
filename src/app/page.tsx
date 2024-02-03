import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function redirectToRoute1() {
    "use server";
    cookies().set("Server_Action_Cookie", "Server_Action_Cookie")
    redirect("/route1");
}

export default function page() {
    return <form action={redirectToRoute1}>
        <button>Submit</button>
    </form>;
};
