import '../styles/Progress.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../Loading/Loading'

function Progress() {
    const navigate = useNavigate()
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
                    beach_name: '해운대해수욕장',
                    beach_location: '부산광역시 해운대구'
                }),
            })

            if (!response.ok) {
                throw new Error('측정 시작 실패')
            }

            await response.json()
            navigate('/progress1')

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