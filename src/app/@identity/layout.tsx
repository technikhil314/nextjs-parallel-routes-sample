import { getLoggedInCookie } from "@/utils/cookie";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Layout(props: {
    children: React.ReactNode
    email: React.ReactNode
    password: React.ReactNode
    phone: React.ReactNode
}) {
    const isLoggedIn = getLoggedInCookie()
    if (!isLoggedIn.state) {
        return (
            <section>
                {props.children}
                <div className="flex flex-col gap-1 mt-5">
                    <div className="mb-5 text-lg">
                        {!isLoggedIn.usingDefault && <h1>Rendering following based on your last selected login method</h1>}
                        {isLoggedIn.usingDefault && <h1>Rendering following based because you have never logged in before</h1>}
                    </div>
                    {props.email}
                    {props.phone}
                    {props.password}
                </div>
            </section>
        )
    }
    return null;
};
