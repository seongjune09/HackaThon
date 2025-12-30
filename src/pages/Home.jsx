import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import '../styles/Modal.css'

function Home() {
    const navigate = useNavigate()

    const [showHelpModal, setShowHelpModal] = useState(false)
    const [showInputModal, setShowInputModal] = useState(false)
    const [sea, setSea] = useState('')

    const handleStartConfirm = () => {
        setShowInputModal(false)
        navigate('/start')
    }

    return (
        <>
            {/* 메인 화면 */}
            <main className={`Main-Title ${(showHelpModal || showInputModal) ? 'blur' : ''}`}>
                <p className="Title">Point Check ✔️</p>
                <img className="intro" src="intro.png" />
            </main>

            <div className={(showHelpModal || showInputModal) ? 'blur' : ''}>
                <button
                    className="Check-Btn"
                    onClick={() => setShowInputModal(true)}
                >
                    시작하기
                </button>
            </div>

            <div className={(showHelpModal || showInputModal) ? 'blur' : ''}>
                <button
                    className="Help-Btn"
                    onClick={() => setShowHelpModal(true)}
                >
                    <img
                        className="circle-questions"
                        src="circle-questions.png"
                        alt="도움말"
                    />
                    도움말
                </button>
            </div>

            {/* 시작 입력 모달 */}
            {showInputModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowInputModal(false)}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="modal-close"
                            onClick={() => setShowInputModal(false)}
                        >
                            ×
                        </button>

                        <h2 className="Sea-Title">어느 바다인가요?</h2>

                        <input
                            type="text"
                            placeholder="예: 해운대 해수욕장"
                            value={sea}
                            onChange={(e) => setSea(e.target.value)}
                        />

                        <button
                            className="Input-Btn"
                            disabled={!sea}
                            onClick={handleStartConfirm}
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}

            {/* 도움말 모달 */}
            {showHelpModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowHelpModal(false)}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="modal-close"
                            onClick={() => setShowHelpModal(false)}
                        >
                            ×
                        </button>

                        <h2>
                            <p>Point Check✔️란?</p>
                        </h2>

                        <div className="modal-description">
                            <p>
                                이 장치는 사람이 바다에 직접 들어가기 전,
                                기기를 던져 현재 수위를 파악하고 <br />
                                파도의 세기를 분석하여 위험을 알려주는 해양 안전 장치입니다.
                            </p>

                            <ul>
                                <li>실측 기반 해양 위험 감지</li>
                                <li>즉각적인 안전 경고</li>
                                <li>입수 전 간편하게 던질 수 있는 편리함</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Home