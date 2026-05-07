import { AuthLayout } from "@/admin/components/layouts";
import {SgSectionAuth} from "@/admin/components/sections/Auth";
import {SgCheckbox, SgCheckboxGroup, SgFormGroup, SgInput} from "@/admin/components/ui/Form";
import {SgButton} from "@/admin/components/ui/Button";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {useRef, useState} from "react";
import {changeData} from "@/admin/utils/changeData";
import {validate} from "@/admin/utils/validate";
import {validationConstraints} from "@/admin/constants/constants";
import { signIn } from 'next-auth/react'
import {toast} from "react-toastify";
import SgTemplateRecaptcha from "@/components/templates/Recaptcha";
const REQUEST_NEXT_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_REQUEST_NEXT_ADMIN_BASE_URL;

export default function Index() {
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})
    const [verifiedToken, setVerifiedToken] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const recaptchaRef = useRef(null);

    function handleResetReCaptcha() {
        recaptchaRef.current.reset();
        setVerifiedToken(null);
        setIsVerified(false);
    }

    function handleChange(e) {
        changeData(e, data, setData, errors, setErrors)
    }

    function handleLogin(e) {
        e.preventDefault();

        let errors = validate(data, 'sign-in', validationConstraints);

        if (Object.keys(errors).length > 0) {
            setErrors(errors)
        }
        else {
            signIn('adminAuth', {
                redirect: false,
                login: data.email,
                password: data.password,
                recaptcha: verifiedToken,
                callbackUrl: `${REQUEST_NEXT_ADMIN_BASE_URL}/content/idareedici`,
            }).then(resp => {
                if (resp.ok) {
                    handleResetReCaptcha();
                }
                else {
                    handleResetReCaptcha();
                    toast(resp.error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        type: "error"
                    });
                }
            }).catch(err => console.log(err, 'err'))
        }
    }

    return (
        <>
            <SgSectionAuth
                header='Kabinetinizə daxil olun'
                description='Müqaviq istifadəçi məlumatlarını daxil edin.'
            >
                <SgFormGroup>
                    <SgInput
                        label='E-poçt'
                        id='email'
                        name='email'
                        type='email'
                        placeholder='E-poçt ünvanını daxil edin'
                        onChange={handleChange}
                        isInvalid={errors.email}
                    />
                </SgFormGroup>
                <SgFormGroup>
                    <SgInput
                        label='Şifrə'
                        id='password'
                        name='password'
                        type='password'
                        placeholder='••••••••'
                        onChange={handleChange}
                        isInvalid={errors.password}
                    />
                </SgFormGroup>
                <SgFormGroup>
                    <SgTemplateRecaptcha
                        setIsVerified={setIsVerified}
                        isVerified={isVerified}
                        setVerifiedToken={setVerifiedToken}
                        recaptchaRef={recaptchaRef}
                    />
                </SgFormGroup>
                <SgFormGroup>
                    <SgButtonGroup
                        gap={true}
                        className='align-items-center justify-content-between'
                    >
                        <SgCheckboxGroup>
                            <SgCheckbox
                                label='30 gün ərzində kabineti yadda saxla'
                                id='remember'
                                name='remember'
                                size='sm'
                                onChange={handleChange}
                                isInvalid={errors.remember}
                            />
                        </SgCheckboxGroup>
                    </SgButtonGroup>
                </SgFormGroup>
                <SgFormGroup>
                    <SgButton
                        color='primary'
                        block={true}
                        onClick={handleLogin}
                        disabled={!isVerified}
                    >
                        Daxil ol
                    </SgButton>
                </SgFormGroup>
            </SgSectionAuth>
        </>
    )
}

Index.getLayout = function getLayout(page) {
    return (
        <>
            <AuthLayout>
                {page}
            </AuthLayout>
        </>
    )
}