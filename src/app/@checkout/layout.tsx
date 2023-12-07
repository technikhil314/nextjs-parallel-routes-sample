import { getLoggedInCookie } from "@/utils/cookie";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function CheckoutLayout(props: { children: React.ReactNode; demo: React.ReactNode }) {
    const isLoggedIn = getLoggedInCookie()
    if (isLoggedIn.state) {
        return (
            <section>
                {props.children}
                {props.demo}
            </section>
        )
    }
    return null;
};
