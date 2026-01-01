import '../styles/Start.css'
import '../styles/Loading.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../Loading/Loading'

function Start() {
    const navigate = useNavigate()
    const { state } = useLocation() // ✅ Home에서 넘어온 state
    const [isLoading, setIsLoading] = useState(false)

    const handleStart = () => {
        setIsLoading(true)

        setTimeout(() => {
            // ✅ state를 그대로 다음 페이지로 전달
            navigate('/progress', {
                state: {
                    ...state   // beachName, address 유지
                }
            })
        }, 2000)
    }

    return (
        <>
            <main className={`motion ${isLoading ? 'blur' : ''}`}>
                <img className="motion-img" src="motion.png" />
            </main>

            <section className={`Start-Content ${isLoading ? 'blur' : ''}`}>
                <p>
                    측정하고 싶은 장소를 정하고<br />
                    기기를 던져주세요!
                </p>
            </section>

            <div className={isLoading ? 'blur' : ''}>
                <button
                    className="Start-Btn"
                    onClick={handleStart}
                    disabled={isLoading}
                >
                    다음
                </button>
            </div>

            {isLoading && (
                <Loading
                    type="prepare"
                    text="기기를 준비하고 있습니다..."
                />
            )}
        </>
    )
}

export default Start