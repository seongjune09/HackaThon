import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'
import '../styles/Progress.css'

function Progress() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleFinish = async () => {
        setIsLoading(true)

        try {
            const response = await fetch('https://api.mieung.kr/end', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error('측정 종료 실패')
            }

            const data = await response.json()
            console.log('측정 종료 결과:', data)

            // ✅ 결과 데이터를 end 페이지로 전달
            navigate('/end', { state: data })

        } catch (error) {
            console.error(error)
            alert('측정을 종료할 수 없습니다.')
            setIsLoading(false)
        }
    }

    return (
        <>
            <main className={`Progress ${isLoading ? 'blur' : ''}`}>
                <img className="Progress-img" src="Progress1.png" />
                <img className="Wave-img" src="Wave.png" />
            </main>

            <section className={`Progress-Content ${isLoading ? 'blur' : ''}`}>
                <p>
                    입수 가능 여부를 확인하고 있습니다.<br />
                    잠시만 기다려주세요. 기기를 건드리지 마세요.
                </p>
            </section>

            <div className={isLoading ? 'blur' : ''}>
                <button
                    className="Progress-Btn"
                    onClick={handleFinish}
                    disabled={isLoading}
                >
                    측정 끝내기
                </button>
            </div>

            {isLoading && (
                <Loading
                    type="finish"
                    text="측정을 종료하고 있습니다..."
                />
            )}
        </>
    )
}

export default Progress