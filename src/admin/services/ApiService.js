import axios from 'axios';
import {getSession, signOut} from "next-auth/react";
import { toast } from 'react-toastify';

const REQUEST_HEADER_AUTH_KEY = process.env.NEXT_PUBLIC_REQUEST_HEADER_AUTH_KEY;
const REQUEST_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_REQUEST_ADMIN_BASE_URL;
const REQUEST_TIME_OUT = process.env.NEXT_PUBLIC_REQUEST_TIME_OUT;
const REQUEST_TOKEN_TYPE = process.env.NEXT_PUBLIC_REQUEST_TOKEN_TYPE;
const REQUEST_NEXT_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_REQUEST_NEXT_ADMIN_BASE_URL;


const ApiService = axios.create({
    timeout: REQUEST_TIME_OUT,
    baseURL: REQUEST_ADMIN_BASE_URL,
});
let originalConfig = {url: ''};

ApiService.interceptors.request.use(
    async (config) => {
        let _config = {...config};
        const session = await getSession();
        if (_config.headers) {
            if (session?.token?.accessToken) _config.headers[REQUEST_HEADER_AUTH_KEY] = `${REQUEST_TOKEN_TYPE} ${session?.token?.accessToken}`;
        }
        if (session?.user?.type?.name === 'parent' ) {
            _config.headers['CurrentUserPupilId'] = session.selectedChild.id
        }

        return _config
    },
    (error) => {
        return Promise.reject(error);
    }
);

ApiService.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // const session = await getSession()
        originalConfig = error.config || {};

        if (error.response) {
            // Access Token was expired
            if ([401].includes(error.response.status) && !originalConfig._retry) {
            //     originalConfig._retry = true;
            //     const refreshToken = session?.user?.token?.refresh_token
            //     const email = session?.user?.user?.email
            //
            //     try {
            //         const rs = await ApiService.post(
            //             '/admin/refresh',
            //             {
            //                 refresh_token: refreshToken,
            //                 email: email,
            //             }
            //         );
            //
            //         await fetch(`/api/auth/session`, {
            //             method: 'POST',
            //             headers: {
            //                 'content-type': 'application/json',
            //                 'Content-Language': 'az',
            //             },
            //             body: JSON.stringify({
            //                 csrfToken: await getCsrfToken(),
            //                 data: {
            //                     ...session,
            //                     user: {
            //                         ...session.user,
            //                         ...rs.data.data
            //                     }
            //                 },
            //             }),
            //         })
            //
            //         return ApiService(originalConfig);
            //     } catch (_error) {
            //         await signOut({
            //             redirect: false,
            //             callbackUrl: `${REQUEST_NEXT_ADMIN_BASE_URL}/content/idareedici`
            //         });
            //         return Promise.reject(_error);
                const callbackUrl = encodeURIComponent("/admin");
                const signOutUrl = `${REQUEST_NEXT_ADMIN_BASE_URL || ""}/login?callbackUrl=${callbackUrl}`;
                await signOut({
                    callbackUrl: signOutUrl,
                });
                return Promise.reject(error);
            //     }
            }
            else {

                toast(
                    <>
                        {error.response.data.message || error.response.statusText}
                        <br/>
                        <ul>
                            {(error.response.data.errors || []).map((item, index) =>
                                <li key={index} style={{fontSize: '0.75em'}}>{index + 1}. {item.message}</li>
                            )}
                        </ul>
                    </>,
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        type: "error"
                    }
                );
            }

            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default ApiService;
