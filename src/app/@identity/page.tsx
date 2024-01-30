import { getLoggedInCookie } from '@/utils/cookie';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function login(formData: FormData) {
    "use server";
    const loginUsing = (formData.get("loginUsing") || "") as string;
    cookies().set({
        name: "isLoggedIn",
        value: JSON.stringify({
            state: true,
            loginUsing
        }),
        secure: true,
        httpOnly: true,
        domain: ".vercel.app"
    });
    revalidatePath("/")
    redirect("/")
}


export default function Page() {
    const isLoggedIn = getLoggedInCookie()
    if (!isLoggedIn.state) {
        return (
            <form action={login} className='flex flex-col gap-4'>
                <label htmlFor="login-using" className='text-lg'>Select login method</label>
                <select name="loginUsing" id="login-using" defaultValue={"email + password"} className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                    <option value="email + password">Email + Password</option>
                    <option value="phone + password">Phone + Password</option>
                </select>
                <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Log me in</button>
            </form>
        )
    }
    return null;
};
