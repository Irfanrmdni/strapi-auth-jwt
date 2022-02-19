import Router from 'next/router';
import nookies from 'nookies';

export async function getServerSideProps({ params: { provider }, query: { access_token }, ...ctx }) {
    const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/${provider}/callback?access_token=${access_token}`);
    const res = await req.json();
    console.log(res);

    if (res.jwt) {
        nookies.set(ctx, 'token', res.jwt, {
            path: '/'
        });

        return {
            redirect: {
                destination: '/dashboard'
            }
        }
    }

    return {
        props: {},
    }
}

export default function Connect() {

    function deleteToken(e) {
        e.preventDefault();
        nookies.destroy(null, 'token');
        Router.replace('/login');
    }

    return (
        <div>
            <button type="reset" onClick={deleteToken}>Hapus token</button>
        </div>
    )
}