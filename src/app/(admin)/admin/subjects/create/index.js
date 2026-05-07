import {MainLayout} from "@/admin/components/layouts";
import {SgPage, SgPageBody, SgPageFooter, SgPageHead} from "@/admin/components/ui/Page";
import {SgButton} from "@/admin/components/ui/Button";
import {useState} from "react";
import {SgFormGroup, SgInput} from "@/admin/components/ui/Form";
import {changeData} from "@/admin/utils/changeData";
import SgButtonGroup from "@/admin/components/ui/ButtonGroup/ButtonGroup";
import {validate} from "@/admin/utils/validate";
import {validationConstraints} from "@/admin/constants/constants";


export default function Index() {
    const [data, setData] = useState({});
    const [valueErrors, setValueErrors] = useState({});

    function handleChange(e) {
        changeData(e, data, setData, valueErrors, setValueErrors);
    }

    function handleSubmit(e) {
        e.preventDefault();

        let errors = validate(data, 'languageCreate', validationConstraints);


        if (Object.keys(errors).length > 0) {
            setValueErrors(errors)
        }
        else {
            // ApiService.post(LANGUAGE_CREATE_ROUTE, data).then(resp => {
            //     router.push({
            //         pathname: '/content/idareedici/topics'
            //     }, undefined, { scroll: true });
            // }).catch(error => {
            //     console.log(error)
            // })
        }
    }

    return (
        <>
            <SgPage>
                <SgPageHead
                    header='Mövzular'
                    description='Mövzu əlavə et'
                    filter={true}
                >
                    <SgButton
                        type='link'
                        isLinked={true}
                        to='/content/idareedici/topics'
                        color='primary'
                        size='md'
                        icon='plus'
                    >
                        Mövzular
                    </SgButton>
                </SgPageHead>
                <SgPageBody>
                    <div className={['row'].join(' ').trim()}>
                        <div className='col-lg-12'>
                            <SgFormGroup>
                                <SgInput
                                    name='sector'
                                    id='sector'
                                    placeholder='Enter sector'
                                    label='Sector'
                                    value={data.sector || ''}
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleFilterDataPreFetch(e, 'grades');
                                    }}
                                    isInvalid={valueErrors.sector}
                                    variant='select'
                                    options={filterData?.sectors}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='grade'
                                    id='grade'
                                    placeholder='Enter grade'
                                    label='Grade'
                                    value={data.grade || ''}
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleFilterDataPreFetch(e, 'subjects');
                                    }}
                                    isInvalid={valueErrors.grade}
                                    disabled={!data?.sector}
                                    variant='select'
                                    options={filterData?.grades}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='subject'
                                    id='subject'
                                    placeholder='Enter subject'
                                    label='Subject'
                                    value={data.subject || ''}
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleFilterDataPreFetch(e, 'sections');
                                    }}
                                    isInvalid={valueErrors.subject}
                                    disabled={!data?.grade}
                                    variant='select'
                                    options={filterData?.subjects}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='section'
                                    id='section'
                                    placeholder='Enter section'
                                    label='Section'
                                    value={data.section || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.section}
                                    disabled={!data?.subject}
                                    variant='select'
                                    options={filterData?.sections}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='name'
                                    id='name'
                                    placeholder='Enter your name'
                                    label='Name'
                                    value={data.name || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.name}
                                />
                            </SgFormGroup>
                            <SgFormGroup>
                                <SgInput
                                    name='row'
                                    id='row'
                                    placeholder='Enter your row'
                                    label='Row'
                                    type='number'
                                    value={data.row || ''}
                                    onChange={handleChange}
                                    isInvalid={valueErrors.row}
                                />
                            </SgFormGroup>
                        </div>
                    </div>
                </SgPageBody>
                <SgPageFooter>
                    <SgButtonGroup
                        gap={true}
                    >
                        <SgButton
                            color='primary'
                            size='sm'
                            onClick={handleSubmit}
                        >
                            Create
                        </SgButton>
                        <SgButton
                            color='error'
                            size='sm'
                            type='link'
                            to='/content/idareedici/topics'
                        >
                            Ləğv et
                        </SgButton>
                    </SgButtonGroup>
                </SgPageFooter>
            </SgPage>
        </>
    )
}

Index.getLayout = function getLayout(page) {
    return (
        <>
            <MainLayout>
                {page}
            </MainLayout>
        </>
    )
}