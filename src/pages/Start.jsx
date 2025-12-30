import '../styles/Start.css'
import '../styles/Loading.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../Loading/Loading'

function Start() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleStart = () => {
        setIsLoading(true)

        setTimeout(() => {
            navigate('/progress')
        }, 2000)
    }

    return (
        <>
            <main className={`motion ${isLoading ? 'blur' : ''}`}>
                <img className="motion-img" src="motion.png" />
            </main>

            <section className={`Start-Content ${isLoading ? 'blur' : ''}`}>
                <p>
                    시작버튼을 누른 후 <br />
                    지시에 따라 기기를 던져주세요!
                </p>
            </section>

            <div className={isLoading ? 'blur' : ''}>
                <button
                    className="Start-Btn"
                    onClick={handleStart}
                    disabled={isLoading}
                >
                    시작하기
                </button>
            </div>

            {/* 🔄 로딩 오버레이 */}
            {isLoading && <Loading />}
        </>
    )
}

export default Start