import { getLoggedInCookie } from '@/utils/cookie';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function logout() {
    "use server";
    const prevValue = getLoggedInCookie();
    cookies().set("isLoggedIn", JSON.stringify({
        ...prevValue,
        state: false,
    }));
    revalidatePath("/")
    redirect("/")
}

export default function Page() {
    const isLoggedIn = getLoggedInCookie()
    if (isLoggedIn?.state) {
        return (
            <div className='flex flex-col gap-4 mx-auto text-center'>
                <dl>
                    <dt className="text-lg mb-2"><h1 className=''>You are logged in using: </h1></dt>
                    <dd className='capitalize'>{isLoggedIn.loginUsing}</dd>
                </dl>
                <form action={logout}>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Log me out</button>
                </form>
            </div>
        )
    }
    return null;
};
