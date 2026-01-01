import '../styles/Progress.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../Loading/Loading'

function Progress() {
    const navigate = useNavigate()
    const { state } = useLocation() // ✅ Start에서 넘어온 state
    const [isLoading, setIsLoading] = useState(false)

    const handleStart = async () => {
        setIsLoading(true)

        try {
            const response = await fetch('https://api.mieung.kr/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // ✅ 사용자 입력값 사용
                    beach_name: state?.beachName,
                    beach_location: state?.address
                }),
            })

            if (!response.ok) {
                throw new Error('측정 시작 실패')
            }

            await response.json()

            // ✅ state 유지한 채 다음 페이지로
            navigate('/progress1', {
                state: {
                    ...state
                }
            })

        } catch (error) {
            console.error(error)
            alert('측정을 시작할 수 없습니다.')
            setIsLoading(false)
        }
    }

    return (
        <>
            <main className={`Progress ${isLoading ? 'blur' : ''}`}>
                <img className="Progress-img" src="Progress.png" />
            </main>

            <section className={`Progress-Content ${isLoading ? 'blur' : ''}`}>
                <p>
                    위치가 정확하다면<br />
                    시작버튼을 눌러주세요
                </p>
            </section>

            <div className={isLoading ? 'blur' : ''}>
                <button
                    className="Progress-Btn"
                    onClick={handleStart}
                    disabled={isLoading}
                >
                    측정 시작하기
                </button>
            </div>

            {isLoading && (
                <Loading
                    type="measure"
                    text="기기 구동중..."
                />
            )}
        </>
    )
}

export default Progress