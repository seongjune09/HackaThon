import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import '../styles/Modal.css'

function Home() {
    const navigate = useNavigate()

    const [showHelpModal, setShowHelpModal] = useState(false)
    const [showInputModal, setShowInputModal] = useState(false)
    const [sea, setSea] = useState('')
    const [detailAddress, setDetailAddress] = useState('')

    // 확인 버튼 클릭 시 데이터를 들고 이동
    const handleStartConfirm = () => {
        if (!sea) return; // 장소 미입력 시 방지
        
        setShowInputModal(false)
        
        // 중요: navigate 시 두 번째 인자로 state를 넘겨줍니다.
        // 이렇게 하면 /start 페이지에서 useLocation()으로 이 값을 받을 수 있습니다.
        navigate('/start', { 
            state: { 
                beachName: sea, 
                address: detailAddress 
            } 
        })
    }

    return (
        <>
            {/* 메인 화면 */}
            <main className={`Main-Title ${(showHelpModal || showInputModal) ? 'blur' : ''}`}>
                <p className="Title">
                    Point <span>Check ✔️</span>
                </p>
                <img className="intro" src="intro.png" />
            </main>

            <div className={`Check-Wrapper ${(showHelpModal || showInputModal) ? 'blur' : ''}`}>
                <button
                    className="Check-Btn"
                    onClick={() => setShowInputModal(true)}
                >
                    시작하기
                </button>

                <button onClick={() => navigate('/record')} className="Record-Button">
                    <img className="Record-icon" src="Record.png" alt="record"/>
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

                        <h2 className="Sea-Title">어느 지역인가요?</h2>

                        <input
                            type="text"
                            placeholder="예: 해운대 해수욕장"
                            value={sea}
                            onChange={(e) => setSea(e.target.value)}
                        />

                        <h2 className="Sea-Title1">상세 주소를 입력해주세요</h2>
                        <input
                            type="text"
                            placeholder="예: 해운대 123번지"
                            value={detailAddress}
                            onChange={(e) => setDetailAddress(e.target.value)}
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
                                Point Check는 사람이 바다에 직접 들어가기 전,
                                기기를 던져 현재 수위를 파악하고 <br />
                                AI가 파도의 세기를 분석하여 위험을 알려주는 해양 안전 장치입니다.
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