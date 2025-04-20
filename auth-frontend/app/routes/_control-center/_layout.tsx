import { useState } from 'react';
import { Outlet } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/router';
import { requireUserSession } from '~/services/session';


export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserSession(request);
    return null;
}


const Layout = () => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default Layout