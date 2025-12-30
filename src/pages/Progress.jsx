import '../styles/Progress.css'

function Progress() {
    return (
        <>
            <main className="motion">
                <img className="motion-img" src="motion.png"></img>
            </main>

            <section className="Progress-Content">
                <p>위 화면처럼 기기를 던져주세요, <br></br>던진 순간부터 측정을 시작합니다.</p>
            </section>

            <div>
                <button
                    className="Start-Btn"
                    onClick={() => navigate('/progress')}
                >
                    시작하기
                </button>
            </div>
        </>
    )
}

export default Progress