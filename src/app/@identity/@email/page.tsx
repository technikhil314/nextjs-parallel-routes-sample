import { getLoggedInCookie } from '@/utils/cookie';

export default function page() {
    const isLoggedIn = getLoggedInCookie()
    if (!isLoggedIn.state && isLoggedIn?.loginUsing.match(/email/ig)) {
        return <h1 className="capitalize">Email input</h1>
    }
    return null;
};
