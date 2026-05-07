import {SgButton} from "@/admin/components/ui/Button";
import SgTooltip from "../Tooltip";
import styles from "@/admin/components/ui/QuestionAssistant/QuestionAssistant.module.scss";

export default function QuestionAssistant(props) {
    const {selectedQuestion, handleNewQuestion, handleAddFile, inputFileRef, handleAddFileClick, handleAddInfoThisQuestion} = props;
    return (
        <>
            <div className={styles['questionAssistant']}>
                <div className={styles['questionAssistant-item']}>
                    <SgTooltip
                        id={`questionAssistantButtonID--NewQuestion`}
                        content={'Yeni sual əlavə et'}
                    >
                        <SgButton
                            onlyIcon={true}
                            icon='plus'
                            withOutBlock={true}
                            padding={0}
                            size='big'
                            onClick={handleNewQuestion}
                        >
                            Yeni sual əlavə et
                        </SgButton>
                    </SgTooltip>
                </div>
                <div className={styles['questionAssistant-item']}>
                    <SgTooltip
                        id={`questionAssistantButtonID--QuestionFileUpload`}
                        content={'Fayl yüklə'}
                    >
                        <SgButton
                            onlyIcon={true}
                            icon='upload'
                            withOutBlock={true}
                            padding={0}
                            size='big'
                            onClick={() => handleAddFileClick(`questions.${selectedQuestion}`)}
                        >
                            Fayl yüklə
                        </SgButton>
                    </SgTooltip>
                </div>
                <div className={styles['questionAssistant-item']}>
                    <SgTooltip
                        id={`questionAssistantButtonID--QuestionInfoMessage`}
                        content={'Info ikonu əlavə et'}
                    >
                        <SgButton
                            onlyIcon={true}
                            icon='info'
                            withOutBlock={true}
                            padding={0}
                            size='big'
                            onClick={handleAddInfoThisQuestion}
                            disabled={true}
                        >
                            Info ikonu əlavə et
                        </SgButton>
                    </SgTooltip>
                </div>
                <input type='file' accept='image/jpeg, image/png, image/jpg, image/' className='d-none' name='token' id='token' ref={inputFileRef} onChange={handleAddFile} />
            </div>
        </>
    )
}