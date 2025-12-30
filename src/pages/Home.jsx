import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import '../styles/Modal.css'

function Home() {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <main className="Main-Title">
                <p className="Title">Point Check ✔️</p>
                <img className="intro" src="intro.png"/>
            </main>

            <div>
                <button
                    className="Check-Btn"
                    onClick={() => navigate('/start')}
                >
                    시작하기
                </button>
            </div>

            <div>
                <button
                    className="Help-Btn"
                    onClick={() => setShowModal(true)}
                >
                    <img
                        className="circle-questions"
                        src="circle-questions.png"
                        alt="도움말"
                    />
                    도움말
                </button>
            </div>

            {showModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="modal-close"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>

                        <h2>
                            <p>Point Check✔️란?</p>
                        </h2>

                        <div className="modal-description">
                            <p>
                            이 장치는 사람이 바다에 직접 들어가기 전, 기기를 던져 현재 수위를 파악하고, <br></br>파도의 세기를 분석하여 위험을 알려주는 해양 안전 장치입니다.

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