import '../styles/Progress.css'

function Progress() {
    return (
        <>
            <main className="Progress">
                <img className="Progress-img" src="Progress1.png"></img>
                <img className="Wave-img" src="Wave.png"></img>
            </main>

            <section className="Progress-Content">
                <p>입수 가능 여부를 확인하고 있습니다.<br></br>잠시만 기다려주세요. 기기를 건드리지 마세요.</p>
            </section>

            <div>
                <button
                    className="Progress-Btn"
                    onClick={() => navigate('/end')}
                >
                    측정 끝내기
                </button>
            </div>
        </>
    )
}

export default Progress