import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function redirectToRoute1() {
    "use server";
    cookies().set("Server_Action_Cookie", "Server_Action_Cookie")
    redirect("/route1");
}

export default function page() {
    return <form action={redirectToRoute1} className="prose dark:text-gray-200 text-gray-800">
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Redirect me to /route1</button>
        <ul>
            <strong className="dark:text-gray-200 text-gray-800">Expected Result</strong>
            <li>After sucessful redirection with streaming both cookies should be dropped on browser</li>
        </ul>
        <ul>
            <strong className="dark:text-gray-200 text-gray-800">Actual Result</strong>
            <li>Only one of the cookie gets dropped on browser based on following logic</li>
            <ul>
                <li>
                    if you comment out {" "}
                    <a
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        href="https://github.com/technikhil314/nextjs-parallel-routes-sample/blob/chore/steaming-cookie-issue/server.ts#L41">
                        line 41 {" "}
                    </a> in server.ts file then
                    <br />
                    Server_Action_Cookie is dropped correctly on browser
                </li>
                <li>
                    if you uncomment {" "}
                    <a
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        href="https://github.com/technikhil314/nextjs-parallel-routes-sample/blob/chore/steaming-cookie-issue/server.ts#L41">
                        line 41 {" "}
                    </a>
                    in server.ts file then
                    <br />
                    GET_COOKIE is dropped on browser overriding Server_Action_Cookie
                </li>
            </ul>
        </ul>
        <ul>
            <strong className="dark:text-gray-200 text-gray-800">Potential fix</strong>
            <li>
                <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="https://github.com/vercel/next.js/blob/canary/packages/next/src/server/app-render/action-handler.ts#L227">
                    This {" "}
                </a>
                line in action-handler.ts should take care of merging cookies from both the responses <br />
                before sending POST server action response back to browser
            </li>
        </ul>
    </form>;
};
