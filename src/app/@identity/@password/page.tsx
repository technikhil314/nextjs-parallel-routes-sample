import { getLoggedInCookie } from '@/utils/cookie';

export default function page() {
    const isLoggedIn = getLoggedInCookie()
    if (!isLoggedIn.state && isLoggedIn?.loginUsing.match(/password/ig)) {
        return <h1 className="capitalize">password input</h1>
    }
    return null;
};
