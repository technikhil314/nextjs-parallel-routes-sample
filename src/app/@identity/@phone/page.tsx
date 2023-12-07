import { getLoggedInCookie } from '@/utils/cookie';

export default function page() {
    const isLoggedIn = getLoggedInCookie()
    if (!isLoggedIn.state && isLoggedIn.loginUsing.match(/phone/ig)) {
        return <h1 className="capitalize">phone input</h1>
    }
    return null;
};
